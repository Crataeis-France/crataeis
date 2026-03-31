// Content
import type { ServiceId } from "@/content/home";
import { SERVICE_IDS } from "@/content/home";
// Assets
import googleBusinessImg from "@/assets/images/google_business.png";
import seoImage from "@/assets/images/seo_image.png";
import techConsultingImg from "@/assets/images/tech_consulting.png";
import webDesignImg from "@/assets/images/web_design.png";

export const SERVICE_SHOWCASE_IMAGES: Record<ServiceId, typeof webDesignImg> = {
  web: webDesignImg,
  consulting: techConsultingImg,
  seo: seoImage,
  googleBusiness: googleBusinessImg,
};

export type ServicePickerItem = {
  id: ServiceId;
  index: number;
  title: string;
};

/** Stable ordering for picker items from the shared service id list. */
export function orderPickerItems(
  titles: Record<ServiceId, string>,
): ServicePickerItem[] {
  return SERVICE_IDS.map((id, i) => ({
    id,
    index: i + 1,
    title: titles[id],
  }));
}
