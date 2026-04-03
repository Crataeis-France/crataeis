import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
// Content
import { parseServiceIdParam, type ServiceId } from "@/content/home";
// Components
import { GoogleBusinessService } from "@/components/Services/GoogleBusinessService";
import { SeoAeoService } from "@/components/Services/SeoAeoService";
import { ServicesGallery } from "@/components/Services/ServicesGallery";
import {
  orderPickerItems,
  SERVICE_SHOWCASE_IMAGES,
} from "@/content/servicesGallery";
import { TechConsultingService } from "@/components/Services/TechConsultingService";
import { WebDesignService } from "@/components/Services/WebDesignService";

const SERVICE_OG_ALT_NAMESPACE = {
  web: "WebDesignService",
  consulting: "TechConsultingService",
  seo: "SeoAeoService",
  googleBusiness: "GoogleBusinessService",
} as const satisfies Record<ServiceId, string>;

type MetadataProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ service?: string | string[] }>;
};

export async function generateMetadata({
  params,
  searchParams,
}: MetadataProps): Promise<Metadata> {
  const { locale } = await params;
  const sp = await searchParams;
  const raw =
    typeof sp.service === "string"
      ? sp.service
      : Array.isArray(sp.service)
        ? sp.service[0]
        : undefined;
  const serviceId = parseServiceIdParam(raw) ?? "web";
  const hero = SERVICE_SHOWCASE_IMAGES[serviceId];
  const tAlt = await getTranslations({
    locale,
    namespace: SERVICE_OG_ALT_NAMESPACE[serviceId],
  });

  const t = await getTranslations({ locale, namespace: "ServicesPage" });
  const tMeta = await getTranslations({ locale, namespace: "Metadata" });
  const title = t("metadata.title");
  const description = t("metadata.description");
  const ogTitle = `${title} | ${tMeta("title")}`;
  const images = [
    {
      url: hero.src,
      width: hero.width,
      height: hero.height,
      alt: tAlt("imageAlt"),
    },
  ];

  return {
    title,
    description,
    openGraph: {
      title: ogTitle,
      description,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      images: [hero.src],
    },
  };
}

type PageProps = {
  searchParams: Promise<{ service?: string }>;
};

const ServicesPage = async ({ searchParams }: PageProps) => {
  const { service: serviceParam } = await searchParams;
  const initialServiceId = parseServiceIdParam(serviceParam) ?? "web";

  const t = await getTranslations("ServicesPage");
  const tHome = await getTranslations("HomePage");

  const titles: Record<ServiceId, string> = {
    web: tHome("services.items.web.title"),
    consulting: tHome("services.items.consulting.title"),
    seo: tHome("services.items.seo.title"),
    googleBusiness: tHome("services.items.googleBusiness.title"),
  };

  return (
    <main className="bg-mkt-surface-dim pb-16 pt-24 font-mkt-body text-mkt-on-surface selection:bg-mkt-primary/30 sm:pb-20 sm:pt-28 lg:pb-24 lg:pt-32">
      <section className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
        <ServicesGallery
          initialId={initialServiceId}
          pickerItems={orderPickerItems(titles)}
          activeInsightLabel={t("picker.activeInsight")}
          panels={{
            web: <WebDesignService />,
            consulting: <TechConsultingService />,
            seo: <SeoAeoService />,
            googleBusiness: <GoogleBusinessService />,
          }}
        />
      </section>
    </main>
  );
};

export default ServicesPage;
