/** Origin for absolute URLs (metadata, sitemap). No trailing slash. */
export function getSiteOrigin(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, "");
  if (fromEnv) return fromEnv;
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL.replace(/\/$/, "")}`;
  }
  /* Local dev + CI (e.g. Playwright) when env is not set */
  return "http://127.0.0.1:3000";
}

export function getMetadataBase(): URL {
  return new URL(`${getSiteOrigin()}/`);
}
