'use client'

import { motion, useScroll, useSpring } from 'framer-motion'

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 z-50 origin-left"
      style={{
        scaleX,
        background: 'linear-gradient(90deg, #ff0040 0%, #ff6600 50%, #ff0040 100%)',
        boxShadow: '0 0 10px #ff0040, 0 0 20px #ff004066, 0 0 30px #ff004033'
      }}
    />
  )
}

export default ScrollProgress
