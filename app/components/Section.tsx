"use client"

import { motion, useInView, useTransform } from "framer-motion"
import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Mail, MessageCircle, Globe, Twitter, Github, Linkedin } from "lucide-react"
import type { SectionProps } from "../types"

export default function Section({
  id,
  title,
  subtitle,
  content,
  isActive,
  showButton,
  buttonText,
  products,
  pricingTiers,
  showLogo,
  sectionIndex = 0,
  scrollProgress,
}: SectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, margin: "-10%" })

  const titleY = useTransform(scrollProgress, [sectionIndex / 4, (sectionIndex + 1) / 4], [0, -20])
  const contentY = useTransform(scrollProgress, [sectionIndex / 4, (sectionIndex + 1) / 4], [0, -10])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1.2,
        ease: [0.25, 0.1, 0.25, 1],
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.98,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 1,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  }

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      rotateX: 5,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  }

  return (
    <motion.section
      ref={ref}
      id={id}
      className="relative h-screen w-full snap-start flex flex-col justify-center items-center p-8 md:p-16 lg:p-24 overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {id === "hero" && (
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 6,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-1/3 left-1/4 w-64 h-64 bg-white/3 rounded-full blur-2xl"
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: 2,
            }}
          />
        </div>
      )}

      {subtitle && (
        <motion.div className="mb-12 relative z-10" variants={itemVariants}>
          {subtitle}
        </motion.div>
      )}

      {id === "hero" && showLogo && (
        <motion.div
          className="mb-8 relative z-10 flex justify-center"
          variants={itemVariants}
          whileHover={{
            scale: 1.02,
            rotate: [0, -1, 1, 0],
            transition: { duration: 0.5 },
          }}
        >
          <img
            src="/images/legacy-logo.png"
            alt="Logo"
            className="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 object-contain filter brightness-0 invert drop-shadow-2xl"
          />
        </motion.div>
      )}

      <motion.h2
        className={`font-bold leading-[1.1] tracking-tight max-w-4xl relative z-10 text-center ${
          id === "hero"
            ? "text-5xl md:text-7xl lg:text-[7rem] xl:text-[8rem] bg-gradient-to-r from-white via-gray-200 to-gray-300 bg-clip-text text-transparent"
            : "text-4xl md:text-6xl lg:text-[5rem] xl:text-[6rem]"
        }`}
        variants={itemVariants}
        style={{ y: titleY }}
      >
        {title}
      </motion.h2>

      {content && (
        <motion.p
          className={`max-w-2xl mt-6 relative z-10 text-center ${
            id === "hero"
              ? "text-xl md:text-2xl lg:text-3xl text-neutral-300 font-medium"
              : "text-lg md:text-xl lg:text-2xl text-neutral-400"
          }`}
          variants={itemVariants}
          style={{ y: contentY }}
        >
          {content}
        </motion.p>
      )}

      {id === "contact" && (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12 relative z-10 max-w-4xl mx-auto"
          variants={containerVariants}
        >
          <motion.div className="space-y-8" variants={itemVariants}>
            <div>
              <h3 className="text-2xl font-semibold text-white mb-4">Contact Information</h3>
              <div className="space-y-4">
                <motion.div className="flex items-center gap-3" whileHover={{ x: 5, transition: { duration: 0.2 } }}>
                  <Mail className="h-5 w-5 text-white" />
                  <span className="text-neutral-300">support@legacy.com</span>
                </motion.div>
                <motion.div className="flex items-center gap-3" whileHover={{ x: 5, transition: { duration: 0.2 } }}>
                  <MessageCircle className="h-5 w-5 text-white" />
                  <span className="text-neutral-300">Live Chat Available 24/7</span>
                </motion.div>
                <motion.div className="flex items-center gap-3" whileHover={{ x: 5, transition: { duration: 0.2 } }}>
                  <Globe className="h-5 w-5 text-white" />
                  <span className="text-neutral-300">www.legacy.com</span>
                </motion.div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-white mb-4">Follow Us</h3>
              <div className="flex gap-4">
                {[Twitter, Github, Linkedin].map((Icon, index) => (
                  <motion.div key={index} whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant="outline"
                      size="icon"
                      className="border-neutral-700 hover:border-white bg-transparent"
                    >
                      <Icon className="h-4 w-4" />
                    </Button>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div className="space-y-6" variants={itemVariants}>
            <div>
              <h3 className="text-2xl font-semibold text-white mb-4">Quick Links</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <a href="#" className="block text-neutral-300 hover:text-white transition-colors">
                    Products
                  </a>
                  <a href="#" className="block text-neutral-300 hover:text-white transition-colors">
                    Pricing
                  </a>
                  <a href="#" className="block text-neutral-300 hover:text-white transition-colors">
                    Support
                  </a>
                </div>
                <div className="space-y-2">
                  <a href="#" className="block text-neutral-300 hover:text-white transition-colors">
                    About
                  </a>
                  <a href="#" className="block text-neutral-300 hover:text-white transition-colors">
                    Terms
                  </a>
                  <a href="#" className="block text-neutral-300 hover:text-white transition-colors">
                    Privacy
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-neutral-800">
              <p className="text-sm text-neutral-500">
                © 2024 LEGACY. All rights reserved. Premium digital products for creators and innovators.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}

      {pricingTiers && (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 relative z-10 max-w-6xl mx-auto"
          variants={containerVariants}
        >
          {pricingTiers.map((tier, index) => (
            <motion.div
              key={tier.id}
              variants={cardVariants}
              className="relative"
              whileHover={{
                scale: 1.02,
                rotateY: 5,
                z: 50,
                transition: { duration: 0.3 },
              }}
              style={{ transformStyle: "preserve-3d" }}
            >
              {tier.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-white text-black z-10">
                  Most Popular
                </Badge>
              )}
              <Card
                className={`h-full ${
                  tier.popular
                    ? "bg-gradient-to-b from-white/10 to-neutral-900/50 border-white/50 scale-105"
                    : "bg-neutral-900/50 border-neutral-800"
                } hover:border-white/50 transition-all duration-300 hover:shadow-2xl hover:shadow-white/10`}
              >
                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-2xl text-white">{tier.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-white">${tier.price}</span>
                    <span className="text-neutral-400 ml-2">{tier.period}</span>
                  </div>
                  <CardDescription className="text-neutral-400 mt-2">{tier.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {tier.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-white flex-shrink-0" />
                      <span className="text-neutral-300">{feature}</span>
                    </div>
                  ))}
                </CardContent>
                <CardFooter className="pt-6">
                  <Button
                    className={`w-full font-semibold ${
                      tier.popular ? "bg-white hover:bg-gray-200 text-black" : "bg-white hover:bg-gray-100 text-black"
                    }`}
                  >
                    {tier.buttonText}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      )}

      {products && (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 relative z-10 max-w-6xl mx-auto"
          variants={containerVariants}
        >
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              variants={cardVariants}
              whileHover={{
                scale: 1.03,
                y: -10,
                transition: { duration: 0.3, ease: "easeOut" },
              }}
            >
              <Card className="bg-neutral-900/50 border-neutral-800 hover:border-white/50 transition-all duration-300 group hover:shadow-2xl hover:shadow-white/10">
                <CardHeader className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-3 right-3 bg-white text-black">{product.category}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <CardTitle className="text-white text-xl mb-2">{product.name}</CardTitle>
                  <CardDescription className="text-neutral-400 mb-4">{product.description}</CardDescription>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {product.features.slice(0, 2).map((feature) => (
                      <Badge key={feature} variant="outline" className="text-xs border-neutral-700 text-neutral-300">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-white">${product.price}</span>
                    {product.originalPrice && (
                      <span className="text-lg text-neutral-500 line-through">${product.originalPrice}</span>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                  <Button className="w-full bg-white hover:bg-gray-200 text-black font-semibold">Add to Cart</Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      )}

      {showButton && (
        <motion.div
          variants={itemVariants}
          className="mt-8 relative z-10 flex justify-center"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            size="lg"
            className={`${
              id === "hero"
                ? "bg-white hover:bg-gray-200 text-black font-semibold px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-white/25 transition-all duration-500"
                : "bg-white text-black hover:bg-gray-100"
            }`}
          >
            {buttonText}
          </Button>
        </motion.div>
      )}
    </motion.section>
  )
}
