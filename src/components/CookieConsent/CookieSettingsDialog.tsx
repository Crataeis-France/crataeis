"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
// Components
import { useCookieConsent } from "@/components/CookieConsent/CookieConsentProvider";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
// Lib
import { cn } from "@/lib/utils";

type Props = {
  triggerLabel: string;
  triggerClassName?: string;
  /** For e2e / automation (banner vs footer triggers). */
  triggerTestId?: string;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export function CookieSettingsDialog({
  triggerLabel,
  triggerClassName,
  triggerTestId,
  defaultOpen,
  onOpenChange,
}: Props) {
  const t = useTranslations("CookieConsent");
  const {
    effectivePreferences,
    setPreferences,
    acceptAll,
    rejectNonEssential,
  } = useCookieConsent();
  const [open, setOpen] = useState(!!defaultOpen);

  const analyticsEnabled = effectivePreferences.analytics;

  const preferenceSummary = useMemo(() => {
    return analyticsEnabled ? t("summary.accepted") : t("summary.rejected");
  }, [analyticsEnabled, t]);

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        onOpenChange?.(next);
      }}
    >
      <DialogTrigger asChild>
        <button
          type="button"
          data-testid={triggerTestId}
          className={cn(
            "cursor-pointer font-mkt-body text-sm transition-colors",
            "text-slate-500 hover:text-indigo-400",
            triggerClassName,
          )}
        >
          {triggerLabel}
        </button>
      </DialogTrigger>

      <DialogContent className="border-white/10 bg-mkt-surface-container text-mkt-on-surface sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>{t("dialog.title")}</DialogTitle>
          <DialogDescription className="text-mkt-on-surface-variant">
            {t("dialog.description")}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="rounded-lg border border-white/10 bg-white/5 p-4">
            <div className="mb-1 flex items-center justify-between gap-3">
              <div className="font-mkt-headline text-sm font-semibold">
                {t("categories.necessary.title")}
              </div>
              <div className="text-xs font-medium text-slate-300">
                {t("categories.necessary.alwaysOn")}
              </div>
            </div>
            <p className="text-sm text-mkt-on-surface-variant">
              {t("categories.necessary.body")}
            </p>
          </div>

          <div className="rounded-lg border border-white/10 bg-white/5 p-4">
            <div className="mb-2 flex items-center justify-between gap-3">
              <div className="font-mkt-headline text-sm font-semibold">
                {t("categories.analytics.title")}
              </div>
              <label className="inline-flex cursor-pointer items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  className="size-4 accent-indigo-500"
                  checked={analyticsEnabled}
                  onChange={(e) =>
                    setPreferences({ analytics: e.target.checked })
                  }
                  aria-label={t("categories.analytics.toggleAria")}
                />
                <span className="text-sm text-slate-200">
                  {analyticsEnabled ? t("toggle.on") : t("toggle.off")}
                </span>
              </label>
            </div>
            <p className="text-sm text-mkt-on-surface-variant">
              {t("categories.analytics.body")}
            </p>
            <p className="mt-2 text-xs text-slate-400">{preferenceSummary}</p>
          </div>
        </div>

        <DialogFooter className="gap-3 sm:gap-2">
          <Button
            type="button"
            variant="outline"
            className="cursor-pointer border-white/20 bg-white/5 text-slate-100 shadow-none hover:bg-white/10 hover:text-slate-50 dark:border-white/20 dark:bg-white/5 dark:hover:bg-white/10 dark:hover:text-slate-50"
            onClick={() => rejectNonEssential()}
          >
            {t("actions.rejectNonEssential")}
          </Button>
          <Button
            type="button"
            className="cursor-pointer bg-mkt-indigo-brand text-white hover:bg-indigo-500"
            onClick={() => acceptAll()}
          >
            {t("actions.acceptAll")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
