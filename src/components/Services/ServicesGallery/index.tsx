"use client";

import { useCallback, useEffect, useState } from "react";
// Content
import type { ServiceId } from "@/content/home";
import type { ServicePickerItem } from "@/content/servicesGallery";
// i18n
import { usePathname, useRouter } from "@/i18n/navigation";
// Components
import { ServicePicker } from "@/components/Services/ServicesGallery/ServicePicker";

type Props = {
  pickerItems: ServicePickerItem[];
  activeInsightLabel: string;
  servicePrefix: string;
  panels: Record<ServiceId, React.ReactNode>;
  initialId?: ServiceId;
};

export function ServicesGallery({
  pickerItems,
  activeInsightLabel,
  servicePrefix,
  panels,
  initialId = "web",
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const [activeId, setActiveId] = useState<ServiceId>(initialId);

  useEffect(() => {
    setActiveId(initialId);
  }, [initialId]);

  const selectService = useCallback(
    (id: ServiceId) => {
      setActiveId(id);
      const qs = new URLSearchParams();
      qs.set("service", id);
      router.replace(`${pathname}?${qs.toString()}`);
    },
    [pathname, router],
  );

  return (
    <div className="flex min-h-0 flex-col gap-6 sm:gap-8 lg:min-h-[560px] lg:flex-row lg:gap-12">
      <ServicePicker
        items={pickerItems}
        activeId={activeId}
        onSelect={selectService}
        activeInsightLabel={activeInsightLabel}
        servicePrefix={servicePrefix}
      />
      {panels[activeId]}
    </div>
  );
}
