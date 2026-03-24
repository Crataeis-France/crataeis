import { BackToTop } from "@/components/Footer/BackToTop";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export async function Footer() {
  const t = await getTranslations("HomePage");
  const year = new Date().getFullYear();

  return (
    <footer
      id="book-consultation"
      className="w-full scroll-mt-24 border-t border-white/5 bg-slate-950 px-8 py-12"
    >
      <div className="mx-auto flex max-w-screen-2xl flex-col items-center justify-between gap-12 md:flex-row">
        <div className="flex flex-col items-center gap-3 md:items-start">
          <div className="font-mkt-headline text-xl font-bold tracking-tighter text-slate-200">
            Crataeis
          </div>
          <div className="font-mkt-body text-xs leading-relaxed font-medium tracking-wide text-slate-500 uppercase">
            © {year} {t("footer.rights")}
          </div>
        </div>
        <div className="flex gap-10">
          <Link
            href="/privacy"
            className="font-mkt-body text-sm text-slate-500 transition-colors hover:text-indigo-400"
          >
            {t("footer.privacy")}
          </Link>
          <Link
            href="/terms"
            className="font-mkt-body text-sm text-slate-500 transition-colors hover:text-indigo-400"
          >
            {t("footer.terms")}
          </Link>
        </div>
        <div className="flex items-center gap-8">
          <button
            type="button"
            className="rounded-lg border border-white/10 bg-slate-800/50 px-6 py-2 text-sm font-medium text-mkt-secondary transition-all hover:bg-slate-700 active:scale-95"
          >
            {t("nav.consultation")}
          </button>
          <BackToTop label={t("footer.backToTop")} />
        </div>
      </div>
    </footer>
  );
}
