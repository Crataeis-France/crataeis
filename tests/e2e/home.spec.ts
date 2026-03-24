import { test, expect } from "@playwright/test";

type LocaleKey = "en" | "fr";

const copy: Record<
  LocaleKey,
  {
    path: string;
    pageTitle: RegExp;
    nav: {
      services: string;
      insights: string;
      about: string;
      consultation: string;
      languageSelectAria: string;
    };
    hero: {
      titleSnippet: RegExp;
      highlight: string;
      description: RegExp;
      primaryCta: string;
      secondaryCta: string;
      imageAlt: string;
    };
    services: {
      eyebrow: string;
      title: string;
      viewDetails: string;
      cards: { id: string; title: string; description: RegExp }[];
    };
    craft: {
      eyebrow: string;
      titlePart: string;
      highlight: string;
      description: RegExp;
      bullets: string[];
      cta: string;
      imageAlt: string;
    };
    impact: {
      eyebrow: string;
      titlePart: string;
      highlight: string;
      intro: RegExp;
      metricValues: string[];
      metricBodySnippets: RegExp[];
    };
    footer: {
      rights: RegExp;
      privacy: string;
      terms: string;
      backToTop: string;
    };
  }
> = {
  en: {
    path: "/en",
    pageTitle: /Digital Gallery of Expertise/i,
    nav: {
      services: "Services",
      insights: "Insights",
      about: "About",
      consultation: "Consultation",
      languageSelectAria: "Language",
    },
    hero: {
      titleSnippet: /Digital Craft for the/i,
      highlight: "Modern Artisan.",
      description: /Technical precision for the creative soul/i,
      primaryCta: "Explore Services",
      secondaryCta: "Book a Consultation",
      imageAlt: "Abstract, high-end digital art backdrop",
    },
    services: {
      eyebrow: "How We Build",
      title: "Our Core Services",
      viewDetails: "View Details",
      cards: [
        {
          id: "service-web",
          title: "Web Design & Development",
          description: /Bespoke digital experiences/i,
        },
        {
          id: "service-consulting",
          title: "Tech Consulting",
          description: /Strategic guidance/i,
        },
        {
          id: "service-seo",
          title: "SEO & AEO Strategies",
          description: /Optimizing your brand/i,
        },
        {
          id: "service-googleBusiness",
          title: "Google Business Consulting",
          description: /local presence/i,
        },
      ],
    },
    craft: {
      eyebrow: "Preserving the Soul of Your Craft",
      titlePart: "Infrastructure for the",
      highlight: "Master Maker.",
      description: /Whether your craft is born in a studio/i,
      bullets: [
        "Online Gallery Storefronts & Curated Portfolios",
        "Specialized Workflows for Physical One-of-a-Kind Products",
        "Invisible Infrastructure & Logistics Management",
      ],
      cta: "Learn More",
      imageAlt:
        "Handcrafted ceramics on wooden racks, cinematic black and white",
    },
    impact: {
      eyebrow: "Strategic Authority",
      titlePart: "The Impact of",
      highlight: "Digital Growth",
      intro: /Precision marketing is the difference/i,
      metricValues: ["78%", "9x", "120%", "1,000%"],
      metricBodySnippets: [
        /location-based mobile searches/i,
        /SEO leads/i,
        /star-rating/i,
        /SEO than by organic social/i,
      ],
    },
    footer: {
      rights: /Crataeis\. All rights reserved\./i,
      privacy: "Privacy Policy",
      terms: "Terms of Service",
      backToTop: "Back to Top",
    },
  },
  fr: {
    path: "/fr",
    pageTitle: /Galerie numérique d'expertise/i,
    nav: {
      services: "Services",
      insights: "Perspectives",
      about: "À propos",
      consultation: "Consultation",
      languageSelectAria: "Langue",
    },
    hero: {
      titleSnippet: /Savoir-faire numérique pour/i,
      highlight: "l'artisan moderne.",
      description: /Une précision technique au service/i,
      primaryCta: "Découvrir les services",
      secondaryCta: "Réserver une consultation",
      imageAlt: "Fond visuel abstrait haut de gamme",
    },
    services: {
      eyebrow: "Notre façon de créer",
      title: "Nos services",
      viewDetails: "Voir les détails",
      cards: [
        {
          id: "service-web",
          title: "Design & développement web",
          description: /expériences numériques sur mesure/i,
        },
        {
          id: "service-consulting",
          title: "Conseil tech",
          description: /infrastructure digitale/i,
        },
        {
          id: "service-seo",
          title: "Stratégies SEO & AEO",
          description: /moteurs de recherche/i,
        },
        {
          id: "service-googleBusiness",
          title: "Conseil Google Business",
          description: /présence locale/i,
        },
      ],
    },
    craft: {
      eyebrow: "Préserver l’âme de votre métier",
      titlePart: "Une infrastructure pour le",
      highlight: "maître faiseur.",
      description: /Né dans un studio, un atelier ou une forge/i,
      bullets: [
        "Vitrines galerie & portfolios curatoriaux en ligne",
        "Flux de travail adaptés aux pièces uniques physiques",
        "Infrastructure discrète & logistique",
      ],
      cta: "En savoir plus",
      imageAlt:
        "Céramiques artisanales sur des étagères en bois, noir et blanc cinématographique",
    },
    impact: {
      eyebrow: "Autorité stratégique",
      titlePart: "L’impact de la",
      highlight: "croissance digitale",
      intro: /Le marketing de précision fait la différence/i,
      metricValues: ["78 %", "9×", "120 %", "1 000 %"],
      metricBodySnippets: [
        /recherches mobiles locales/i,
        /leads SEO/i,
        /étoiles/i,
        /Le SEO génère/i,
      ],
    },
    footer: {
      rights: /Crataeis\. Tous droits réservés\./i,
      privacy: "Politique de confidentialité",
      terms: "Conditions d’utilisation",
      backToTop: "Haut de page",
    },
  },
};

