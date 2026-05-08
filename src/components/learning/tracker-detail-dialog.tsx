"use client";

import { createPortal } from "react-dom";
import {
  AlertCircle,
  ArrowLeft,
  Check,
  Loader2,
  PauseCircle,
  PlayCircle,
  RefreshCcw,
  X,
} from "lucide-react";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";

import { buildYouTubeEmbedUrl } from "@/lib/learning/api";
import type { TrackerSummary, TrackerVideo, VideoStatus } from "@/lib/learning/types";
import { cn } from "@/lib/utils";

type TrackerDetailDialogProps = {
  open: boolean;
  tracker: TrackerSummary | null;
  videos: TrackerVideo[];
  status: "idle" | "loading" | "ready" | "error";
  error: string | null;
  notice: string | null;
  pendingVideoIds: number[];
  onClose: () => void;
  onRetry: () => void;
  onUpdateStatus: (videoId: number, nextStatus: VideoStatus) => void;
};

export function TrackerDetailDialog({
  open,
  tracker,
  videos,
  status,
  error,
  notice,
  pendingVideoIds,
  onClose,
  onRetry,
  onUpdateStatus,
}: TrackerDetailDialogProps) {
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const lastActiveElementRef = useRef<HTMLElement | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) {
      return;
    }

    lastActiveElementRef.current = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusTimer = window.setTimeout(() => closeButtonRef.current?.focus(), 0);

    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = previousOverflow;
      lastActiveElementRef.current?.focus?.();
    };
  }, [open]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose, open]);

  const readyCount = useMemo(
    () => videos.filter((video) => video.status === "done").length,
    [videos]
  );
  const inProgressCount = useMemo(
    () => videos.filter((video) => video.status === "inprogress").length,
    [videos]
  );
  const totalCount = videos.length;

  const dialogNode =
    open && tracker ? (
      <div
        className="fixed inset-0 z-50 flex items-end justify-center p-3 sm:items-center sm:p-6"
        aria-hidden={false}
      >
        <div
          className="absolute inset-0 bg-slate-950/45 backdrop-blur-sm"
          onClick={onClose}
          aria-hidden="true"
        />

        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={`tracker-title-${tracker.id}`}
          aria-describedby={`tracker-description-${tracker.id}`}
          className={cn(
            "relative flex max-h-[92vh] w-full max-w-6xl flex-col overflow-hidden rounded-[32px] border border-white/40 bg-[#fbf7f0] shadow-[0_24px_80px_rgba(15,23,42,0.22)]",
            "sm:max-h-[88vh]"
          )}
          onKeyDown={(event) => handleTrapTab(event, dialogRef, closeButtonRef, onClose)}
        >
          <div className="flex items-start justify-between gap-4 border-b border-slate-950/8 px-5 py-4 sm:px-7 sm:py-5">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-slate-950/10 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-600">
                  Tracker detail
                </span>
                <span className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-amber-900">
                  {totalCount} lessons
                </span>
              </div>
              <div>
                <h2
                  id={`tracker-title-${tracker.id}`}
                  className="text-2xl font-semibold text-slate-950 sm:text-[2rem]"
                >
                  {tracker.title}
                </h2>
                <p
                  id={`tracker-description-${tracker.id}`}
                  className="mt-2 max-w-3xl text-sm leading-6 text-slate-600 sm:text-base"
                >
                  {tracker.description}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                className="inline-flex size-11 items-center justify-center rounded-full border border-slate-950/10 bg-white text-slate-700 transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950/20"
                aria-label="Close tracker dialog"
              >
                <X className="size-4" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-7 sm:py-6">
            <div className="space-y-5">
              <div className="grid gap-3 sm:grid-cols-3">
                <MetricCard label="Completed" value={readyCount} accent="emerald" />
                <MetricCard label="In progress" value={inProgressCount} accent="amber" />
                <MetricCard label="Cached videos" value={status === "ready" ? totalCount : 0} accent="slate" />
              </div>

              {notice ? (
                <div className="flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
                  <Check className="mt-0.5 size-4 shrink-0" />
                  <p>{notice}</p>
                </div>
              ) : null}

              {status === "loading" ? <LessonRailSkeleton /> : null}

              {status === "error" ? (
                <div className="rounded-[26px] border border-rose-200 bg-rose-50 p-5 text-rose-900">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="mt-0.5 size-5 shrink-0" />
                      <div>
                        <h3 className="font-semibold">Could not load tracker lessons</h3>
                        <p className="mt-1 text-sm leading-6 text-rose-800">{error}</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={onRetry}
                      className="inline-flex items-center justify-center gap-2 rounded-2xl border border-rose-300 bg-white px-4 py-2 text-sm font-medium text-rose-900 transition hover:bg-rose-100"
                    >
                      <RefreshCcw className="size-4" />
                      Retry
                    </button>
                  </div>
                </div>
              ) : null}

              {status === "ready" && totalCount === 0 ? (
                <EmptyLessonsState />
              ) : null}

              {status === "ready" && totalCount > 0 ? (
                <LessonRail
                  trackerId={tracker.id}
                  lessons={videos}
                  pendingVideoIds={pendingVideoIds}
                  onUpdateStatus={onUpdateStatus}
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    ) : null;

  if (!mounted || !open) {
    return null;
  }

  return createPortal(dialogNode, document.body);
}

function MetricCard({
  label,
  value,
  accent,
}: {
  label: string;
  value: number;
  accent: "emerald" | "amber" | "slate";
}) {
  const accentClass =
    accent === "emerald"
      ? "border-emerald-200 bg-emerald-50 text-emerald-950"
      : accent === "amber"
        ? "border-amber-200 bg-amber-50 text-amber-950"
        : "border-slate-200 bg-white text-slate-950";

  return (
    <div className={cn("rounded-[22px] border p-4 shadow-sm", accentClass)}>
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{label}</p>
      <p className="mt-2 text-3xl font-semibold">{value}</p>
    </div>
  );
}

function LessonRail({
  trackerId,
  lessons,
  pendingVideoIds,
  onUpdateStatus,
}: {
  trackerId: number;
  lessons: TrackerVideo[];
  pendingVideoIds: number[];
  onUpdateStatus: (videoId: number, nextStatus: VideoStatus) => void;
}) {
  const completedCount = lessons.filter((lesson) => lesson.status === "done").length;
  const progress = lessons.length > 0 ? Math.round((completedCount / lessons.length) * 100) : 0;

  return (
    <section className="space-y-4">
      <div className="flex flex-col gap-3 rounded-[26px] border border-slate-950/8 bg-white/70 p-4 shadow-[0_12px_40px_rgba(15,23,42,0.06)] sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Progress</p>
          <p className="mt-1 text-sm text-slate-700">
            {completedCount} of {lessons.length} lessons completed
          </p>
        </div>
        <div className="w-full max-w-sm">
          <div className="mb-2 flex justify-between text-xs font-medium text-slate-500">
            <span>Overall completion</span>
            <span>{progress}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full rounded-full bg-slate-950 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto pb-2">
        <div className="flex snap-x snap-mandatory gap-4">
          {lessons.map((lesson, index) => {
            const embedUrl = buildYouTubeEmbedUrl(lesson.youtubeIframeUrl);
            const isSaving = pendingVideoIds.includes(lesson.id);

            return (
              <article
                key={lesson.id}
                className="min-w-full snap-start rounded-[28px] border border-slate-950/8 bg-white p-4 shadow-[0_16px_50px_rgba(15,23,42,0.08)] lg:min-w-[calc(100%-6rem)]"
              >
                <div className="flex flex-col gap-4 xl:flex-row">
                  <div className="space-y-3 xl:w-[58%]">
                    <div className="flex items-center justify-between gap-3">
                      <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-600">
                        Lesson {String(index + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={cn(
                          "rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em]",
                          lesson.status === "done"
                            ? "bg-emerald-50 text-emerald-700"
                            : lesson.status === "inprogress"
                              ? "bg-amber-50 text-amber-700"
                              : "bg-slate-100 text-slate-600"
                        )}
                      >
                        {lesson.status}
                      </span>
                    </div>

                    <div className="overflow-hidden rounded-[24px] border border-slate-950/8 bg-slate-100">
                      <div className="aspect-video">
                        <iframe
                          src={embedUrl}
                          title={`Tracker ${trackerId} lesson ${index + 1}`}
                          className="h-full w-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          referrerPolicy="strict-origin-when-cross-origin"
                          allowFullScreen
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col justify-between gap-4 rounded-[24px] border border-slate-950/8 bg-[#faf7f1] p-4">
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                          Status controls
                        </p>
                        <p className="mt-2 text-sm leading-6 text-slate-600">
                          Update the lesson immediately. The change is applied optimistically and synced in the background.
                        </p>
                      </div>

                      <div className="grid gap-2">
                        <StatusActionButton
                          icon={<PauseCircle className="size-4" />}
                          label="Idle"
                          active={lesson.status === "idle"}
                          pending={isSaving}
                          onClick={() => onUpdateStatus(lesson.id, "idle")}
                        />
                        <StatusActionButton
                          icon={<PlayCircle className="size-4" />}
                          label="In progress"
                          active={lesson.status === "inprogress"}
                          pending={isSaving}
                          onClick={() => onUpdateStatus(lesson.id, "inprogress")}
                        />
                        <StatusActionButton
                          icon={<Check className="size-4" />}
                          label="Done"
                          active={lesson.status === "done"}
                          pending={isSaving}
                          onClick={() => onUpdateStatus(lesson.id, "done")}
                        />
                      </div>
                    </div>

                    <div className="rounded-2xl border border-dashed border-slate-200 bg-white px-4 py-3 text-sm text-slate-600">
                      <p className="font-medium text-slate-900">Lesson {String(index + 1).padStart(2, "0")}</p>
                      <p className="mt-1">
                        Watch the embed directly here, then use the status controls to keep your tracker current.
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function StatusActionButton({
  icon,
  label,
  active,
  pending,
  onClick,
}: {
  icon: ReactNode;
  label: string;
  active: boolean;
  pending: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={pending}
      className={cn(
        "inline-flex items-center justify-between gap-3 rounded-2xl border px-4 py-3 text-left text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950/20 disabled:cursor-not-allowed disabled:opacity-60",
        active
          ? "border-slate-950 bg-slate-950 text-white shadow-[0_10px_24px_rgba(15,23,42,0.12)]"
          : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
      )}
    >
      <span className="inline-flex items-center gap-2">
        {icon}
        {label}
      </span>
      {pending ? <Loader2 className="size-4 animate-spin" /> : null}
    </button>
  );
}

function EmptyLessonsState() {
  return (
    <div className="rounded-[28px] border border-dashed border-slate-300 bg-white/80 p-8 text-center text-slate-600">
      <ArrowLeft className="mx-auto size-5 text-slate-400" />
      <h3 className="mt-3 text-lg font-semibold text-slate-950">No lessons yet</h3>
      <p className="mt-2 text-sm leading-6">
        This tracker does not have any videos attached yet. Try another playlist or refresh after new lessons are added.
      </p>
    </div>
  );
}

function LessonRailSkeleton() {
  return (
    <div className="space-y-4">
      <div className="h-20 animate-pulse rounded-[26px] bg-slate-200/80" />
      <div className="overflow-hidden rounded-[28px] border border-slate-950/8 bg-white p-4 shadow-[0_16px_50px_rgba(15,23,42,0.08)]">
        <div className="flex flex-col gap-4 xl:flex-row">
          <div className="space-y-3 xl:w-[58%]">
            <div className="h-6 w-40 animate-pulse rounded-full bg-slate-200/80" />
            <div className="aspect-video animate-pulse rounded-[24px] bg-slate-200/80" />
          </div>
          <div className="flex flex-1 flex-col gap-3 rounded-[24px] border border-slate-950/8 bg-[#faf7f1] p-4">
            <div className="h-4 w-32 animate-pulse rounded-full bg-slate-200/80" />
            <div className="space-y-2">
              <div className="h-11 animate-pulse rounded-2xl bg-slate-200/80" />
              <div className="h-11 animate-pulse rounded-2xl bg-slate-200/80" />
              <div className="h-11 animate-pulse rounded-2xl bg-slate-200/80" />
            </div>
            <div className="h-20 animate-pulse rounded-2xl bg-slate-200/80" />
          </div>
        </div>
      </div>
    </div>
  );
}

function handleTrapTab(
  event: KeyboardEvent<HTMLDivElement>,
  dialogRef: React.RefObject<HTMLDivElement | null>,
  closeButtonRef: React.RefObject<HTMLButtonElement | null>,
  onClose: () => void
) {
  if (event.key === "Escape") {
    event.preventDefault();
    onClose();
    return;
  }

  if (event.key !== "Tab") {
    return;
  }

  const dialog = dialogRef.current;
  if (!dialog) {
    return;
  }

  const focusables = dialog.querySelectorAll<HTMLElement>(
    'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );

  if (!focusables.length) {
    event.preventDefault();
    closeButtonRef.current?.focus();
    return;
  }

  const first = focusables[0];
  const last = focusables[focusables.length - 1];
  const activeElement = document.activeElement as HTMLElement | null;

  if (event.shiftKey) {
    if (activeElement === first || !dialog.contains(activeElement)) {
      event.preventDefault();
      last.focus();
    }
    return;
  }

  if (activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}
