// Assets
import craftImage from "@/assets/images/crataeis_artist_section.png";
import heroBackground from "@/assets/images/crataeis_hero.png";

export const HOME_MEDIA = {
  heroBackground,
  craftImage,
} as const;

export const SERVICE_IDS = [
  "web",
  "consulting",
  "seo",
  "googleBusiness",
] as const;

export type ServiceId = (typeof SERVICE_IDS)[number];

export const IMPACT_METRIC_IDS = ["m1", "m2", "m3", "m4"] as const;

export type ImpactMetricId = (typeof IMPACT_METRIC_IDS)[number];
