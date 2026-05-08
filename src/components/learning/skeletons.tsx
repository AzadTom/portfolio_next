export function TrackerListSkeleton() {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-[28px] border border-black/8 bg-white/70 shadow-[0_16px_40px_rgba(15,23,42,0.06)]"
        >
          <div className="h-44 animate-pulse bg-slate-200/80 sm:h-52" />
          <div className="space-y-4 p-5 sm:p-6">
            <div className="h-3 w-24 animate-pulse rounded-full bg-slate-200/80" />
            <div className="h-7 w-3/4 animate-pulse rounded-full bg-slate-200/80" />
            <div className="space-y-2">
              <div className="h-3 w-full animate-pulse rounded-full bg-slate-200/80" />
              <div className="h-3 w-11/12 animate-pulse rounded-full bg-slate-200/80" />
              <div className="h-3 w-2/3 animate-pulse rounded-full bg-slate-200/80" />
            </div>
            <div className="flex gap-2">
              <div className="h-7 w-20 animate-pulse rounded-full bg-slate-200/80" />
              <div className="h-7 w-20 animate-pulse rounded-full bg-slate-200/80" />
            </div>
            <div className="h-12 animate-pulse rounded-2xl bg-slate-200/80" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function ModalSkeleton() {
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <div className="h-4 w-24 animate-pulse rounded-full bg-slate-200/80" />
        <div className="h-8 w-3/5 animate-pulse rounded-full bg-slate-200/80" />
        <div className="h-4 w-4/5 animate-pulse rounded-full bg-slate-200/80" />
      </div>

      <div className="overflow-hidden rounded-[28px] border border-black/8 bg-white/70 p-4 shadow-[0_16px_50px_rgba(15,23,42,0.06)]">
        <div className="h-72 animate-pulse rounded-[22px] bg-slate-200/80" />
        <div className="mt-4 flex gap-2">
          <div className="h-8 w-20 animate-pulse rounded-full bg-slate-200/80" />
          <div className="h-8 w-24 animate-pulse rounded-full bg-slate-200/80" />
          <div className="h-8 w-20 animate-pulse rounded-full bg-slate-200/80" />
        </div>
      </div>
    </div>
  );
}

