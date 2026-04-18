"use client"

import { useEffect, RefObject } from "react"

type UseHorizontalScrollProps<T extends HTMLElement> = {
  containerRef: RefObject<T | null>
  scrollRef: RefObject<T | null>
}

export const useHorizontalScroll = <T extends HTMLElement>({
  containerRef,
  scrollRef,
}: UseHorizontalScrollProps<T>): void => {
  useEffect(() => {
    const scrollEl = scrollRef.current
    if (!scrollEl) return

    const handleWheel = (e: WheelEvent) => {
      // If the user uses a trackpad sideways, let it naturally horizontal scroll
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return

      const maxScroll = scrollEl.scrollWidth - scrollEl.clientWidth
      
      // Allow native page scrolling if trying to scroll strictly beyond the boundaries
      if (scrollEl.scrollLeft <= 0 && e.deltaY < 0) return
      if (Math.ceil(scrollEl.scrollLeft) >= maxScroll && e.deltaY > 0) return

      // Otherwise intercept vertical scroll and shift horizontally
      e.preventDefault()
      scrollEl.scrollLeft += e.deltaY * 1.5 // Multiplier for smoother fast scrolling
    }

    // Must be passive: false to allow e.preventDefault()
    scrollEl.addEventListener("wheel", handleWheel, { passive: false })

    return () => {
      scrollEl.removeEventListener("wheel", handleWheel)
    }
  }, [scrollRef])
}