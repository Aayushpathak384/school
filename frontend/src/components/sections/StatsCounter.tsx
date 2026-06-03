'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from '@/hooks/useInView'
import { FaUserGraduate, FaChalkboardTeacher, FaTrophy, FaCalendarAlt } from 'react-icons/fa'

interface Stat {
  icon: React.ReactNode
  value: number
  suffix: string
  label: string
  color: string
}

function CounterNumber({ target, suffix, started }: { target: number; suffix: string; started: boolean }) {
  const [count, setCount] = useState(0)
  const animationRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (!started) return
    let start = 0
    const duration = 2000
    const stepTime = Math.max(Math.floor(duration / target), 16)
    const increment = Math.ceil(target / (duration / stepTime))

    const timer = setInterval(() => {
      start += increment
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(start)
      }
    }, stepTime)

    animationRef.current = timer
    return () => clearInterval(timer)
  }, [started, target])

  return (
    <span>
      {count.toLocaleString()}{suffix}
    </span>
  )
}

interface StatsCounterProps {
  students?: number
  teachers?: number
  years?: number
  awards?: number
}

export default function StatsCounter({
  students = 2500,
  teachers = 120,
  years = 25,
  awards = 50,
}: StatsCounterProps) {
  const { ref, isInView } = useInView({ triggerOnce: true })

  const stats: Stat[] = [
    {
      icon: <FaUserGraduate />,
      value: students,
      suffix: '+',
      label: 'Students',
      color: 'from-blue-500 to-blue-700',
    },
    {
      icon: <FaChalkboardTeacher />,
      value: teachers,
      suffix: '+',
      label: 'Expert Faculty',
      color: 'from-purple-500 to-purple-700',
    },
    {
      icon: <FaCalendarAlt />,
      value: years,
      suffix: '+',
      label: 'Years of Excellence',
      color: 'from-amber-500 to-amber-700',
    },
    {
      icon: <FaTrophy />,
      value: awards,
      suffix: '+',
      label: 'Awards & Recognitions',
      color: 'from-emerald-500 to-emerald-700',
    },
  ]

  return (
    <section ref={ref} className="bg-gray-950 py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`text-center group transition-all duration-700 ${
                isInView
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Icon */}
              <div
                className={`w-20 h-20 bg-gradient-to-br ${stat.color} rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl transform group-hover:scale-110 transition-transform duration-300 ring-4 ring-white/10`}
              >
                <span className="text-white text-3xl">{stat.icon}</span>
              </div>

              {/* Number */}
              <div className="text-5xl md:text-6xl font-black text-white mb-3 tracking-tight drop-shadow-md">
                <CounterNumber
                  target={stat.value}
                  suffix={stat.suffix}
                  started={isInView}
                />
              </div>

              {/* Label */}
              <p className="text-gray-300 font-semibold tracking-wide uppercase text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
