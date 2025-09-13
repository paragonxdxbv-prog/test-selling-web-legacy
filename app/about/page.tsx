"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Upload, ShoppingBag, Heart, Search, Users, Award, Globe, Target } from "lucide-react"
import { FirebaseAnalytics } from "@/components/firebase-analytics"

export default function AboutPage() {
  const [isPageLoaded, setIsPageLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPageLoaded(true)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  const stats = [
    { number: "10M+", label: "CUSTOMERS WORLDWIDE" },
    { number: "50+", label: "COUNTRIES SERVED" },
    { number: "15+", label: "YEARS EXPERIENCE" },
    { number: "99%", label: "CUSTOMER SATISFACTION" },
  ]

  const values = [
    {
      icon: <Target className="w-8 h-8" />,
      title: "INNOVATION",
      description: "We push the boundaries of fashion technology with AI-powered experiences and cutting-edge design."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "COMMUNITY",
      description: "Building a global community of fashion enthusiasts who share our passion for style and innovation."
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "QUALITY",
      description: "Every product is crafted with the highest standards of quality, durability, and attention to detail."
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "SUSTAINABILITY",
      description: "Committed to sustainable fashion practices and reducing our environmental impact."
    },
  ]

  return (
    <div
      className={`min-h-screen bg-white text-black font-mono transition-all duration-1000 ${
        isPageLoaded ? "opacity-100" : "opacity-0"
      }`}
    >
      <FirebaseAnalytics />
      {/* Header */}
      <header
        className={`px-8 py-6 border-b border-gray-200 transition-all duration-700 ${
          isPageLoaded ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <a href="/home">
              <img src="/acme-logo.png" alt="LEGACY" className="h-10 w-auto" />
            </a>
          </div>

          <nav className="hidden md:flex items-center space-x-12">
            <a
              href="/home"
              className={`text-black hover:text-gray-500 text-xs font-medium tracking-widest uppercase transition-all duration-500 ${
                isPageLoaded ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              HOME
            </a>
            <a
              href="/products"
              className={`text-black hover:text-gray-500 text-xs font-medium tracking-widest uppercase transition-all duration-500 ${
                isPageLoaded ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
              }`}
              style={{ transitionDelay: "300ms" }}
            >
              PRODUCTS
            </a>
            {["MEN", "WOMEN", "KIDS"].map((item, index) => (
              <a
                key={item}
                href="#"
                className={`text-black hover:text-gray-500 text-xs font-medium tracking-widest uppercase transition-all duration-500 ${
                  isPageLoaded ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
                }`}
                style={{ transitionDelay: `${400 + index * 100}ms` }}
              >
                {item}
              </a>
            ))}
            <Button
              variant="outline"
              size="sm"
              className={`border-black text-black hover:bg-black hover:text-white text-xs font-medium tracking-widest uppercase bg-transparent px-6 transition-all duration-500 ${
                isPageLoaded ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
              }`}
              style={{ transitionDelay: "600ms" }}
            >
              AI TRY-ON
            </Button>
          </nav>

          <div
            className={`flex items-center space-x-6 transition-all duration-700 ${
              isPageLoaded ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"
            }`}
            style={{ transitionDelay: "400ms" }}
          >
            <div className="hidden md:flex items-center bg-gray-50 rounded-none px-4 py-2 border border-gray-200">
              <Search className="w-4 h-4 text-gray-400 mr-3" />
              <input
                type="text"
                placeholder="SEARCH"
                className="bg-transparent text-xs outline-none placeholder-gray-400 w-24 font-mono tracking-wider"
              />
            </div>
            <Heart className="w-4 h-4 text-black cursor-pointer hover:text-gray-500 transition-colors" />
            <ShoppingBag className="w-4 h-4 text-black cursor-pointer hover:text-gray-500 transition-colors" />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-8 py-16">
        <div className="max-w-6xl mx-auto">
          <div
            className={`text-center mb-16 transition-all duration-700 ${
              isPageLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
            style={{ transitionDelay: "300ms" }}
          >
            <h1 className="text-5xl md:text-7xl font-medium tracking-widest uppercase mb-8">
              ABOUT LEGACY
            </h1>
            <p className="text-lg md:text-xl text-gray-600 font-mono tracking-wider max-w-3xl mx-auto">
              WE ARE PIONEERS IN THE FUSION OF FASHION AND TECHNOLOGY, CREATING UNPRECEDENTED SHOPPING EXPERIENCES THAT BRIDGE THE GAP BETWEEN DIGITAL AND PHYSICAL REALITY.
            </p>
          </div>

          {/* Stats Section */}
          <div
            className={`grid grid-cols-2 md:grid-cols-4 gap-8 mb-20 transition-all duration-700 ${
              isPageLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
            style={{ transitionDelay: "500ms" }}
          >
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="text-center"
                style={{ transitionDelay: `${600 + index * 100}ms` }}
              >
                <div className="text-3xl md:text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-xs text-gray-500 uppercase tracking-widest font-mono">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Story Section */}
          <div
            className={`grid md:grid-cols-2 gap-16 items-center mb-20 transition-all duration-700 ${
              isPageLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
            style={{ transitionDelay: "700ms" }}
          >
            <div>
              <h2 className="text-2xl font-medium tracking-widest uppercase mb-6">OUR STORY</h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Founded in 2010, LEGACY emerged from a simple yet revolutionary idea: what if technology could make fashion more personal, more accessible, and more exciting than ever before?
                </p>
                <p>
                  We started as a small team of fashion enthusiasts and tech innovators, united by a shared vision of transforming how people discover, try on, and experience clothing in the digital age.
                </p>
                <p>
                  Today, we're proud to be at the forefront of AI-powered fashion technology, serving millions of customers worldwide with our innovative try-on experiences and premium product offerings.
                </p>
              </div>
            </div>
            <div className="bg-gray-100 h-80 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <div className="text-6xl mb-4">📸</div>
                <p className="text-sm font-mono tracking-widest uppercase">OUR FOUNDING TEAM</p>
              </div>
            </div>
          </div>

          {/* Values Section */}
          <div
            className={`mb-20 transition-all duration-700 ${
              isPageLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
            style={{ transitionDelay: "900ms" }}
          >
            <h2 className="text-2xl font-medium tracking-widest uppercase mb-12 text-center">OUR VALUES</h2>
            <div className="grid md:grid-cols-2 gap-12">
              {values.map((value, index) => (
                <div
                  key={value.title}
                  className="text-center"
                  style={{ transitionDelay: `${1000 + index * 100}ms` }}
                >
                  <div className="flex justify-center mb-4 text-black">
                    {value.icon}
                  </div>
                  <h3 className="text-lg font-medium tracking-widest uppercase mb-4">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Mission Section */}
          <div
            className={`bg-gray-50 p-12 text-center transition-all duration-700 ${
              isPageLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
            style={{ transitionDelay: "1100ms" }}
          >
            <h2 className="text-2xl font-medium tracking-widest uppercase mb-6">OUR MISSION</h2>
            <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
              TO DEMOCRATIZE FASHION BY MAKING IT MORE ACCESSIBLE, PERSONAL, AND SUSTAINABLE THROUGH INNOVATIVE TECHNOLOGY, WHILE MAINTAINING THE HIGHEST STANDARDS OF QUALITY AND CUSTOMER EXPERIENCE.
            </p>
          </div>
        </div>
      </section>

      {/* Upload Area */}
      <div
        className={`fixed bottom-8 right-8 z-40 transition-all duration-700 ${
          isPageLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
        style={{ transitionDelay: "1200ms" }}
      >
        <div className="border-2 border-dashed border-gray-300 bg-gray-50 p-8 text-center w-64 hover:shadow-md hover:scale-102">
          <Upload className="w-6 h-6 mx-auto mb-3 text-gray-400 animate-bounce" />
          <h3 className="text-sm font-medium mb-2 tracking-wide animate-pulse">DROP YOUR PHOTO</h3>
          <p className="text-xs text-gray-400 font-mono tracking-wider mt-2 animate-fade-in">
            To see how the products would look on you
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer
        className={`border-t border-gray-200 px-8 py-16 bg-gray-50 transition-all duration-700 ${
          isPageLoaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
        style={{ transitionDelay: "1300ms" }}
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
