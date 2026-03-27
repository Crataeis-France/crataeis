import { getTranslations } from "next-intl/server";
// i18n
import { Link } from "@/i18n/navigation";
// Components
import { LanguageToggle } from "@/components/Navigation/LanguageToggle";
import { NavMainLinks } from "@/components/Navigation/NavMainLinks";
import { NavMobileDrawer } from "@/components/Navigation/NavMobileDrawer";

export async function Navigation() {
  const t = await getTranslations("HomePage");

  return (
    <header>
      <nav className="fixed top-0 z-50 w-full border-b border-white/5 bg-slate-900/60 shadow-[0_20px_40px_rgba(7,0,108,0.15)] backdrop-blur-xl">
        <div className="relative mx-auto flex max-w-screen-2xl items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="z-10 shrink-0 font-mkt-headline text-2xl font-bold tracking-tighter text-slate-50 dark:text-white"
          >
            {"Crataeis"}
          </Link>

          <NavMainLinks />

          <div className="z-10 flex shrink-0 items-center gap-2 sm:gap-3">
            <div className="hidden items-center gap-6 md:flex">
              <LanguageToggle />
              <Link
                href="/#book-consultation"
                className="rounded-lg bg-mkt-indigo-brand px-6 py-2 font-medium text-white transition-all hover:bg-indigo-500 active:scale-95"
              >
                {t("nav.consultation")}
              </Link>
            </div>
            <NavMobileDrawer />
          </div>
        </div>
      </nav>
    </header>
  );
}
