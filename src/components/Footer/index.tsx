import { getTranslations } from "next-intl/server";
// i18n
import { Link } from "@/i18n/navigation";
// Components
import { BackToTop } from "@/components/Footer/BackToTop";
import { CookieSettingsDialog } from "@/components/CookieConsent/CookieSettingsDialog";

export async function Footer() {
  const t = await getTranslations("HomePage");
  const year = new Date().getFullYear();

  return (
    <footer
      id="book-consultation"
      className="w-full scroll-mt-24 border-t border-white/5 bg-slate-950 px-4 py-10 sm:px-8 sm:py-12"
    >
      <div className="mx-auto flex max-w-screen-2xl flex-col items-center justify-between gap-10 sm:gap-12 md:flex-row md:items-start">
        <div className="flex flex-col items-center gap-3 md:items-start">
          <div className="font-mkt-headline text-xl font-bold tracking-tighter text-slate-200">
            Crataeis
          </div>
          <div className="max-w-[min(100%,20rem)] text-center font-mkt-body text-xs leading-relaxed font-medium tracking-wide text-slate-500 uppercase md:max-w-none md:text-left">
            © {year} {t("footer.rights")}
          </div>
        </div>
        <nav
          aria-label="Footer"
          className="flex w-full max-w-md flex-wrap items-center justify-center gap-x-5 gap-y-2 sm:max-w-none sm:gap-x-8 md:w-auto md:flex-nowrap md:justify-start md:gap-x-10"
        >
          <Link
            href="/privacy"
            className="inline-flex min-h-11 items-center font-mkt-body text-sm text-slate-500 transition-colors hover:text-indigo-400"
          >
            {t("footer.privacy")}
          </Link>
          <Link
            href="/terms"
            className="inline-flex min-h-11 items-center font-mkt-body text-sm text-slate-500 transition-colors hover:text-indigo-400"
          >
            {t("footer.terms")}
          </Link>
          <CookieSettingsDialog
            triggerLabel={t("footer.cookieSettings")}
            triggerClassName="inline-flex min-h-11 items-center font-mkt-body text-sm text-slate-500 transition-colors hover:text-indigo-400"
          />
        </nav>
        <div className="flex w-full items-center justify-center md:w-auto md:justify-end">
          <BackToTop label={t("footer.backToTop")} />
        </div>
      </div>
    </footer>
  );
}
