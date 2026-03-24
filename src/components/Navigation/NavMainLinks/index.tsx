"use client";

import { NavPrimaryLinks } from "@/components/Navigation/NavPrimaryLinks";

export function NavMainLinks() {
  return (
    <div className="absolute left-1/2 hidden w-full max-w-screen-2xl -translate-x-1/2 justify-center px-4 md:flex">
      <NavPrimaryLinks className="flex items-center gap-10 font-mkt-headline font-medium tracking-tight" />
    </div>
  );
}
