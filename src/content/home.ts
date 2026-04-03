// Assets
import craftImage from "@/assets/images/crataeis_artist_section.png";
import heroBackground from "@/assets/images/crataeis_hero.png";
import locationImage from "@/assets/images/location_hero.png";

export const HOME_MEDIA = {
  heroBackground,
  craftImage,
  locationImage,
} as const;

export const SERVICE_IDS = [
  "web",
  "consulting",
  "seo",
  "googleBusiness",
] as const;

export type ServiceId = (typeof SERVICE_IDS)[number];

export function parseServiceIdParam(
  raw: string | undefined,
): ServiceId | undefined {
  if (!raw) return undefined;
  return (SERVICE_IDS as readonly string[]).includes(raw)
    ? (raw as ServiceId)
    : undefined;
}

export const IMPACT_METRIC_IDS = ["m1", "m2", "m3", "m4"] as const;

export type ImpactMetricId = (typeof IMPACT_METRIC_IDS)[number];
