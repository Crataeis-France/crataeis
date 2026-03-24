"use client";

import { useSyncExternalStore } from "react";
import { useTranslations } from "next-intl";
// i18n
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

function subscribeHash(onChange: () => void) {
  window.addEventListener("hashchange", onChange);
  return () => window.removeEventListener("hashchange", onChange);
}

function getHashSnapshot() {
  return typeof window !== "undefined" ? window.location.hash : "";
}

function getServerHashSnapshot() {
  return "";
}

export type NavPrimaryLinksProps = {
  className?: string;
  linkClassName?: string;
  activeLinkClassName?: string;
  onNavigate?: () => void;
};

export function NavPrimaryLinks({
  className,
  linkClassName = "text-slate-400 transition-colors hover:text-slate-100",
  activeLinkClassName = "border-b-2 border-indigo-500 pb-1 text-indigo-400",
  onNavigate,
}: NavPrimaryLinksProps) {
  const t = useTranslations("HomePage");
  const pathname = usePathname();
  const hash = useSyncExternalStore(
    subscribeHash,
    getHashSnapshot,
    getServerHashSnapshot,
  );

  const navItems = [
    {
      href: "/services",
      label: t("nav.services"),
      active: pathname === "/services",
    },
    {
      href: "/#insights",
      label: t("nav.insights"),
      active: pathname === "/" && hash === "#insights",
    },
    {
      href: "/#about",
      label: t("nav.about"),
      active: pathname === "/" && hash === "#about",
    },
  ];

  return (
    <nav className={className} aria-label={t("nav.mainNavAria")}>
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          onClick={onNavigate}
          className={cn(
            item.active ? activeLinkClassName : linkClassName,
          )}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
