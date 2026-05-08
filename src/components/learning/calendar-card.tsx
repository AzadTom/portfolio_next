import { CalendarDays, CheckCircle2 } from "lucide-react";

import { buildWeekDays } from "@/lib/learning/storage";
import { cn } from "@/lib/utils";

type CalendarCardProps = {
  visitDays: string[];
  onCheckInToday: () => void;
};

export function CalendarCard({ visitDays, onCheckInToday }: CalendarCardProps) {
  const weekDays = buildWeekDays();
  const completedDays = visitDays.filter((day) => weekDays.some((item) => item.key === day)).length;
  const streakLabel = `${completedDays}/7 days`;

  return (
    <section className="rounded-[30px] border border-black/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(250,246,240,0.92))] p-5 shadow-[0_18px_50px_rgba(15,23,42,0.08)] sm:p-6">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-amber-900">
            <CalendarDays className="size-3.5" />
            Week challenge
          </div>
          {/* <div>
            <h2 className="text-2xl font-semibold text-slate-950 sm:text-[2rem]">
              Keep the learning streak alive.
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
              Your visit tracker saves locally, marks today automatically, and keeps the week visible at a glance.
            </p>
          </div> */}
        </div>

        {/* <button
          type="button"
          onClick={onCheckInToday}
          className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-950/10 bg-slate-950 px-4 py-3 text-sm font-medium text-white transition hover:bg-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950/40 sm:w-auto"
        >
          <CheckCircle2 className="size-4" />
          Check in today
        </button> */}
      </div>

      <div className="mt-5 rounded-[26px] border border-slate-200 bg-white/55 px-3 py-4">
        <div className="mb-3 flex items-center justify-between gap-3 text-[11px] font-medium uppercase tracking-[0.18em] text-slate-500">
          <span>Swipe or scroll</span>
          <span>Weekly streak</span>
        </div>
        <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain scroll-smooth pb-1">
          {weekDays.map((day) => {
            const visited = visitDays.includes(day.key);

            return (
              <div
                key={day.key}
                className={cn(
                  "min-w-[168px] snap-start rounded-2xl border px-3 py-4 text-center transition",
                  visited
                    ? "border-emerald-200 bg-emerald-50/90 text-emerald-900"
                    : "border-slate-200 bg-white/80 text-slate-500",
                  day.isToday && "ring-2 ring-slate-950/20"
                )}
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em]">{day.label}</p>
                <p className="mt-1 text-2xl font-semibold">{day.day}</p>
                <div className="mt-2 flex items-center justify-center gap-1 text-[11px] font-medium">
                  <span className={cn("inline-block size-2 rounded-full", visited ? "bg-emerald-500" : "bg-slate-300")} />
                  {day.isToday ? "Today" : visited ? "Visited" : "Open"}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-3 text-sm text-slate-600 sm:flex-row sm:flex-wrap sm:items-center">
        <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5">
          <strong className="text-slate-950">{streakLabel}</strong> this week
        </span>
        <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5">
          Stored in browser localStorage
        </span>
      </div>
    </section>
  );
}
