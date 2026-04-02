"use client";

import { type ReactNode } from "react";
// Components
import { AnalyticsGate } from "@/components/CookieConsent/AnalyticsGate";
import { CookieBanner } from "@/components/CookieConsent/CookieBanner";
import { CookieConsentProvider } from "@/components/CookieConsent/CookieConsentProvider";

export type CookieConsentProps = {
  children: ReactNode;
};

/**
 * Wraps the app with consent state, gated Vercel Analytics, and the cookie banner.
 */
export function CookieConsent({ children }: CookieConsentProps) {
  return (
    <CookieConsentProvider>
      {children}
      <AnalyticsGate />
      <CookieBanner />
    </CookieConsentProvider>
  );
}
