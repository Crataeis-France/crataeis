import { test, expect } from "@playwright/test";
import type { Page } from "@playwright/test";

/** Must match `COOKIE_CONSENT_STORAGE_KEY` in `src/lib/cookie-consent.ts`. */
const STORAGE_KEY = "crataeis_cookie_consent";

/**
 * Clears consent without using `addInitScript`: init scripts run before *every*
 * navigation (including `reload()`), which would wipe consent after accept.
 */
async function gotoHomeWithConsentCleared(page: Page) {
  await page.goto("/en");
  await page.evaluate((key) => {
    window.localStorage.removeItem(key);
  }, STORAGE_KEY);
  await page.reload({ waitUntil: "load" });
}

test.describe("Cookie banner", () => {
  test("shows when no consent is stored", async ({ page }) => {
    await gotoHomeWithConsentCleared(page);
    await expect(page.getByTestId("cookie-banner")).toBeVisible();
    await expect(page.getByTestId("cookie-banner-accept-all")).toBeVisible();
    await expect(page.getByTestId("cookie-banner-reject-essential")).toBeVisible();
  });

  test("hides after accept all and does not show again after reload", async ({
    page,
  }) => {
    await gotoHomeWithConsentCleared(page);
    await page.getByTestId("cookie-banner-accept-all").click();
    await expect(page.getByTestId("cookie-banner")).toBeHidden();
    await page.reload({ waitUntil: "load" });
    await expect(page.getByTestId("cookie-banner")).toHaveCount(0);
  });

  test("stores correct localStorage data when accept all is chosen", async ({
    page,
  }) => {
    await gotoHomeWithConsentCleared(page);
    await page.getByTestId("cookie-banner-accept-all").click();

    const raw = await page.evaluate((key) => {
      return window.localStorage.getItem(key);
    }, STORAGE_KEY);

    expect(raw).toBeTruthy();
    const data = JSON.parse(raw!) as {
      version: number;
      preferences: { necessary: boolean; analytics: boolean };
      updatedAt: string;
    };

    expect(data.version).toBe(1);
    expect(data.preferences.necessary).toBe(true);
    expect(data.preferences.analytics).toBe(true);
    expect(typeof data.updatedAt).toBe("string");

    await expect(page.getByTestId("vercel-analytics-active")).toBeAttached({
      timeout: 15_000,
    });
  });

  test("essentials-only stores correct data and analytics is not mounted", async ({
    page,
  }) => {
    await gotoHomeWithConsentCleared(page);
    await page.getByTestId("cookie-banner-reject-essential").click();
    await expect(page.getByTestId("cookie-banner")).toBeHidden();

    const raw = await page.evaluate((key) => {
      return window.localStorage.getItem(key);
    }, STORAGE_KEY);

    expect(raw).toBeTruthy();
    const data = JSON.parse(raw!) as {
      version: number;
      preferences: { necessary: boolean; analytics: boolean };
      updatedAt: string;
    };

    expect(data.version).toBe(1);
    expect(data.preferences.necessary).toBe(true);
    expect(data.preferences.analytics).toBe(false);
    expect(typeof data.updatedAt).toBe("string");

    await expect(page.getByTestId("vercel-analytics-active")).toHaveCount(0);
  });

  test.describe("when consent already exists in localStorage", () => {
    test.beforeEach(async ({ page }) => {
      await page.addInitScript((key: string) => {
        window.localStorage.setItem(
          key,
          JSON.stringify({
            version: 1,
            preferences: { necessary: true, analytics: false },
            updatedAt: new Date().toISOString(),
          }),
        );
      }, STORAGE_KEY);
    });

    test("does not show the banner", async ({ page }) => {
      await page.goto("/en", { waitUntil: "load" });
      await expect(page.getByTestId("cookie-banner")).toHaveCount(0);
    });
  });
});
