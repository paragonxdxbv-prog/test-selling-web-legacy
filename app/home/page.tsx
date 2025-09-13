"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Upload, ShoppingBag, Heart, Search, ArrowRight } from "lucide-react"
import { FirebaseAnalytics } from "@/components/firebase-analytics"
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
      className={`min-h-screen bg-white text-black font-mono transition-all duration-1000 ${
        isPageLoaded ? "opacity-100" : "opacity-0"
      }`}
    >
      <FirebaseAnalytics />
      {/* Hero Section - Full Screen */}
      <div className="h-screen flex flex-col">
        {/* Header */}
        <header
          className={`px-8 py-6 border-b border-gray-200 bg-gray-50/92 transition-all duration-700 ${
            isPageLoaded ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
          }`}
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <a href="/home" className="flex items-center space-x-3">
              <img src="/acme-logo.png" alt="LEGACY" className="h-10 w-auto" />
              <span className="text-lg font-medium tracking-widest uppercase">LEGACY</span>
            </a>
          </div>

          <nav className="hidden md:flex items-center space-x-12">
            <a
              href="/products"
              className={`text-black hover:text-gray-500 text-xs font-medium tracking-widest uppercase transition-all duration-500 ${
                isPageLoaded ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              PRODUCTS
            </a>
            <a
              href="/about"
              className={`text-black hover:text-gray-500 text-xs font-medium tracking-widest uppercase transition-all duration-500 ${
                isPageLoaded ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
              }`}
              style={{ transitionDelay: "300ms" }}
            >
              ABOUT
            </a>
          </nav>

            <div
              className={`flex items-center space-x-6 transition-all duration-700 ${
                isPageLoaded ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"
              }`}
              style={{ transitionDelay: "400ms" }}
            >
            </div>
          </div>
        </header>

        {/* Main Hero Content */}
        <div className="flex-1 flex items-center justify-center px-8">
          <div className="max-w-6xl mx-auto text-center">
            <div
              className={`transition-all duration-700 ${
                isPageLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: "500ms" }}
            >
              <h1 className="text-6xl md:text-8xl font-medium tracking-widest uppercase mb-8">
                LEGACY
              </h1>
              <p className="text-lg md:text-xl text-gray-600 font-mono tracking-wider mb-12 max-w-2xl mx-auto">
                PREMIUM FASHION EXPERIENCE
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button
                  className="bg-black text-white hover:bg-gray-800 border-0 text-sm font-medium tracking-widest uppercase px-8 py-4 transition-all duration-300 hover:scale-105"
                  onClick={handleShopNowClick}
                >
                  SHOP NOW
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  className="border-black text-black hover:bg-black hover:text-white text-sm font-medium tracking-widest uppercase bg-transparent px-8 py-4 transition-all duration-300 hover:scale-105"
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
        className={`border-t border-gray-200 px-8 py-16 bg-gray-50 transition-all duration-700 ${
          isPageLoaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
        style={{ transitionDelay: "1000ms" }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <img src="/acme-logo.png" alt="LEGACY" className="h-8 w-auto opacity-40" />
          </div>
          <p className="text-gray-400 text-xs font-mono tracking-widest uppercase">
            © 2025 LEGACY, INC. ALL RIGHTS RESERVED.
          </p>
        </div>
      </footer>
    </div>
  )
}
