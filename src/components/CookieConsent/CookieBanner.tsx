"use client";

import { useTranslations } from "next-intl";
// i18n
import { Link } from "@/i18n/navigation";
// Components
import { CookieSettingsDialog } from "@/components/CookieConsent/CookieSettingsDialog";
import { useCookieConsent } from "@/components/CookieConsent/CookieConsentProvider";
import { useIsClient } from "@/components/CookieConsent/hooks";
import { Button } from "@/components/ui/button";

export function CookieBanner() {
  const t = useTranslations("CookieConsent");
  const { hasChoice, acceptAll, rejectNonEssential } = useCookieConsent();
  const isClient = useIsClient();

  if (!isClient) return null;
  if (hasChoice) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 px-4 pb-4 sm:px-6 sm:pb-6"
      data-testid="cookie-banner"
    >
      <div className="mx-auto max-w-screen-lg rounded-xl border border-white/10 bg-slate-950/90 p-4 shadow-2xl shadow-black/40 backdrop-blur md:p-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="min-w-0">
            <div className="font-mkt-headline text-base font-semibold text-slate-100">
              {t("banner.title")}
            </div>
            <p className="mt-1 text-sm leading-relaxed text-slate-300">
              {t.rich("banner.body", {
                privacyLink: (chunks) => (
                  <Link
                    href="/privacy"
                    className="text-indigo-300 underline underline-offset-4 hover:text-indigo-200"
                  >
                    {chunks}
                  </Link>
                ),
              })}
            </p>
          </div>

          <div className="flex shrink-0 flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">
            <Button
              type="button"
              variant="outline"
              data-testid="cookie-banner-reject-essential"
              className="cursor-pointer border-white/20 bg-white/5 text-slate-100 shadow-none hover:bg-white/10 hover:text-slate-50 dark:border-white/20 dark:bg-white/5 dark:hover:bg-white/10 dark:hover:text-slate-50"
              onClick={() => rejectNonEssential()}
            >
              {t("actions.rejectNonEssential")}
            </Button>

            <CookieSettingsDialog
              triggerLabel={t("actions.manage")}
              triggerClassName="cursor-pointer rounded-md border border-white/20 bg-white/5 px-4 py-2 text-center text-sm font-medium text-slate-100 shadow-none hover:bg-white/10 hover:text-slate-50"
              triggerTestId="cookie-banner-manage"
            />

            <Button
              type="button"
              data-testid="cookie-banner-accept-all"
              className="cursor-pointer bg-mkt-indigo-brand text-white hover:bg-indigo-500"
              onClick={() => acceptAll()}
            >
              {t("actions.acceptAll")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
