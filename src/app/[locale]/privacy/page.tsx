import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("PrivacyPage.metadata");
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function PrivacyPage() {
  const t = await getTranslations("PrivacyPage");

  return (
    <main className="bg-mkt-surface-dim pb-16 pt-28 font-mkt-body text-mkt-on-surface selection:bg-mkt-primary/30 sm:pb-20 sm:pt-32 lg:pb-24">
      <section className="mx-auto max-w-4xl px-6 sm:px-8">
        <h1 className="mb-2 font-mkt-headline text-4xl font-bold tracking-tight sm:text-5xl">
          {t("title")}
        </h1>
        <p className="mb-10 text-sm text-mkt-on-surface-variant">{t("lastUpdated")}</p>

        <div className="space-y-8 leading-relaxed text-mkt-on-surface-variant">
          <p>{t("intro")}</p>

          <section>
            <h2 className="mb-3 font-mkt-headline text-2xl font-semibold text-mkt-on-surface">
              {t("sections.s1.title")}
            </h2>
            <p className="mb-3">{t("sections.s1.body")}</p>
            <ul className="list-disc space-y-1 pl-6">
              <li>{t("sections.s1.bullets.b1")}</li>
              <li>{t("sections.s1.bullets.b2")}</li>
              <li>{t("sections.s1.bullets.b3")}</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 font-mkt-headline text-2xl font-semibold text-mkt-on-surface">
              {t("sections.s2.title")}
            </h2>
            <p className="mb-3">{t("sections.s2.body")}</p>
            <ul className="list-disc space-y-1 pl-6">
              <li>{t("sections.s2.bullets.b1")}</li>
              <li>{t("sections.s2.bullets.b2")}</li>
              <li>{t("sections.s2.bullets.b3")}</li>
            </ul>
            <p className="mt-3">{t("sections.s2.note")}</p>
          </section>

          <section>
            <h2 className="mb-3 font-mkt-headline text-2xl font-semibold text-mkt-on-surface">
              {t("sections.s3.title")}
            </h2>
            <p>{t("sections.s3.body")}</p>
            <ul className="mt-3 list-disc space-y-1 pl-6">
              <li>{t("sections.s3.bullets.b1")}</li>
              <li>{t("sections.s3.bullets.b2")}</li>
              <li>{t("sections.s3.bullets.b3")}</li>
            </ul>
            <p className="mt-3">{t("sections.s3.note")}</p>
          </section>

          <section>
            <h2 className="mb-3 font-mkt-headline text-2xl font-semibold text-mkt-on-surface">
              {t("sections.s4.title")}
            </h2>
            <p className="mb-3">{t("sections.s4.body")}</p>
            <ul className="list-disc space-y-1 pl-6">
              <li>{t("sections.s4.bullets.b1")}</li>
              <li>{t("sections.s4.bullets.b2")}</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 font-mkt-headline text-2xl font-semibold text-mkt-on-surface">
              {t("sections.s5.title")}
            </h2>
            <p>{t("sections.s5.body")}</p>
            <p className="mt-3">{t("sections.s5.rightsIntro")}</p>
            <ul className="mt-3 list-disc space-y-1 pl-6">
              <li>{t("sections.s5.bullets.b1")}</li>
              <li>{t("sections.s5.bullets.b2")}</li>
            </ul>
            <p className="mt-3">{t("sections.s5.note")}</p>
          </section>

          <section>
            <h2 className="mb-3 font-mkt-headline text-2xl font-semibold text-mkt-on-surface">
              {t("sections.s6.title")}
            </h2>
            <p>{t("sections.s6.body")}</p>
          </section>

          <section>
            <h2 className="mb-3 font-mkt-headline text-2xl font-semibold text-mkt-on-surface">
              {t("sections.s7.title")}
            </h2>
            <p>{t("sections.s7.body")}</p>
          </section>
        </div>
      </section>
    </main>
  );
}