function homeUrl(locale: LocaleKey) {
  return copy[locale].path;
}

test.describe("Home page", () => {
  for (const locale of ["en", "fr"] as const) {
    const c = copy[locale];

    test.describe(`${locale.toUpperCase()}`, () => {
      test("document title reflects localized home metadata", async ({
        page,
      }) => {
        await page.goto(homeUrl(locale));
        await expect(page).toHaveTitle(c.pageTitle);
      });

      test.describe("Navigation", () => {
        test.beforeEach(async ({ page }) => {
          await page.goto(homeUrl(locale));
        });

        test("logo links to home for this locale", async ({ page }) => {
          await page
            .getByRole("navigation")
            .getByRole("link", { name: "Crataeis" })
            .click();
          await expect(page).toHaveURL(new RegExp(`${c.path}/?$`));
        });

        test("section nav links are visible", async ({ page }) => {
          const nav = page.getByRole("navigation");
          await expect(
            nav.getByRole("link", { name: c.nav.services }),
          ).toBeVisible();
          await expect(
            nav.getByRole("link", { name: c.nav.insights }),
          ).toBeVisible();
          await expect(
            nav.getByRole("link", { name: c.nav.about }),
          ).toBeVisible();
        });

        test("consultation CTA in header", async ({ page }) => {
          await expect(
            page
              .getByRole("navigation")
              .getByRole("link", { name: c.nav.consultation }),
          ).toBeVisible();
        });

        test("language select is available", async ({ page }) => {
          await expect(
            page.getByRole("combobox", { name: c.nav.languageSelectAria }),
          ).toBeVisible();
        });
      });

      test.describe("HomeHero", () => {
        test.beforeEach(async ({ page }) => {
          await page.goto(homeUrl(locale));
        });

        test("headline, description, and CTAs", async ({ page }) => {
          await expect(
            page.getByRole("heading", { level: 1, name: c.hero.titleSnippet }),
          ).toBeVisible();
          await expect(page.getByText(c.hero.highlight)).toBeVisible();
          await expect(page.getByText(c.hero.description)).toBeVisible();
          await expect(
            page.getByRole("link", { name: c.hero.primaryCta }),
          ).toBeVisible();
          await expect(
            page.getByRole("link", { name: c.hero.secondaryCta }),
          ).toBeVisible();
        });

        test("hero background image alt", async ({ page }) => {
          await expect(
            page.getByRole("img", { name: c.hero.imageAlt }),
          ).toBeVisible();
        });

        test("primary CTA scrolls to services section", async ({ page }) => {
          await page.getByRole("link", { name: c.hero.primaryCta }).click();
          await expect(page.locator("#services")).toBeInViewport();
        });
      });

      test.describe("HomeServicesSection", () => {
        test.beforeEach(async ({ page }) => {
          await page.goto(homeUrl(locale));
        });

        test("section headings and service cards", async ({ page }) => {
          const section = page.locator("#services");
          await expect(section.getByText(c.services.eyebrow)).toBeVisible();
          await expect(
            section.getByRole("heading", { name: c.services.title }),
          ).toBeVisible();

          for (const card of c.services.cards) {
            const article = page.locator(`#${card.id}`);
            await expect(article).toBeVisible();
            await expect(
              article.getByRole("heading", { name: card.title }),
            ).toBeVisible();
            await expect(article.getByText(card.description)).toBeVisible();
            await expect(
              article.getByRole("link", { name: c.services.viewDetails }),
            ).toBeVisible();
          }
        });
      });

      test.describe("HomeCraftSection", () => {
        test.beforeEach(async ({ page }) => {
          await page.goto(homeUrl(locale));
        });

        test("copy, bullets, CTA, and image", async ({ page }) => {
          const section = page.locator("#about");
          await expect(section.getByText(c.craft.eyebrow)).toBeVisible();
          await expect(section.getByText(c.craft.titlePart)).toBeVisible();
          await expect(section.getByText(c.craft.highlight)).toBeVisible();
          await expect(section.getByText(c.craft.description)).toBeVisible();
          for (const line of c.craft.bullets) {
            await expect(section.getByText(line)).toBeVisible();
          }
          await expect(
            section.getByRole("link", { name: c.craft.cta }),
          ).toBeVisible();
          await expect(
            section.getByRole("img", { name: c.craft.imageAlt }),
          ).toBeVisible();
        });
      });

      test.describe("HomeImpactSection", () => {
        test.beforeEach(async ({ page }) => {
          await page.goto(homeUrl(locale));
        });

        test("intro and metric cards", async ({ page }) => {
          const section = page.locator("#insights");
          await expect(section.getByText(c.impact.eyebrow)).toBeVisible();
          await expect(section.getByText(c.impact.titlePart)).toBeVisible();
          await expect(section.getByText(c.impact.highlight)).toBeVisible();
          await expect(section.getByText(c.impact.intro)).toBeVisible();

          const cards = section.locator(".glass-panel-mkt").filter({
            has: page.locator(".font-mkt-headline.text-6xl"),
          });
          await expect(cards).toHaveCount(4);

          for (let i = 0; i < c.impact.metricValues.length; i++) {
            await expect(cards.nth(i)).toContainText(c.impact.metricValues[i]);
            await expect(cards.nth(i)).toContainText(
              c.impact.metricBodySnippets[i],
            );
          }
        });
      });

      test.describe("Footer", () => {
        test.beforeEach(async ({ page }) => {
          await page.goto(homeUrl(locale));
        });

        test("legal links, rights line, and actions", async ({ page }) => {
          const footer = page.getByRole("contentinfo");
          await expect(footer.getByText(c.footer.rights)).toBeVisible();
          await expect(
            footer.getByRole("link", { name: c.footer.privacy }),
          ).toBeVisible();
          await expect(
            footer.getByRole("link", { name: c.footer.terms }),
          ).toBeVisible();
          await expect(
            footer.getByRole("button", { name: c.nav.consultation }).first(),
          ).toBeVisible();
          await expect(
            footer.getByRole("button", { name: c.footer.backToTop }),
          ).toBeVisible();
        });

        test("footer is the book-consultation anchor target", async ({
          page,
        }) => {
          await expect(page.locator("#book-consultation")).toBeVisible();
        });
      });
    });
  }

  test("language toggle switches locale and updates hero copy", async ({
    page,
  }) => {
    await page.goto("/en");
    await expect(
      page.getByRole("heading", { level: 1, name: copy.en.hero.titleSnippet }),
    ).toBeVisible();

    await page
      .getByRole("combobox", { name: copy.en.nav.languageSelectAria })
      .click();
    await page.getByRole("option", { name: "FR" }).click();
    await expect(page).toHaveURL(/\/fr\/?$/);
    await expect(
      page.getByRole("heading", { level: 1, name: copy.fr.hero.titleSnippet }),
    ).toBeVisible();

    await page
      .getByRole("combobox", { name: copy.fr.nav.languageSelectAria })
      .click();
    await page.getByRole("option", { name: "EN" }).click();
    await expect(page).toHaveURL(/\/en\/?$/);
    await expect(
      page.getByRole("heading", { level: 1, name: copy.en.hero.titleSnippet }),
    ).toBeVisible();
  });

  test("root path redirects to default locale home", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveURL(/\/en\/?$/);
    await expect(
      page.getByRole("heading", { level: 1, name: copy.en.hero.titleSnippet }),
    ).toBeVisible();
  });
});
