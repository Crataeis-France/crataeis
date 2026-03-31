import { createNavigation } from "next-intl/navigation";
// i18n
import { routing } from "@/i18n/routing";

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
