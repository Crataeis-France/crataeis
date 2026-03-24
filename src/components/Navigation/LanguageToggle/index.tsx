"use client";

import { useLocale, useTranslations } from "next-intl";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

export function LanguageToggle() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("HomePage");

  const labels: Record<string, string> = {
    en: t("nav.languageEn"),
    fr: t("nav.languageFr"),
  };

  return (
    <Select
      value={locale}
      onValueChange={(nextLocale) => {
        router.replace(pathname, { locale: nextLocale });
      }}
    >
      <SelectTrigger
        size="sm"
        aria-label={t("nav.languageSelectAria")}
        className={cn(
          "h-8 min-w-[4.5rem] border-white/10 bg-transparent font-mkt-headline text-sm font-bold tracking-tight text-slate-400 shadow-none",
          "hover:bg-white/5 hover:text-indigo-200",
          "focus-visible:border-indigo-500/50 focus-visible:ring-indigo-500/30",
          "data-[state=open]:text-indigo-200",
        )}
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent
        position="popper"
        className="z-[200] min-w-[var(--radix-select-trigger-width)]"
      >
        {routing.locales.map((loc) => (
          <SelectItem key={loc} value={loc}>
            {labels[loc] ?? loc.toUpperCase()}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
