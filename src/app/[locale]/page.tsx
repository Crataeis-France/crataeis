import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
// Components
import { HomeCraftSection } from "@/components/Home/HomeCraftSection";
import { HomeHero } from "@/components/Home/HomeHero";
import { HomeImpactSection } from "@/components/Home/HomeImpactSection";
import { HomeServicesSection } from "@/components/Home/HomeServicesSection";
// i18n
import { routing } from "@/i18n/routing";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "HomePage.metadata" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="dark min-h-screen bg-mkt-surface-dim font-mkt-body text-mkt-on-surface selection:bg-mkt-primary selection:text-mkt-on-primary">
      <main>
        <HomeHero />
        <HomeServicesSection />
        <HomeCraftSection />
        <HomeImpactSection />
      </main>
    </div>
  );
}

export function generateStaticParams() {
  return routing.locales.map((loc) => ({ locale: loc }));
}
