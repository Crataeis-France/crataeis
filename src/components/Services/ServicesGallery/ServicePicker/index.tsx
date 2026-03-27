"use client";

import { ArrowRight } from "lucide-react";
// Lib
import { cn } from "@/lib/utils";
// Content
import type { ServiceId } from "@/content/home";
import type { ServicePickerItem } from "@/content/servicesGallery";

export type { ServicePickerItem };

type Props = {
  items: ServicePickerItem[];
  activeId: ServiceId;
  onSelect: (id: ServiceId) => void;
  activeInsightLabel: string;
  servicePrefix: string;
};

export function ServicePicker({
  items,
  activeId,
  onSelect,
  activeInsightLabel,
  servicePrefix,
}: Props) {
  return (
    <div className="flex w-full flex-col gap-3 sm:gap-4 lg:w-1/3">
      {items.map((item) => {
        const active = item.id === activeId;
        const indexLabel = `${servicePrefix} ${String(item.index).padStart(2, "0")}`;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onSelect(item.id)}
            className={cn(
              "group flex cursor-pointer flex-col items-start rounded-xl border-l-4 p-4 text-left transition-all duration-300 sm:p-6 lg:p-8",
              active
                ? "border-mkt-primary bg-mkt-surface-container-high"
                : "border-transparent bg-mkt-surface-container-low hover:bg-mkt-surface-container-high",
            )}
          >
            <span
              className={cn(
                "mb-2 font-mkt-body text-xs tracking-widest uppercase",
                active
                  ? "text-mkt-on-primary-container"
                  : "text-mkt-on-tertiary-container",
              )}
            >
              {indexLabel}
            </span>
            <h3
              className={cn(
                "text-balance font-mkt-headline text-lg font-bold transition-colors sm:text-xl lg:text-2xl",
                active
                  ? "text-mkt-on-surface"
                  : "text-mkt-on-surface group-hover:text-mkt-primary",
              )}
            >
              {item.title}
            </h3>
            {active ? (
              <div className="mt-4 flex items-center gap-2 text-mkt-primary opacity-100">
                <span className="text-sm font-medium">
                  {activeInsightLabel}
                </span>
                <ArrowRight className="size-4" aria-hidden />
              </div>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
