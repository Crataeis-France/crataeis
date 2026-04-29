import type { MetadataRoute } from "next";
// i18n
import { locales } from "@/i18n/routing";
// Lib
import { getSiteOrigin } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteOrigin();
  const now = new Date();

  // 1. Define your core paths here
  const paths = ["", "/services", "/privacy", "/terms"];

  // 2. Loop through each path to build the entries
  const sitemapEntries = paths.flatMap((path) => {
    // 3. Build the alternate languages object for this specific path
    const alternatesLanguages: Record<string, string> = {
      "x-default": `${baseUrl}${path}`, // The default fallback (e.g., /services)
    };

    // Add every localized version to the alternates object (e.g., en: /en/services)
    locales.forEach((locale) => {
      alternatesLanguages[locale] = `${baseUrl}/${locale}${path}`;
    });

    // 4. Create the sitemap objects for the localized routes
    const localizedRouteEntries = locales.map((locale) => ({
      url: `${baseUrl}/${locale}${path}`,
      lastModified: now,
      alternates: {
        languages: alternatesLanguages,
      },
    }));

    // 5. Create the sitemap object for the root/default route itself
    const defaultRouteEntry = {
      url: `${baseUrl}${path}`,
      lastModified: now,
      alternates: {
        languages: alternatesLanguages,
      },
    };

    // Return all entries bundled together
    return [defaultRouteEntry, ...localizedRouteEntries];
  });

  return sitemapEntries;
}
