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
    let ticking = false

    const handleScroll = () => {
      const container = containerRef.current
      const scrollEl = scrollRef.current

      if (!container || !scrollEl) return

      if (ticking) return

      requestAnimationFrame(() => {
        const rect = container.getBoundingClientRect()

        const totalScroll =
          container.offsetHeight - window.innerHeight

        const progress = Math.min(
          Math.max(-rect.top / totalScroll, 0),
          1
        )

        const maxScroll =
          scrollEl.scrollWidth - scrollEl.clientWidth

        scrollEl.scrollLeft = progress * maxScroll

        ticking = false
      })

      ticking = true
    }

    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [containerRef, scrollRef])
}