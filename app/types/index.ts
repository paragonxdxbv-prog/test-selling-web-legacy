"use client"

import type { ReactNode } from "react"
import type { MotionValue } from "framer-motion"

export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  category: string
  image: string
  features: string[]
}

export interface PricingTier {
  id: string
  name: string
  price: number
  period: string
  description: string
  features: string[]
  popular?: boolean
  buttonText: string
}

export interface Section {
  id: string
  title: string
  subtitle?: ReactNode
  content?: string
  showButton?: boolean
  buttonText?: string
  products?: Product[]
  pricingTiers?: PricingTier[]
  showLogo?: boolean
}

export interface SectionProps extends Section {
  isActive: boolean
  sectionIndex?: number
  scrollProgress?: MotionValue<number>
}
