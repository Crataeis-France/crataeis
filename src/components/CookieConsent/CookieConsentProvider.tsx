"use client";

import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
// Lib
import type {
  CookieConsentPreferences,
  CookieConsentState,
} from "@/lib/cookie-consent";
import {
  getDefaultConsentState,
  readConsentState,
  writeConsentState,
} from "@/lib/cookie-consent";

type CookieConsentContextValue = {
  consent: CookieConsentState | null;
  effectivePreferences: CookieConsentPreferences;
  hasChoice: boolean;
  setPreferences: (
    preferences: Omit<CookieConsentPreferences, "necessary">,
  ) => void;
  acceptAll: () => void;
  rejectNonEssential: () => void;
};

const CookieConsentContext = createContext<CookieConsentContextValue | null>(
  null,
);

export function CookieConsentProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [consent, setConsent] = useState<CookieConsentState | null>(() =>
    readConsentState(),
  );

  const refresh = useCallback(() => {
    setConsent(readConsentState());
  }, []);

  useEffect(() => {
    const onChange = () => refresh();
    window.addEventListener("storage", onChange);
    window.addEventListener(
      "crataeis:cookie-consent",
      onChange as EventListener,
    );
    return () => {
      window.removeEventListener("storage", onChange);
      window.removeEventListener(
        "crataeis:cookie-consent",
        onChange as EventListener,
      );
    };
  }, [refresh]);

  const setPreferences = useCallback(
    (preferences: Omit<CookieConsentPreferences, "necessary">) => {
      const next: CookieConsentState = {
        ...(consent ?? getDefaultConsentState()),
        preferences: { necessary: true, analytics: !!preferences.analytics },
        updatedAt: new Date().toISOString(),
      };
      writeConsentState(next);
      setConsent(next);
    },
    [consent],
  );

  const acceptAll = useCallback(
    () => setPreferences({ analytics: true }),
    [setPreferences],
  );
  const rejectNonEssential = useCallback(
    () => setPreferences({ analytics: false }),
    [setPreferences],
  );

  const value = useMemo<CookieConsentContextValue>(() => {
    const effectivePreferences: CookieConsentPreferences =
      consent?.preferences ?? { necessary: true, analytics: false };
    return {
      consent,
      effectivePreferences,
      hasChoice: !!consent,
      setPreferences,
      acceptAll,
      rejectNonEssential,
    };
  }, [acceptAll, consent, rejectNonEssential, setPreferences]);

  return (
    <CookieConsentContext.Provider value={value}>
      {children}
    </CookieConsentContext.Provider>
  );
}

export function useCookieConsent() {
  const ctx = React.useContext(CookieConsentContext);
  if (!ctx) {
    throw new Error(
      "useCookieConsent must be used within CookieConsentProvider",
    );
  }
  return ctx;
}
