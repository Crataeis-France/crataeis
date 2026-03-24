import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { getTranslations } from "next-intl/server";
// Content
import { HOME_MEDIA } from "@/content/home";

export async function HomeCraftSection() {
  const t = await getTranslations("HomePage");
  const bullets = [t("craft.bullet1"), t("craft.bullet2"), t("craft.bullet3")];

  return (
    <section
      id="about"
      className="overflow-hidden border-y border-white/5 bg-mkt-surface-container-low py-20"
    >
      <div className="mx-auto grid max-w-screen-2xl grid-cols-1 items-center gap-20 px-8 lg:grid-cols-2">
        <div className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-2xl">
            <Image
              src={HOME_MEDIA.craftImage}
              alt={t("craft.imageAlt")}
              fill
              className="object-cover grayscale transition-all duration-700 hover:grayscale-0"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-mkt-surface-dim/80 to-transparent" />
          </div>
        </div>
        <div>
          <h2 className="mb-6 font-mkt-body text-sm tracking-[0.3em] text-mkt-primary uppercase">
            {t("craft.eyebrow")}
          </h2>
          <h3 className="mb-8 font-mkt-headline text-5xl leading-tight font-bold text-mkt-on-surface">
            {t("craft.title")}{" "}
            <span className="text-indigo-400">{t("craft.titleHighlight")}</span>
          </h3>
          <p className="mb-10 text-xl leading-relaxed font-light text-mkt-on-surface-variant">
            {t("craft.description")}
          </p>
          <ul className="mb-12 space-y-6">
            {bullets.map((line) => (
              <li key={line} className="flex items-start gap-4">
                <CheckCircle2
                  className="mt-1 size-5 shrink-0 text-mkt-primary"
                  aria-hidden
                />
                <span className="text-mkt-on-surface">{line}</span>
              </li>
            ))}
          </ul>
          <a
            href="#services"
            className="inline-block rounded-lg bg-mkt-indigo-brand px-8 py-3 font-medium text-white transition-all hover:bg-indigo-500"
          >
            {t("craft.cta")}
          </a>
        </div>
      </div>
    </section>
  );
}
