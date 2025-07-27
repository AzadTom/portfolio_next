'use client';
import { AnimatePresence, motion, MotionProps } from 'motion/react'
import React, { ReactNode } from 'react'

const SplitText = ({ text }: { text: string }) => {
  return (
    <>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Text
            initial={{ y: '100%' }}
            animate="visible"
            variants={{
              visible: (i: number) => ({
                y: 0,
                transition: {
                  delay: i * 0.1
                }
              })
            }}
          >
            {text}
          </Text>
        </motion.div>
      </AnimatePresence>
    </>
  )
}

export default SplitText






function Text({
  children,
  ...rest
}: { children: ReactNode } & MotionProps) {
  const words = typeof children === 'string' ? children.split(' ') : [];
  return words.map((word, i) => {
    return (
      <div
        key={word + i}
        style={{ display: 'inline-block', overflow: 'hidden' }}
      >
        <motion.div
          {...rest}
          style={{ display: 'inline-block', willChange: 'transform' }}
          custom={i}
        >
          {word + (i !== words.length - 1 ? '\u00A0' : '')}
        </motion.div>
      </div>
    )
  })
}
