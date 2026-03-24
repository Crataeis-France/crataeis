import { getTranslations } from "next-intl/server";
// i18n
import { Link } from "@/i18n/navigation";
// Components
import { ServiceShowcaseShell } from "@/components/Services/ServiceShowcaseShell";
// Content
import { SERVICE_SHOWCASE_IMAGES } from "@/content/servicesGallery";

export async function TechConsultingService() {
  const t = await getTranslations("TechConsultingService");

  return (
    <ServiceShowcaseShell
      imageSrc={SERVICE_SHOWCASE_IMAGES.consulting}
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
      <Link
        href="/#book-consultation"
        className="w-fit self-start rounded-md bg-mkt-primary px-4 py-2.5 text-sm font-medium text-mkt-on-primary transition-all hover:bg-mkt-surface-tint active:scale-95"
      >
        {t("bookConsultation")}
      </Link>
    </ServiceShowcaseShell>
  );
}
