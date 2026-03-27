import { getTranslations } from "next-intl/server";
// Content
import { parseServiceIdParam, type ServiceId } from "@/content/home";
// Components
import { GoogleBusinessService } from "@/components/Services/GoogleBusinessService";
import { SeoAeoService } from "@/components/Services/SeoAeoService";
import { ServicesGallery } from "@/components/Services/ServicesGallery";
import { orderPickerItems } from "@/content/servicesGallery";
import { TechConsultingService } from "@/components/Services/TechConsultingService";
import { WebDesignService } from "@/components/Services/WebDesignService";

export async function generateMetadata() {
  const t = await getTranslations("ServicesPage");
  return { title: t("metadata.title") };
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
          servicePrefix={t("picker.servicePrefix")}
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
