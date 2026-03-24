import type { ReactNode } from "react";

type Props = {
  value: string;
  children: ReactNode;
};

export function ImpactMetricCard({ value, children }: Props) {
  return (
    <div className="group relative">
      <div className="absolute inset-0 rounded-2xl bg-mkt-indigo-brand/20 blur-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="glass-panel-mkt relative h-full border border-white/5 p-10 transition-all duration-300 hover:border-indigo-400/30">
        <div className="mb-6 font-mkt-headline text-6xl font-bold text-indigo-400">
          {value}
        </div>
        <div className="text-lg leading-relaxed font-light text-mkt-on-surface">
          {children}
        </div>
      </div>
    </div>
  );
}
