 "use client";

import { useEffect, useRef } from "react";

import { CalendarDays, CheckCircle2 } from "lucide-react";

import { buildWeekDays } from "@/lib/learning/storage";
import { cn } from "@/lib/utils";

type CalendarCardProps = {
  visitDays: string[];
  onCheckInToday: () => void;
};

export function CalendarCard({ visitDays, onCheckInToday }: CalendarCardProps) {
  const weekDays = buildWeekDays();
  const currentDayRef = useRef<HTMLDivElement | null>(null);
  const currentDateLabel = new Intl.DateTimeFormat(undefined, {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());

  useEffect(() => {
    currentDayRef.current?.scrollIntoView({
      block: "nearest",
      inline: "center",
    });
  }, []);

  return (
    <section className="rounded-[30px] border border-slate-200 bg-white p-4 shadow-[0_16px_40px_rgba(15,23,42,0.06)] sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-700">
            <CalendarDays className="size-3.5" />
            Day streak
          </div>
          <h2 className="text-2xl font-semibold tracking-tight text-slate-950 sm:text-[2.1rem]">
            Today, {currentDateLabel}
          </h2>
          <p className="max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
            Your weekly streak is saved locally and stays easy to scan on mobile and desktop.
          </p>
        </div>
      </div>

      <div className="mt-5 overflow-x-auto overscroll-x-contain pb-1">
        <div className="flex min-w-max gap-3">
          {weekDays.map((day) => {
            const visited = visitDays.includes(day.key);
            const active = day.isToday;

              return (
                <div
                  key={day.key}
                  ref={active ? currentDayRef : undefined}
                  className={cn(
                    "flex w-[86px] shrink-0 flex-col items-center rounded-[22px] border px-3 py-3 text-center transition sm:w-[96px]",
                    active
                    ? "border-slate-950 bg-slate-950 text-white"
                    : visited
                      ? "border-slate-300 bg-white text-slate-950"
                      : "border-slate-200 bg-slate-50 text-slate-500"
                )}
              >
                <span
                  className={cn(
                    "text-[11px] font-medium",
                    active ? "text-white/80" : "text-slate-500"
                  )}
                >
                  {day.label}
                </span>
                <span className={cn("mt-1 text-lg font-semibold", active ? "text-white" : "text-slate-950")}>
                  {day.day}
                </span>
                <span
                  className={cn(
                    "mt-2 inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em]",
                    active
                      ? "bg-white/15 text-white"
                      : visited
                        ? "bg-slate-100 text-slate-700"
                        : "bg-white text-slate-500"
                  )}
                >
                  {active ? "Today" : visited ? "Visited" : "Open"}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
