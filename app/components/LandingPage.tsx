"use client"

import { useEffect } from "react"
import { motion } from "framer-motion"
import Layout from "./Layout"

export default function LandingPage() {
  useEffect(() => {
    // no scrolling landing page
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = ""
    }
  }, [])

  return (
    <Layout>
      <div className="h-[calc(100vh-3.5rem)] w-full flex flex-col items-center justify-center text-center px-6 relative">
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"
            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-1/3 left-1/4 w-64 h-64 bg-white/3 rounded-full blur-2xl"
            animate={{ scale: [1, 1.05, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 2 }}
          />
        </div>
        <motion.img
          src="/images/legacy-logo.png"
          alt="Logo"
          className="w-28 h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 object-contain drop-shadow-2xl mb-6"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        />
        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-300 bg-clip-text text-transparent leading-[1.1] tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Premium Digital Products
        </motion.h1>
        <motion.p
          className="max-w-2xl mt-6 text-xl md:text-2xl lg:text-3xl text-neutral-300 font-medium"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1 }}
        >
          Discover and purchase high-quality templates, components, and resources.
        </motion.p>
      </div>
    </Layout>
  )
}
