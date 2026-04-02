export type CookieConsentPreferences = {
  necessary: true;
  analytics: boolean;
};

export type CookieConsentState = {
  version: number;
  preferences: CookieConsentPreferences;
  updatedAt: string;
};

const STORAGE_KEY = "crataeis_cookie_consent";
const CONSENT_VERSION = 1;

export function getDefaultConsentState(): CookieConsentState {
  return {
    version: CONSENT_VERSION,
    preferences: { necessary: true, analytics: false },
    updatedAt: new Date().toISOString(),
  };
}

export function readConsentState(): CookieConsentState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<CookieConsentState> | null;
    if (!parsed || typeof parsed !== "object") return null;
    if (parsed.version !== CONSENT_VERSION) return null;
    const analytics = !!parsed.preferences?.analytics;
    return {
      version: CONSENT_VERSION,
      preferences: { necessary: true, analytics },
      updatedAt:
        typeof parsed.updatedAt === "string"
          ? parsed.updatedAt
          : new Date().toISOString(),
    };
  } catch {
    return null;
  }
}

export function writeConsentState(
  next: CookieConsentState,
  opts?: { broadcast?: boolean },
) {
  if (typeof window === "undefined") return;
  const safe: CookieConsentState = {
    version: CONSENT_VERSION,
    preferences: { necessary: true, analytics: !!next.preferences.analytics },
    updatedAt: next.updatedAt ?? new Date().toISOString(),
  };

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(safe));
    if (opts?.broadcast !== false) {
      window.dispatchEvent(new CustomEvent("crataeis:cookie-consent"));
    }
  } catch {
    // Ignore storage failures (private mode / blocked storage).
  }
}

export function clearConsentState(opts?: { broadcast?: boolean }) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
    if (opts?.broadcast !== false) {
      window.dispatchEvent(new CustomEvent("crataeis:cookie-consent"));
    }
  } catch {
    // Ignore.
  }
}
