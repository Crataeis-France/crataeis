import type { MetadataRoute } from "next";
// i18n
import { locales } from "@/i18n/routing";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

  return locales.flatMap((locale) => [
    {
      url: `${baseUrl}/${locale}`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/${locale}/services`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/${locale}/privacy`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/${locale}/terms`,
      lastModified: new Date(),
    },
  ]);
}
