import { Locale } from "next-intl";
import { defineRouting } from "next-intl/routing";

export const locales: Locale[] = ["en", "fr"];

export const routing = defineRouting({
  locales,
  defaultLocale: "en",
});
