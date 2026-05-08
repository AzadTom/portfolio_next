"use client";

import Link from "next/link";
import { ArrowLeft, RefreshCcw, Sparkles } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { CalendarCard } from "./calendar-card";
import { TrackerCard } from "./tracker-card";
import { TrackerDetailDialog } from "./tracker-detail-dialog";
import { TrackerListSkeleton } from "./skeletons";
import {
  getTrackerVideos,
  getTrackers,
  updateTrackerVideoStatus,
} from "@/lib/learning/api";
import type {
  TrackerSummary,
  TrackerVideo,
  VideoStatus,
} from "@/lib/learning/types";
import {
  getTodayKey,
  mergeWithToday,
  readVisitedDays,
  writeVisitedDays,
} from "@/lib/learning/storage";

type VideoState = {
  status: "idle" | "loading" | "ready" | "error";
  items: TrackerVideo[];
  error: string | null;
  notice: string | null;
  pendingVideoIds: number[];
};

const DEFAULT_VIDEO_STATE: VideoState = {
  status: "idle",
  items: [],
  error: null,
  notice: null,
  pendingVideoIds: [],
};

const sessionVideoCache = new Map<number, TrackerVideo[]>();

export function LearningDashboard() {
  const [trackers, setTrackers] = useState<TrackerSummary[]>([]);
  const [trackersStatus, setTrackersStatus] = useState<
    "loading" | "ready" | "error"
  >("loading");
  const [trackersError, setTrackersError] = useState<string | null>(null);
  const [visitDays, setVisitDays] = useState<string[]>([]);
  const [selectedTrackerId, setSelectedTrackerId] = useState<number | null>(
    null,
  );
  const [videoStates, setVideoStates] = useState<Record<number, VideoState>>(
    {},
  );

  useEffect(() => {
    const persisted = readVisitedDays();
    const merged = mergeWithToday(persisted, getTodayKey());
    setVisitDays(merged);
    writeVisitedDays(merged);
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function loadTrackers() {
      setTrackersStatus("loading");
      setTrackersError(null);

      try {
        const data = await getTrackers();
        if (cancelled) {
          return;
        }

        setTrackers(data);
        setTrackersStatus("ready");
      } catch (error) {
        if (cancelled) {
          return;
        }

        setTrackersError(
          formatError(
            error,
            "We could not load the learning trackers right now.",
          ),
        );
        setTrackersStatus("error");
      }
    }

    void loadTrackers();

    return () => {
      cancelled = true;
    };
  }, []);

  const selectedTracker = useMemo(
    () => trackers.find((tracker) => tracker.id === selectedTrackerId) ?? null,
    [selectedTrackerId, trackers],
  );

  const activeVideoState = selectedTrackerId
    ? videoStates[selectedTrackerId]
    : undefined;

  function openTracker(tracker: TrackerSummary) {
    setSelectedTrackerId(tracker.id);
    void ensureTrackerVideos(tracker.id);
  }

  async function ensureTrackerVideos(trackerId: number, force = false) {
    const cached = sessionVideoCache.get(trackerId);

    if (!force && cached) {
      setVideoStates((current) => ({
        ...current,
        [trackerId]: {
          status: "ready",
          items: cached,
          error: null,
          notice: null,
          pendingVideoIds: current[trackerId]?.pendingVideoIds ?? [],
        },
      }));
      return cached;
    }

    setVideoStates((current) => ({
      ...current,
      [trackerId]: {
        ...(current[trackerId] ?? DEFAULT_VIDEO_STATE),
        status: "loading",
        error: null,
        notice: null,
      },
    }));

    try {
      const items = await getTrackerVideos(trackerId);
      sessionVideoCache.set(trackerId, items);
      setVideoStates((current) => ({
        ...current,
        [trackerId]: {
          status: "ready",
          items,
          error: null,
          notice: null,
          pendingVideoIds: current[trackerId]?.pendingVideoIds ?? [],
        },
      }));
      return items;
    } catch (error) {
      setVideoStates((current) => ({
        ...current,
        [trackerId]: {
          ...(current[trackerId] ?? DEFAULT_VIDEO_STATE),
          status: "error",
          error: formatError(
            error,
            "We could not load the lessons for this tracker.",
          ),
        },
      }));
      return [];
    }
  }

  async function handleStatusUpdate(videoId: number, nextStatus: VideoStatus) {
    if (!selectedTrackerId) {
      return;
    }

    const trackerId = selectedTrackerId;
    const currentState = videoStates[trackerId];
    const previousItems = currentState?.items ?? [];
    const nextItems = previousItems.map((lesson) =>
      lesson.id === videoId ? { ...lesson, status: nextStatus } : lesson,
    );

    setVideoStates((current) => {
      const state = current[trackerId] ?? DEFAULT_VIDEO_STATE;

      return {
        ...current,
        [trackerId]: {
          ...state,
          items: nextItems,
          status: "ready",
          error: null,
          notice: null,
          pendingVideoIds: Array.from(
            new Set([...(state.pendingVideoIds ?? []), videoId]),
          ),
        },
      };
    });

    sessionVideoCache.set(trackerId, nextItems);

    try {
      await updateTrackerVideoStatus(videoId, nextStatus);
      setVideoStates((current) => {
        const state = current[trackerId] ?? DEFAULT_VIDEO_STATE;
        return {
          ...current,
          [trackerId]: {
            ...state,
            notice: "Lesson status saved successfully.",
            pendingVideoIds: state.pendingVideoIds.filter(
              (id) => id !== videoId,
            ),
          },
        };
      });
    } catch (error) {
      sessionVideoCache.set(trackerId, previousItems);
      setVideoStates((current) => {
        const state = current[trackerId] ?? DEFAULT_VIDEO_STATE;
        return {
          ...current,
          [trackerId]: {
            ...state,
            items: previousItems,
            error: formatError(
              error,
              "We could not save that status change, so the previous state was restored.",
            ),
            notice: null,
            pendingVideoIds: state.pendingVideoIds.filter(
              (id) => id !== videoId,
            ),
          },
        };
      });
    }
  }

  function handleRetryTrackers() {
    void (async () => {
      setTrackersStatus("loading");
      setTrackersError(null);
      try {
        const data = await getTrackers();
        setTrackers(data);
        setTrackersStatus("ready");
      } catch (error) {
        setTrackersError(
          formatError(
            error,
            "We could not reload the learning trackers right now.",
          ),
        );
        setTrackersStatus("error");
      }
    })();
  }

  function handleRetryTrackerLessons() {
    if (!selectedTrackerId) {
      return;
    }

    void ensureTrackerVideos(selectedTrackerId, true);
  }

  function handleCheckInToday() {
    const today = getTodayKey();
    setVisitDays((current) => {
      const next = mergeWithToday(current, today);
      writeVisitedDays(next);
      return next;
    });
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.95),rgba(247,241,231,0.95)_42%,rgba(242,234,220,0.92))] text-slate-950">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-5 sm:px-6 sm:py-8 lg:px-8">
        <CalendarCard
          visitDays={visitDays}
          onCheckInToday={handleCheckInToday}
        />
        <section className="space-y-4">
          {trackersStatus === "loading" ? (
            <TrackerListSkeleton />
          ) : trackersStatus === "error" ? (
            <div className="rounded-[28px] border border-rose-200 bg-rose-50 p-6 text-rose-900">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-lg font-semibold">
                    Could not load trackers
                  </h3>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-rose-800">
                    {trackersError}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleRetryTrackers}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-rose-300 bg-white px-4 py-2.5 text-sm font-medium text-rose-900 transition hover:bg-rose-100"
                >
                  <RefreshCcw className="size-4" />
                  Retry
                </button>
              </div>
            </div>
          ) : trackers.length === 0 ? (
            <EmptyTrackersState />
          ) : (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {trackers.map((tracker, index) => {
                const state = videoStates[tracker.id];
                const lessons = state?.items ?? [];
                const doneCount = lessons.filter(
                  (lesson) => lesson.status === "done",
                ).length;

                return (
                  <TrackerCard
                    key={tracker.id}
                    tracker={tracker}
                    index={index}
                    lessonCount={lessons.length || undefined}
                    doneCount={doneCount}
                    onOpen={openTracker}
                  />
                );
              })}
            </div>
          )}
        </section>
      </div>

      <TrackerDetailDialog
        open={selectedTracker !== null}
        tracker={selectedTracker}
        videos={activeVideoState?.items ?? []}
        status={
          activeVideoState?.status ?? (selectedTracker ? "loading" : "idle")
        }
        error={activeVideoState?.error ?? null}
        notice={activeVideoState?.notice ?? null}
        pendingVideoIds={activeVideoState?.pendingVideoIds ?? []}
        onClose={() => setSelectedTrackerId(null)}
        onRetry={handleRetryTrackerLessons}
        onUpdateStatus={handleStatusUpdate}
      />
    </main>
  );
}

function EmptyTrackersState() {
  return (
    <div className="rounded-[28px] border border-dashed border-slate-300 bg-white/80 p-8 text-center">
      <h3 className="text-lg font-semibold text-slate-950">
        No trackers found
      </h3>
      <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-slate-600">
        The backend returned an empty tracker list. When playlists are added,
        they will appear here automatically.
      </p>
    </div>
  );
}

function formatError(error: unknown, fallback: string) {
  if (error instanceof Error && error.message.trim()) {
    return error.message;
  }

  if (typeof error === "string" && error.trim()) {
    return error;
  }

  return fallback;
}
