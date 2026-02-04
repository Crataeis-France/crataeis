import { getTranslations, setRequestLocale } from "next-intl/server";
// i18n
import { routing } from "@/i18n/routing";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("HomePage");

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted font-sans">
      <main className="flex">
        <h1 className="text-foreground">{t("title")}</h1>
      </main>
    </div>
  );
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
