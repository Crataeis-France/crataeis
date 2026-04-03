import Image from "next/image";
import { Globe } from "lucide-react";
import { getTranslations } from "next-intl/server";
// Content
import { HOME_MEDIA } from "@/content/home";

export async function HomeLocationSection() {
  const t = await getTranslations("HomePage");

  return (
    <section
      id="location"
      className="overflow-hidden bg-mkt-surface-container-low py-24"
    >
      <div className="mx-auto grid max-w-screen-2xl grid-cols-1 items-center gap-16 px-8 lg:grid-cols-12">
        <div className="order-2 lg:order-1 lg:col-span-5">
          <h2 className="mb-6 font-mkt-body text-sm tracking-[0.3em] text-mkt-primary uppercase">
            {t("location.eyebrow")}
          </h2>
          <h3 className="mb-8 font-mkt-headline text-5xl leading-tight font-bold text-mkt-on-surface">
            {t("location.title")}{" "}
            <span className="text-indigo-400">
              {t("location.titleHighlight")}
            </span>
          </h3>
          <p className="mb-8 text-xl leading-relaxed font-light text-mkt-on-surface-variant">
            {t("location.description")}
          </p>
          <div className="group flex cursor-default items-center gap-4 text-mkt-on-surface">
            <div className="flex shrink-0 items-center justify-center rounded-full bg-mkt-indigo-brand/10 p-3 text-indigo-400">
              <Globe className="size-6" strokeWidth={1.75} aria-hidden />
            </div>
            <div>
              <div className="font-mkt-body text-sm tracking-widest text-slate-500 uppercase">
                {t("location.operationBase")}
              </div>
              <div className="text-lg font-medium">{t("location.region")}</div>
            </div>
          </div>
        </div>
        <div className="order-1 lg:order-2 lg:col-span-7">
          <div className="group relative">
            <div className="absolute -inset-4 rounded-[2rem] bg-mkt-indigo-brand/5 blur-2xl transition-colors duration-700 group-hover:bg-mkt-indigo-brand/10" />
            <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-white/5 shadow-2xl lg:aspect-[4/3]">
              <Image
                src={HOME_MEDIA.locationImage}
                alt={t("location.imageAlt")}
                fill
                className="scale-105 object-cover brightness-75 grayscale transition-all duration-1000 hover:scale-100 hover:brightness-100 hover:grayscale-0"
                sizes="(max-width: 1024px) 100vw, 58vw"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-mkt-surface-dim via-transparent to-transparent opacity-60" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
