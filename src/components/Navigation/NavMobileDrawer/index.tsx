"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
// i18n
import { Link } from "@/i18n/navigation";
// Components
import { LanguageToggle } from "@/components/Navigation/LanguageToggle";
import { NavPrimaryLinks } from "@/components/Navigation/NavPrimaryLinks";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

export function NavMobileDrawer() {
  const [open, setOpen] = useState(false);
  const t = useTranslations("HomePage");
  const close = () => setOpen(false);

  return (
    <div className="md:hidden">
      <Drawer
        direction="right"
        open={open}
        onOpenChange={setOpen}
        repositionInputs={false}
      >
        <DrawerTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="text-slate-300 hover:bg-white/10 hover:text-white"
            aria-label={t("nav.openMenuAria")}
          >
            <Menu className="size-6" aria-hidden />
          </Button>
        </DrawerTrigger>
        <DrawerContent className="min-h-0 border-white/10 bg-slate-950 text-slate-100">
          <DrawerTitle className="sr-only">{t("nav.menuDrawerTitle")}</DrawerTitle>
          <div className="flex shrink-0 justify-end border-b border-white/5 px-2 py-2">
            <DrawerClose asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="text-slate-300 hover:bg-white/10 hover:text-white"
                aria-label={t("nav.closeMenuAria")}
              >
                <X className="size-5" aria-hidden />
              </Button>
            </DrawerClose>
          </div>
          <div className="flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto px-4 pb-8 pt-2">
            <NavPrimaryLinks
              className="flex flex-col gap-1 font-mkt-headline font-medium"
              linkClassName="rounded-lg px-3 py-3 text-base text-slate-300 transition-colors hover:bg-white/5 hover:text-white"
              activeLinkClassName="rounded-lg bg-white/10 px-3 py-3 text-base font-medium text-indigo-400"
              onNavigate={close}
            />
            <div className="border-t border-white/10 pt-4">
              <p className="mb-3 font-mkt-body text-xs font-medium tracking-wider text-slate-500 uppercase">
                {t("nav.languageSelectAria")}
              </p>
              <LanguageToggle />
            </div>
            <Link
              href="/#book-consultation"
              onClick={close}
              className="rounded-lg bg-mkt-indigo-brand py-3 text-center text-sm font-medium text-white transition-colors hover:bg-indigo-500"
            >
              {t("nav.consultation")}
            </Link>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
