import Image from "next/image";
import { ArrowRight, PlayCircle } from "lucide-react";
import type { ReactNode } from "react";

import type { TrackerSummary } from "@/lib/learning/types";
import { cn } from "@/lib/utils";

type TrackerCardProps = {
  tracker: TrackerSummary;
  index: number;
  lessonCount?: number;
  doneCount?: number;
  onOpen: (tracker: TrackerSummary) => void;
};

export function TrackerCard({
  tracker,
  index,
  lessonCount,
  doneCount,
  onOpen,
}: TrackerCardProps) {
  return (
    <article className="group overflow-hidden rounded-[28px] border border-black/8 bg-white/80 shadow-[0_16px_50px_rgba(15,23,42,0.08)] backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)]">
      <div className="relative h-44 overflow-hidden bg-[#f2efe8] sm:h-52">
        <Image
          src={tracker.imageUrl}
          alt={tracker.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 33vw"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
        <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/25 bg-black/35 px-3 py-1 text-xs font-semibold tracking-[0.2em] text-white backdrop-blur-sm">
          <span>TRACKER</span>
          <span className="text-white/75">0{index + 1}</span>
        </div>
      </div>

      <div className="space-y-4 p-5 sm:p-6">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
            Learning path
          </p>
          <h3 className="text-xl font-semibold text-slate-950 sm:text-[1.35rem]">
            {tracker.title}
          </h3>
          <p className="line-clamp-3 text-sm leading-6 text-slate-600">
            {tracker.description}
          </p>
        </div>

        {/* <div className="flex flex-wrap items-center gap-2">
          <StatusChip tone="neutral">{lessonCount ?? "?"} lessons</StatusChip>
          <StatusChip tone="success">{doneCount ?? 0} done</StatusChip>
          <StatusChip tone="accent">Open playlist</StatusChip>
        </div> */}

        <button
          type="button"
          onClick={() => onOpen(tracker)}
          className={cn(
            "inline-flex w-full items-center justify-between rounded-2xl border border-slate-950/10 bg-slate-950 px-4 py-3 text-left text-sm font-medium text-white transition-all duration-300",
            "hover:bg-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950/40"
          )}
        >
          <span className="inline-flex items-center gap-2">
            <PlayCircle className="size-4" />
            <span>Open tracker</span>
          </span>
          <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </div>
    </article>
  );
}

function StatusChip({
  tone,
  children,
}: {
  tone: "neutral" | "success" | "accent";
  children: ReactNode;
}) {
  const toneClass =
    tone === "success"
      ? "border-emerald-200 bg-emerald-50 text-emerald-700"
      : tone === "accent"
        ? "border-amber-200 bg-amber-50 text-amber-800"
        : "border-slate-200 bg-slate-50 text-slate-700";

  return (
    <span className={cn("inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium", toneClass)}>
      {children}
    </span>
  );
}
