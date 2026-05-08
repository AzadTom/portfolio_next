export type VideoStatus = "idle" | "inprogress" | "done";

export type TrackerSummary = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
};

export type TrackerVideo = {
  id: number;
  playlistid: number;
  youtubeIframeUrl: string;
  status: VideoStatus;
};

export type ApiListResponse<T> = {
  data: T;
};

