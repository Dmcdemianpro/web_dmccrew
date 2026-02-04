'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion'
import { Eye, Briefcase, Users, Award } from 'lucide-react'

interface StatItemProps {
  icon: React.ReactNode
  value: number
  label: string
  suffix?: string
  delay?: number
}

function AnimatedCounter({ value, delay = 0 }: { value: number; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, {
    damping: 50,
    stiffness: 100
  })
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  useEffect(() => {
    if (isInView) {
      const timeout = setTimeout(() => {
        motionValue.set(value)
      }, delay * 1000)
      return () => clearTimeout(timeout)
    }
  }, [isInView, value, motionValue, delay])

  useEffect(() => {
    const unsubscribe = springValue.on('change', (latest) => {
      if (ref.current) {
        ref.current.textContent = Math.round(latest).toLocaleString('es-CL')
      }
    })
    return unsubscribe
  }, [springValue])

  return <span ref={ref}>0</span>
}

function StatItem({ icon, value, label, suffix = '', delay = 0 }: StatItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ scale: 1.05, y: -5 }}
      className="relative group"
    >
      <div className="relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8 text-center overflow-hidden transition-all duration-400 hover:border-[#ff0040]/50 hover:shadow-[0_0_30px_rgba(255,0,64,0.2)]">
        {/* Glow effect on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#ff0040]/0 to-[#ff6600]/0 group-hover:from-[#ff0040]/10 group-hover:to-[#ff6600]/5 transition-all duration-500" />

        {/* Icon */}
        <div className="relative z-10 inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-xl bg-gradient-to-br from-[#ff0040]/20 to-[#ff6600]/10 mb-4 group-hover:scale-110 transition-transform duration-300">
          <div className="text-[#ff0040] group-hover:text-[#ff6600] transition-colors duration-300">
            {icon}
          </div>
        </div>

        {/* Number */}
        <div className="relative z-10 text-4xl md:text-5xl font-bold text-white mb-2 font-mono tracking-tight">
          <AnimatedCounter value={value} delay={delay} />
          <span className="text-[#ff0040]">{suffix}</span>
        </div>

        {/* Label */}
        <div className="relative z-10 text-gray-400 text-sm md:text-base uppercase tracking-wider">
          {label}
        </div>

        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#ff0040] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    </motion.div>
  )
}

export function Stats() {
  const [visits, setVisits] = useState(0)

  useEffect(() => {
    // Registrar visita e obtener contador
    const trackVisit = async () => {
      try {
        const response = await fetch('/api/visits', { method: 'POST' })
        const data = await response.json()
        setVisits(data.count || 0)
      } catch (error) {
        console.error('Error tracking visit:', error)
        // Intentar solo obtener el contador si falla el POST
        try {
          const response = await fetch('/api/visits')
          const data = await response.json()
          setVisits(data.count || 0)
        } catch {
          setVisits(0)
        }
      }
    }
    trackVisit()
  }, [])

  const stats = [
    { icon: <Eye className="w-7 h-7 md:w-8 md:h-8" />, value: visits, label: 'Visitas', suffix: '' },
    { icon: <Briefcase className="w-7 h-7 md:w-8 md:h-8" />, value: 500, label: 'Trabajos Realizados', suffix: '+' },
    { icon: <Users className="w-7 h-7 md:w-8 md:h-8" />, value: 200, label: 'Clientes Felices', suffix: '+' },
    { icon: <Award className="w-7 h-7 md:w-8 md:h-8" />, value: 5, label: 'Anos de Experiencia', suffix: '' },
  ]

  return (
    <section className="theme-textil py-20 md:py-28 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a0a] to-black" />

      {/* Decorative elements */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="absolute inset-0 pointer-events-none"
      >
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,0,64,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,0,64,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />

        {/* Floating orbs with parallax */}
        <motion.div
          animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-20 left-[10%] w-64 h-64 bg-[#ff0040]/10 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{ y: [0, 20, 0], x: [0, -10, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-20 right-[10%] w-80 h-80 bg-[#ff6600]/10 rounded-full blur-[120px]"
        />
      </motion.div>

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 bg-[#ff0040]/10 border border-[#ff0040]/30 rounded-full text-[#ff0040] text-sm font-medium mb-4 uppercase tracking-wider"
          >
            Nuestros Numeros
          </motion.span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-white">Impulsando </span>
            <span className="text-gradient-neon">Tu Estilo</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Cada numero representa historias de clientes satisfechos y proyectos exitosos
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, index) => (
            <StatItem
              key={stat.label}
              icon={stat.icon}
              value={stat.value}
              label={stat.label}
              suffix={stat.suffix}
              delay={index * 0.15}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Stats
