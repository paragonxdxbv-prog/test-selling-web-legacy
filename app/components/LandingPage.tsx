"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { motion, useScroll, useSpring, useTransform } from "framer-motion"
import Section from "./Section"
import Layout from "./Layout"
import { sections } from "./constants/sections"

export default function LandingPage() {
  const [activeSection, setActiveSection] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ container: containerRef })
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"])

  const handleScroll = useCallback(() => {
    if (containerRef.current) {
      const scrollPosition = containerRef.current.scrollTop
      const windowHeight = window.innerHeight
      const sectionProgress = scrollPosition / windowHeight
      const newActiveSection = Math.round(sectionProgress)
      setActiveSection(Math.min(Math.max(newActiveSection, 0), sections.length - 1))
    }
  }, [])

  useEffect(() => {
    const container = containerRef.current
    if (container) {
      let ticking = false
      const throttledScroll = () => {
        if (!ticking) {
          requestAnimationFrame(() => {
            handleScroll()
            ticking = false
          })
          ticking = true
        }
      }

      container.addEventListener("scroll", throttledScroll, { passive: true })
      return () => container.removeEventListener("scroll", throttledScroll)
    }
  }, [handleScroll])

  const handleNavClick = (index: number) => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: index * window.innerHeight,
        behavior: "smooth",
      })
    }
  }

  return (
    <Layout>
      <nav className="fixed top-0 right-0 h-screen flex flex-col justify-center z-30 p-4">
        {sections.map((section, index) => (
          <motion.button
            key={section.id}
            className={`w-3 h-3 rounded-full my-2 transition-all duration-500 ${
              index === activeSection ? "bg-white scale-150 shadow-lg shadow-white/50" : "bg-gray-600 hover:bg-gray-400"
            }`}
            onClick={() => handleNavClick(index)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            animate={{
              backgroundColor: index === activeSection ? "#ffffff" : "#4b5563",
              scale: index === activeSection ? 1.5 : 1,
            }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        ))}
      </nav>

      <motion.div
        className="fixed top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-white via-gray-200 to-white origin-left z-30 shadow-lg shadow-white/25"
        style={{ scaleX }}
      />

      <motion.div className="fixed inset-0 z-0 pointer-events-none" style={{ y: backgroundY }}>
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-white/3 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-1/4 w-64 h-64 bg-white/2 rounded-full blur-2xl" />
      </motion.div>

      <div ref={containerRef} className="h-full overflow-y-auto scroll-smooth">
        {sections.map((section, index) => (
          <Section
            key={section.id}
            {...section}
            isActive={index === activeSection}
            sectionIndex={index}
            scrollProgress={scrollYProgress}
          />
        ))}
      </div>
    </Layout>
  )
}
