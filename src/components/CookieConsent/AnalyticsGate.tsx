"use client";

import { Analytics } from "@vercel/analytics/next";
// Components
import { useCookieConsent } from "@/components/CookieConsent/CookieConsentProvider";
// Hooks
import { useIsClient } from "@/components/CookieConsent/hooks";

export function AnalyticsGate() {
  const isClient = useIsClient();
  const { effectivePreferences } = useCookieConsent();

  if (!isClient) return null;
  if (!effectivePreferences.analytics) return null;

  return (
    <>
      <span data-testid="vercel-analytics-active" hidden aria-hidden />
      <Analytics />
    </>
  );
}
