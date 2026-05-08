const VISIT_STORAGE_KEY = "learning-tracker-visits-v1";

export function getTodayKey(date = new Date()) {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function getWeekStart(date = new Date()) {
  const clone = new Date(date);
  const day = clone.getDay();
  const diff = (day + 6) % 7;
  clone.setDate(clone.getDate() - diff);
  clone.setHours(0, 0, 0, 0);
  return clone;
}

export function buildWeekDays(date = new Date()) {
  const start = getWeekStart(date);
  return Array.from({ length: 7 }, (_, index) => {
    const current = new Date(start);
    current.setDate(start.getDate() + index);

    return {
      key: getTodayKey(current),
      label: current.toLocaleDateString(undefined, { weekday: "short" }),
      day: current.getDate(),
      isToday: getTodayKey(current) === getTodayKey(date),
    };
  });
}

export function readVisitedDays() {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(VISIT_STORAGE_KEY);
    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter((value): value is string => typeof value === "string");
  } catch {
    return [];
  }
}

export function writeVisitedDays(days: string[]) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(VISIT_STORAGE_KEY, JSON.stringify(days));
}

export function mergeWithToday(days: string[], today = getTodayKey()) {
  return Array.from(new Set([...days, today])).sort();
}
