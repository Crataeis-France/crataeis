import { getTranslations } from "next-intl/server";
// Components
import { ContactEmailDialog } from "@/components/Contact/ContactEmailDialog";
import { ServiceShowcaseShell } from "@/components/Services/ServiceShowcaseShell";
// Content
import { SERVICE_SHOWCASE_IMAGES } from "@/content/servicesGallery";

export async function SeoAeoService() {
  const t = await getTranslations("SeoAeoService");

  return (
    <ServiceShowcaseShell
      imageSrc={SERVICE_SHOWCASE_IMAGES.seo}
      imageAlt={t("imageAlt")}
    >
      <h2 className="mb-4 text-balance font-mkt-headline text-3xl leading-tight font-bold text-mkt-on-surface sm:mb-6 sm:text-4xl md:text-5xl">
        {t("headline")}
      </h2>
      <p className="mb-8 font-mkt-body text-base leading-relaxed text-mkt-on-surface-variant sm:mb-10 sm:text-lg">
        {t("body")}
      </p>
      <div className="mb-10 grid grid-cols-1 gap-6 sm:mb-12 sm:grid-cols-2 sm:gap-8">
        <div>
          <h4 className="mb-2 font-mkt-headline text-lg font-bold text-mkt-primary">
            {t("f1Title")}
          </h4>
          <p className="font-mkt-body text-sm text-mkt-on-tertiary-container">
            {t("f1Body")}
          </p>
        </div>
        <div>
          <h4 className="mb-2 font-mkt-headline text-lg font-bold text-mkt-primary">
            {t("f2Title")}
          </h4>
          <p className="font-mkt-body text-sm text-mkt-on-tertiary-container">
            {t("f2Body")}
          </p>
        </div>
      </div>
      <ContactEmailDialog
        initialServiceId="seo"
        triggerLabel={t("bookConsultation")}
        triggerClassName="h-auto w-fit cursor-pointer self-start rounded-md bg-mkt-primary px-4 py-2.5 text-sm font-medium text-mkt-surface-dim transition-all hover:bg-mkt-surface-tint active:scale-95"
      />
    </ServiceShowcaseShell>
  );
}
