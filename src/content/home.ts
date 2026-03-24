export const HOME_MEDIA = {
  heroBackground:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuD3TXWb0WBqT7zH4OrxQKnF64TH3LKUaH49bSEMRkwwHxh2Sizqic-JlxuWFgnGOhwtshCIvfKeTOyeB9zBkmiggtXHp1yMRVO1R2SF4MzH0I2Y7HqBeJqRi0FcibQow1-PyJFFomjtbyd_c8uTIdIjoMW-50jUMQdFWQFkvklqfMeykFCsBBN9b8mOeUAyIRAQthMCU4qjxyfLeZ6ZrqavK2nfoR89TokTRQegoR0F5PJPUd34Vtiyx4a4wknAUsgEbWNHm6WhvLM",
  craftImage:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuA3Xy6nKRKHnynhJAie5Wsw1tWn82zGjy3pvYgAJBQOfzItO-uAAskbr4e1u00fMJSDm60HYJQ24QRIyOmOzDmioYRlOvn7bGDZ2TKq1TEi3dFaiQG_maI-4DTCGnlJC7qGbXHWGEkRRNyE_1CfZJpkoSdjuVr-w69JjrklaCT_YJndJeGyZJ8gSqYMz0oEeZqYmLfTnKTqtY1dXC4EuTnfoF2o3yQzt1qhfgiTsqSYnIu4ECUeQbDCpKW6PQ0aC7rb9h9xtAUGb_c",
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
