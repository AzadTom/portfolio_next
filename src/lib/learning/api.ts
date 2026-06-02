import type { ApiListResponse, TrackerSummary, TrackerVideo, VideoStatus } from "./types";

const DEFAULT_BASE_URL = "https://nestjsserver.vercel.app";

export const LEARNING_API_BASE_URL =
  process.env.NEXT_PUBLIC_LEARNING_API_BASE_URL?.replace(/\/+$/, "") ?? DEFAULT_BASE_URL;

function buildLearningUrl(path: string) {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${LEARNING_API_BASE_URL}${cleanPath}`;
}

async function readJson<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const message = await response.text().catch(() => "");
    throw new Error(message || `Request failed with status ${response.status}`);
  }

  return (await response.json()) as T;
}

export async function getTrackers(): Promise<TrackerSummary[]> {
  const response = await fetch(buildLearningUrl("/tracker"), {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
    cache: "no-store",
  });

  const payload = await readJson<ApiListResponse<TrackerSummary[]>>(response);

  return (payload.data ?? []).map((tracker) => ({
    ...tracker,
    title: tracker.title.trim(),
    description: tracker.description.trim(),
  }));
}

export async function getTrackerVideos(trackerId: number): Promise<TrackerVideo[]> {
  const response = await fetch(buildLearningUrl(`/tracker/${trackerId}`), {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
    cache: "no-store",
  });

  const payload = await readJson<ApiListResponse<TrackerVideo[]>>(response);

  return (payload.data ?? []).slice().sort((left, right) => left.id - right.id);
}

export async function updateTrackerVideoStatus(videoId: number, status: VideoStatus) {
  const response = await fetch(buildLearningUrl(`/tracker/${videoId}/status`), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ status }),
  });

  return readJson<{ message?: string }>(response);
}

export function buildYouTubeEmbedUrl(sourceUrl: string) {
  try {
    const iframeMatch = sourceUrl.match(
      /<iframe[^>]+src=["']([^"']+)["'][^>]*><\/iframe>/i,
    );
    const source = iframeMatch?.[1] ?? sourceUrl;
    const url = new URL(source);

    if (url.hostname.includes("youtu.be")) {
      const videoId = url.pathname.replace("/", "").trim();
      return `https://www.youtube.com/embed/${videoId}`;
    }

    if (url.pathname.includes("/embed/")) {
      return sourceUrl;
    }

    const videoId = url.searchParams.get("v");
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}`;
    }

    return sourceUrl;
  } catch {
    return sourceUrl;
  }
}
