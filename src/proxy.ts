import createMiddleware from "next-intl/middleware";
// i18n
import { routing } from "@/i18n/routing";
export default createMiddleware(routing);

export const config = {
  matcher: ["/((?!api|trpc|_next|_vercel|.*\\..*).*)"],
};
