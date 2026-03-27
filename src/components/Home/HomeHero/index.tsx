import Image from "next/image";
import { getTranslations } from "next-intl/server";
// Content
import { HOME_MEDIA } from "@/content/home";
// i18n
import { Link } from "@/i18n/navigation";

export async function HomeHero() {
  const t = await getTranslations("HomePage");

  return (
    <section className="relative flex items-center overflow-hidden bg-mkt-surface-dim pt-20 pb-8">
      <div className="absolute inset-0 z-0">
        <Image
          src={HOME_MEDIA.heroBackground}
          alt={t("hero.imageAlt")}
          fill
          className="object-cover opacity-50"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-mkt-surface-dim via-mkt-surface-dim/40 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-screen-2xl grid-cols-1 gap-12 px-8 md:grid-cols-12">
        <div className="md:col-span-8 lg:col-span-7">
          <h1 className="mb-8 font-mkt-headline text-6xl leading-[0.9] font-bold tracking-tighter text-mkt-on-surface md:text-8xl">
            {t("hero.titleLine1")}
            <br />
            <span className="text-mkt-primary">{t("hero.titleHighlight")}</span>
          </h1>
          <p className="mb-12 max-w-2xl text-xl leading-relaxed font-light text-mkt-on-surface-variant md:text-2xl">
            {t("hero.description")}
          </p>
          <div className="flex flex-wrap gap-6">
            <Link
              href="/services"
              className="rounded-lg bg-mkt-indigo-brand px-10 py-4 text-lg font-semibold text-white transition-all hover:bg-indigo-500"
            >
              {t("hero.primaryCta")}
            </Link>
            <a
              href="#book-consultation"
              className="rounded-lg border border-white/10 bg-slate-800/50 px-10 py-4 text-lg font-semibold text-mkt-secondary transition-all hover:bg-slate-700"
            >
              {t("hero.secondaryCta")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
