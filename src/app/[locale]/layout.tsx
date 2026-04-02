import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
// Components
import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import { CookieConsent } from "@/components/CookieConsent";
// i18n
import { routing } from "@/i18n/routing";
import { getMetadataBase } from "@/lib/site-url";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};

  const t = await getTranslations({ locale, namespace: "Metadata" });
  return {
    metadataBase: getMetadataBase(),
    title: {
      default: t("title"),
      template: `%s | ${t("title")}`,
    },
    description: t("description"),
    openGraph: {
      title: t("title"),
      description: t("description"),
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();


  return (
    <NextIntlClientProvider messages={messages}>
      <CookieConsent>
        <Navigation />
        {children}
        <Footer />
      </CookieConsent>
    </NextIntlClientProvider>
  );
}
