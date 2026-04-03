import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
// Content
import { HOME_MEDIA } from "@/content/home";
// Components
import { HomeCraftSection } from "@/components/Home/HomeCraftSection";
import { HomeHero } from "@/components/Home/HomeHero";
import { HomeImpactSection } from "@/components/Home/HomeImpactSection";
import { HomeLocationSection } from "@/components/Home/HomeLocationSection";
import { HomeServicesSection } from "@/components/Home/HomeServicesSection";
// i18n
import { routing } from "@/i18n/routing";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "HomePage.metadata" });
  const tHome = await getTranslations({ locale, namespace: "HomePage" });
  const title = t("title");
  const description = t("description");
  const hero = HOME_MEDIA.heroBackground;
  const images = [
    {
      url: hero.src,
      width: hero.width,
      height: hero.height,
      alt: tHome("hero.imageAlt"),
    },
  ];
  return {
    title: { absolute: title },
    description,
    openGraph: { title, description, images },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [hero.src],
    },
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
        <HomeLocationSection />
        <HomeImpactSection />
      </main>
    </div>
  );
}

export function generateStaticParams() {
  return routing.locales.map((loc) => ({ locale: loc }));
}
