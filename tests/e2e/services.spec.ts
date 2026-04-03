import { expect, test } from "@playwright/test";

type LocaleKey = "en" | "fr";
type ServiceId = "web" | "consulting" | "seo" | "googleBusiness";

type ServiceContent = {
  pickerTitle: string;
  headline: string;
  body: string;
  f1Title: string;
  f1Body: string;
  f2Title: string;
  f2Body: string;
  cta: string;
  imageAlt: string;
};

const copy: Record<
  LocaleKey,
  {
    path: string;
    title: RegExp;
    activeInsight: string;
    services: Record<ServiceId, ServiceContent>;
  }
> = {
  en: {
    path: "/en/services",
    title: /Tech Solutions & Digital Strategy for Artisans \| Crataeis/i,
    activeInsight: "Active Insight",
    services: {
      web: {
        pickerTitle: "Web Design & Development",
        headline: "Bespoke digital experiences built with precision.",
        body: "We merge performance with aesthetic excellence",
        f1Title: "Precision Performance",
        f1Body: "Sub-second load times tailored for high-end boutique experiences.",
        f2Title: "Artistic Fidelity",
        f2Body: "Maintaining brand integrity through pixel-perfect visual translations.",
        cta: "Book a Consultation",
        imageAlt:
          "Close-up of artisan's hands working with raw clay on a potter's wheel, moody black and white photography, dramatic lighting.",
      },
      consulting: {
        pickerTitle: "Tech Consulting",
        headline: "Technology choices that respect how you work.",
        body: "We audit your stack, workflows, and integrations",
        f1Title: "Stack clarity",
        f1Body: "Short, actionable guidance on the platforms that fit a small studio.",
        f2Title: "Operational calm",
        f2Body: "Fewer surprises: backups, access, and handover patterns that scale with you.",
        cta: "Book a Consultation",
        imageAlt:
          "Close-up of artisan's hands working with raw clay on a potter's wheel, moody black and white photography, dramatic lighting.",
      },
      seo: {
        pickerTitle: "SEO & AEO Strategies",
        headline: "Discovery that matches the quality of your work.",
        body: "Structured content, technical SEO, and AEO-oriented patterns",
        f1Title: "Structured presence",
        f1Body: "Schema, metadata, and page models built for clarity and crawl efficiency.",
        f2Title: "Answer-ready content",
        f2Body: "Briefs and patterns tuned for how people (and models) summarize expertise.",
        cta: "Book a Consultation",
        imageAlt:
          "Close-up of artisan's hands working with raw clay on a potter's wheel, moody black and white photography, dramatic lighting.",
      },
      googleBusiness: {
        pickerTitle: "Google Business Consulting",
        headline: "Local reputation that reflects your studio in real life.",
        body: "Profile completeness, review cadence, and local signals aligned",
        f1Title: "Profile precision",
        f1Body: "Categories, services, and media aligned with your real-world offering.",
        f2Title: "Trust signals",
        f2Body: "Review and Q&A hygiene without sounding automated or generic.",
        cta: "Book a Consultation",
        imageAlt:
          "Close-up of artisan's hands working with raw clay on a potter's wheel, moody black and white photography, dramatic lighting.",
      },
    },
  },
  fr: {
    path: "/fr/services",
    title: /Solutions tech et stratégie numérique pour les artisans \| Crataeis/i,
    activeInsight: "Aperçu actif",
    services: {
      web: {
        pickerTitle: "Design & développement web",
        headline: "Des expériences numériques sur mesure, construites avec précision.",
        body: "Nous allions performance et exigence esthétique",
        f1Title: "Performance précise",
        f1Body: "Des temps de chargement sous la seconde, adaptés aux expériences boutique haut de gamme.",
        f2Title: "Fidélité artistique",
        f2Body: "Préserver votre identité visuelle grâce à une intégration pixel-perfect.",
        cta: "Réserver une consultation",
        imageAlt:
          "Gros plan sur les mains d’un artisan modelant de l’argile au tour, photo noir et blanc dramatique.",
      },
      consulting: {
        pickerTitle: "Conseil tech",
        headline: "Des choix technologiques alignés sur votre façon de travailler.",
        body: "Nous auditons stack, flux et intégrations",
        f1Title: "Clarté de stack",
        f1Body: "Recommandations courtes et actionnables pour les petits ateliers.",
        f2Title: "Sérénité opérationnelle",
        f2Body: "Sauvegardes, accès et passation conçus pour évoluer avec vous.",
        cta: "Réserver une consultation",
        imageAlt:
          "Gros plan sur les mains d’un artisan modelant de l’argile au tour, photo noir et blanc dramatique.",
      },
      seo: {
        pickerTitle: "Stratégies SEO & AEO",
        headline: "Une visibilité à la hauteur de la qualité de votre travail.",
        body: "Contenu structuré, SEO technique et patterns orientés AEO",
        f1Title: "Présence structurée",
        f1Body: "Schémas, métadonnées et modèles de page pensés pour la clarté et le crawl.",
        f2Title: "Contenu « answer-ready »",
        f2Body: "Briefs et patterns adaptés à la façon dont on résume l’expertise.",
        cta: "Réserver une consultation",
        imageAlt:
          "Gros plan sur les mains d’un artisan modelant de l’argile au tour, photo noir et blanc dramatique.",
      },
      googleBusiness: {
        pickerTitle: "Conseil Google Business",
        headline: "Une réputation locale fidèle à votre atelier.",
        body: "Profil complet, avis et signaux locaux alignés",
        f1Title: "Profil au cordeau",
        f1Body: "Catégories, services et visuels alignés sur votre offre réelle.",
        f2Title: "Signaux de confiance",
        f2Body: "Hygiène des avis et FAQ sans ton robotique.",
        cta: "Réserver une consultation",
        imageAlt:
          "Gros plan sur les mains d’un artisan modelant de l’argile au tour, photo noir et blanc dramatique.",
      },
    },
  },
};

const orderedServiceIds: ServiceId[] = [
  "web",
  "consulting",
  "seo",
  "googleBusiness",
];

test.describe("Services page", () => {
  for (const locale of ["en", "fr"] as const) {
    const c = copy[locale];

    test.describe(`${locale.toUpperCase()}`, () => {
      test("metadata title is localized", async ({ page }) => {
        await page.goto(c.path);
        await expect(page).toHaveTitle(c.title);
      });

      test("validates every service section content and picker data", async ({
        page,
      }) => {
        await page.goto(c.path);

        for (const serviceId of orderedServiceIds) {
          const data = c.services[serviceId];
          const pickerButton = page.getByRole("button", {
            name: data.pickerTitle,
          });

          await expect(pickerButton).toBeVisible();
          await pickerButton.click();
          await expect(page).toHaveURL(new RegExp(`service=${serviceId}`));

          await expect(page.getByRole("heading", { name: data.headline })).toBeVisible();
          await expect(page.getByText(data.body)).toBeVisible();
          await expect(page.getByRole("heading", { name: data.f1Title })).toBeVisible();
          await expect(page.getByText(data.f1Body)).toBeVisible();
          await expect(page.getByRole("heading", { name: data.f2Title })).toBeVisible();
          await expect(page.getByText(data.f2Body)).toBeVisible();
          await expect(
            page.getByRole("button", { name: data.cta }),
          ).toBeVisible();
          await expect(page.getByRole("img", { name: data.imageAlt })).toBeVisible();
          await expect(page.getByText(c.activeInsight)).toBeVisible();
        }
      });
    });
  }
});
