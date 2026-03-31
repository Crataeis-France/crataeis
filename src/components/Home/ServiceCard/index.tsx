import { ChevronRight, type LucideIcon } from "lucide-react";

import { Link } from "@/i18n/navigation";

type Props = {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  detailsLabel: string;
  href: string;
};

export function ServiceCard({
  id,
  icon: Icon,
  title,
  description,
  detailsLabel,
  href,
}: Props) {
  return (
    <article
      id={id}
      className="glass-panel-mkt flex h-full flex-col rounded-xl border border-white/5 p-8 transition-all hover:border-mkt-primary/30"
    >
      <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-mkt-indigo-brand/20">
        <Icon className="size-7 text-indigo-400" aria-hidden />
      </div>
      <h4 className="mb-4 font-mkt-headline text-xl font-bold text-mkt-on-surface">
        {title}
      </h4>
      <p className="grow text-sm leading-relaxed text-mkt-on-surface-variant">
        {description}
      </p>
      <Link
        href={href}
        className="mt-8 flex items-center border-t border-white/5 pt-4 text-sm font-medium text-mkt-primary"
      >
        {detailsLabel}
        <ChevronRight className="ml-1 size-4" aria-hidden />
      </Link>
    </article>
  );
}
