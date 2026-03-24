import type { ReactNode } from "react";
import { getTranslations } from "next-intl/server";
// Content
import { IMPACT_METRIC_IDS, type ImpactMetricId } from "@/content/home";
// Components
import { ImpactMetricCard } from "@/components/Home/HomeImpactSection/ImpactMetricCard";

export type ImpactMetricSlot = {
  id: ImpactMetricId;
  value: string;
  body: ReactNode;
};

export async function HomeImpactSection() {
  const t = await getTranslations("HomePage");
  const metrics: ImpactMetricSlot[] = IMPACT_METRIC_IDS.map((id) => ({
    id,
    value: t(`impact.metrics.${id}.value`),
    body:
      id === "m1"
        ? t.rich(`impact.metrics.${id}.body`, {
          emphasis: (chunks) => (
            <span className="font-medium text-mkt-primary">{chunks}</span>
          ),
        })
        : t(`impact.metrics.${id}.body`),
  }));

  return (
    <section
      id="insights"
      className="relative overflow-hidden bg-mkt-surface-dim px-8 py-24"
    >
      <div className="absolute top-0 right-0 -mt-20 -mr-20 h-full w-1/3 rounded-full bg-mkt-indigo-brand/5 blur-[120px]" />
      <div className="relative z-10 mx-auto max-w-screen-2xl">
        <div className="mb-16 max-w-3xl">
          <h2 className="mb-4 font-mkt-body text-sm tracking-[0.3em] text-mkt-primary uppercase">
            {t("impact.eyebrow")}
          </h2>
          <h3 className="mb-6 font-mkt-headline text-5xl leading-tight font-bold text-mkt-on-surface">
            {t("impact.title")}{" "}
            <span className="text-indigo-400">{t("impact.titleHighlight")}</span>
          </h3>
          <p className="text-lg leading-relaxed font-light text-mkt-on-surface-variant">
            {t("impact.intro")}
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {metrics.map((m) => (
            <ImpactMetricCard key={m.id} value={m.value}>
              {m.body}
            </ImpactMetricCard>
          ))}
        </div>
      </div>
    </section>
  );
}
