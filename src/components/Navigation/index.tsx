
import { headers } from "next/headers";
import { getTranslations } from "next-intl/server";
// i18n
import { Link } from "@/i18n/navigation";
// Components
import { LanguageToggle } from "@/components/Navigation/LanguageToggle";
export async function Navigation() {
  const t = await getTranslations("HomePage");
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") ?? headersList.get("next-url") ?? "";
  const navItems = [
    { href: "/#services", label: t("nav.services"), active: pathname === "/" },
    { href: "/#insights", label: t("nav.insights"), active: pathname === "/#insights" },
    { href: "/#about", label: t("nav.about"), active: pathname === "/#about" },
  ];
  return (
    <header>
      <nav className="fixed top-0 z-50 w-full border-b border-white/5 bg-slate-900/60 shadow-[0_20px_40px_rgba(7,0,108,0.15)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-screen-2xl items-center justify-between px-8 py-4">
          <Link
            href="/"
            className="shrink-0 font-mkt-headline text-2xl font-bold tracking-tighter text-slate-50 dark:text-white"
          >
            {"Crataeis"}
          </Link>

          <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-10 font-mkt-headline font-medium tracking-tight md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={
                  item.active
                    ? "border-b-2 border-indigo-500 pb-1 text-indigo-400"
                    : "text-slate-400 transition-colors hover:text-slate-100"
                }
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-6">
            <LanguageToggle />
            <Link
              href="/#book-consultation"
              className="rounded-lg bg-mkt-indigo-brand px-6 py-2 font-medium text-white transition-all hover:bg-indigo-500 active:scale-95"
            >
              {t("nav.consultation")}
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
