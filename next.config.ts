import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  /**
   * Dev-only: allow requests when the browser host differs (e.g. Playwright uses
   * 127.0.0.1 while tooling references localhost). Prevents blocked /_next loads
   * and flaky client navigation in e2e.
   * @see https://nextjs.org/docs/app/api-reference/config/next-config-js/allowedDevOrigins
   */
  allowedDevOrigins: ["127.0.0.1", "localhost"],
};

export default withNextIntl(nextConfig);
