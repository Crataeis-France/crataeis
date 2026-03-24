
import { getTranslations } from "next-intl/server";
import {
  Building2,
  Globe,
  MapPin,
  SearchCheck,
  type LucideIcon,
} from "lucide-react";
// Content
import { SERVICE_IDS, type ServiceId } from "@/content/home";
// Components
import { ServiceCard } from "@/components/Home/ServiceCard";

export async function HomeServicesSection() {
  const t = await getTranslations("HomePage");

  const SERVICE_ICONS: Record<ServiceId, LucideIcon> = {
    web: Globe,
    consulting: Building2,
    seo: SearchCheck,
    googleBusiness: MapPin,
  };



  const services = SERVICE_IDS.map((id) => ({
    id,
    title: t(`services.items.${id}.title`),
    description: t(`services.items.${id}.description`),
  }));

  return (
    <section id="services" className="mx-auto max-w-screen-2xl px-8 pt-12 pb-16">
      <div className="mb-16">
        <h2 className="mb-4 font-mkt-body text-sm tracking-[0.3em] text-mkt-on-surface-variant uppercase">
          {t("services.eyebrow")}
        </h2>
        <h3 className="font-mkt-headline text-4xl font-bold text-mkt-on-surface">
          {t("services.title")}
        </h3>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {services.map((service) => (
          <ServiceCard
            key={service.id}
            id={`service-${service.id}`}
            icon={SERVICE_ICONS[service.id]}
            title={service.title}
            description={service.description}
            detailsLabel={t("services.viewDetails")}
            href="#services"
          />
        ))}
      </div>
    </section>
  );
}
