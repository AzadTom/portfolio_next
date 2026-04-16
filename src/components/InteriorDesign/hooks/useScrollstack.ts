// useScrollStack.ts
"use client"

import { useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

export const useScrollStack = () => {
  const ref = useRef(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  })

  return { ref, scrollYProgress }
}