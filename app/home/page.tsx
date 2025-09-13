"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { FirebaseAnalytics } from "@/components/firebase-analytics"
import { Navigation } from "@/components/navigation"
import { logEvent } from "@/lib/firebase-utils"

export default function HomePage() {
  const [isPageLoaded, setIsPageLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPageLoaded(true)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  const handleShopNowClick = () => {
    logEvent('cta_click', {
      cta_name: 'shop_now',
      page: 'home'
    })
    window.location.href = '/products'
  }

  const handleAboutClick = () => {
    logEvent('cta_click', {
      cta_name: 'about_us',
      page: 'home'
    })
    window.location.href = '/about'
  }

  return (
    <div
      className={`min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white font-mono transition-all duration-1000 ${
        isPageLoaded ? "opacity-100" : "opacity-0"
      }`}
    >
      <FirebaseAnalytics />
      {/* Hero Section - Full Screen */}
      <div className="h-screen flex flex-col">
        <Navigation isPageLoaded={isPageLoaded} currentPage="home" />

        {/* Main Hero Content */}
        <div className="flex-1 flex items-center justify-center px-8">
          <div className="max-w-6xl mx-auto text-center">
            <div
              className={`transition-all duration-700 ${
                isPageLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: "500ms" }}
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6 dark:text-white">
                LEGACY
              </h1>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 font-mono tracking-wider mb-12 max-w-2xl mx-auto">
                PREMIUM PRODUCTS EXPERIENCE
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button
                  className="bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 border-0 text-sm font-medium tracking-widest uppercase px-8 py-4 transition-all duration-300 hover:scale-105"
                  onClick={handleShopNowClick}
                >
                  SHOP NOW
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  className="border-black dark:border-white text-black dark:text-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black text-sm font-medium tracking-widest uppercase bg-transparent px-8 py-4 transition-all duration-300 hover:scale-105"
                  onClick={handleAboutClick}
                >
                  ABOUT US
                </Button>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Footer */}
      <footer
        className={`border-t border-gray-200 dark:border-gray-800 px-8 py-16 bg-gray-50 dark:bg-gray-800 transition-all duration-700 ${
          isPageLoaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
        style={{ transitionDelay: "1000ms" }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <img src="/acme-logo.png" alt="LEGACY" className="h-8 w-auto opacity-40 dark:hidden" />
            <img src="/legacy.png" alt="LEGACY" className="h-8 w-auto opacity-40 hidden dark:block" />
          </div>
          <p className="text-gray-400 dark:text-gray-500 text-xs font-mono tracking-widest uppercase">
            © 2025 LEGACY, INC. ALL RIGHTS RESERVED.
          </p>
        </div>
      </footer>
    </div>
  )
}
