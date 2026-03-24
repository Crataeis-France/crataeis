"use client";

import { ArrowUp } from "lucide-react";

type Props = {
  label: string;
};

export function BackToTop({ label }: Props) {
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="group flex cursor-pointer items-center gap-2 text-sm font-medium text-indigo-400"
    >
      <span className="inline-block transition-transform group-hover:-translate-y-1">
        {label}
      </span>
      <ArrowUp className="size-4" aria-hidden />
    </button>
  );
}
