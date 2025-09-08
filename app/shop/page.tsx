"use client"

import { useEffect, useMemo, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { db } from "@/lib/firebase"
import Layout from "../components/Layout"
import { collection, getDocs, query, where, limit } from "firebase/firestore"

type IndicatorProps = { count: number; index: number; setIndex: (i: number) => void }
type ProgressProps = { durationMs: number; keySeed: string }
type KeyboardNavProps = { onPrev: () => void; onNext: () => void }

type Featured = {
  id: string
  title: string
  subtitle: string
  url?: string
  image?: string
}

const FALLBACK_FEATURED: Featured[] = [
  { id: "1", title: "Design System", subtitle: "Timeless, scalable UI foundations", image: "/placeholder.jpg", url: "/shop" },
  { id: "2", title: "UI Components", subtitle: "Production-ready React components", image: "/placeholder.jpg", url: "/shop" },
  { id: "3", title: "Web Templates", subtitle: "Modern templates for any niche", image: "/placeholder.jpg", url: "/shop" },
]

export default function ShopPage() {
  const [items, setItems] = useState<Featured[]>(FALLBACK_FEATURED)
  const [index, setIndex] = useState(0)
  const [durationMs] = useState(15000)
  const [seed, setSeed] = useState(() => `${Date.now()}`)

  useEffect(() => {
    ;(async () => {
      try {
        const ref = collection(db, "products")
        const q = query(ref, where("featured", "==", true), limit(5))
        const snap = await getDocs(q)
        const featured = snap.docs.map((d) => ({
          id: d.id,
          title: (d.data() as any)?.name ?? "Product",
          subtitle: (d.data() as any)?.subtitle ?? "",
          url: (d.data() as any)?.url ?? "/shop",
          image: (d.data() as any)?.image ?? "/placeholder.jpg",
        }))
        if (featured.length) setItems(featured)
      } catch (_) {}
    })()
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % items.length)
      setSeed(`${Date.now()}`)
    }, durationMs)
    return () => clearInterval(t)
  }, [items.length, durationMs])

  const current = useMemo(() => items[index], [items, index])

  return (
    <Layout>
    <div className="min-h-[calc(100vh-3.5rem)] flex flex-col items-center justify-center p-8 relative">
      <AnimatedBackdrop />
      <KeyboardNav onPrev={() => setIndex((i) => (i - 1 + items.length) % items.length)} onNext={() => setIndex((i) => (i + 1) % items.length)} />
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl"
        >
          <div className="mb-6 flex justify-center">
            <img src={current.image || "/placeholder.jpg"} alt={current.title} className="w-full max-w-xl rounded-lg border border-neutral-800" />
          </div>
          <h1 className="text-5xl font-bold mb-3">{current.title}</h1>
          <p className="text-neutral-300 text-xl">{current.subtitle}</p>
          <motion.a
            href={current.url || "/shop"}
            className="inline-flex items-center justify-center mt-6 px-8 py-3 rounded-full bg-white text-black font-semibold shadow-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-white/60"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            Buy Now
          </motion.a>
          <div className="mt-6">
            <ProgressBar durationMs={durationMs} keySeed={seed} />
          </div>
        </motion.div>
      </AnimatePresence>
      <div className="mt-8 flex gap-2">
        {items.map((it, i) => (
          <button
            key={it.id}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full ${i === index ? "bg-white" : "bg-neutral-700"}`}
            aria-label={`Show ${it.title}`}
          />)
        )}
      </div>
      <div className="mt-10 w-full max-w-4xl">
        <Thumbnails items={items} activeIndex={index} onPick={setIndex} />
      </div>
    </div>
    </Layout>
  )
}

function Thumbnails({ items, activeIndex, onPick }: { items: Featured[]; activeIndex: number; onPick: (i: number) => void }) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {items.map((item, i) => (
        <motion.button
          key={item.id}
          onClick={() => onPick(i)}
          whileHover={{ scale: 1.02 }}
          className={`group relative rounded-lg overflow-hidden border ${i === activeIndex ? "border-white/70" : "border-neutral-800"}`}
        >
          <img src={item.image || "/placeholder.jpg"} alt={item.title} className="h-28 w-full object-cover group-hover:opacity-90 transition-opacity" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
          <div className="absolute bottom-2 left-2 text-left">
            <div className="text-sm font-semibold">{item.title}</div>
            <div className="text-xs text-neutral-400">{item.subtitle}</div>
          </div>
        </motion.button>
      ))}
    </div>
  )
}

function ProgressBar({ durationMs, keySeed }: ProgressProps) {
  return (
    <div className="h-1.5 w-72 bg-neutral-800 rounded-full overflow-hidden">
      <motion.div
        key={keySeed}
        className="h-full bg-white"
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ duration: durationMs / 1000, ease: "linear" }}
      />
    </div>
  )
}

function KeyboardNav({ onPrev, onNext }: KeyboardNavProps) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") onPrev()
      if (e.key === "ArrowRight") onNext()
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [onPrev, onNext])
  return null
}

function AnimatedBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10">
      <motion.div
        className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-white/5 blur-3xl"
        animate={{ scale: [1, 1.08, 1], opacity: [0.25, 0.4, 0.25] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-[28rem] h-[28rem] rounded-full bg-white/3 blur-3xl"
        animate={{ scale: [1, 1.04, 1], opacity: [0.2, 0.35, 0.2] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
      />
    </div>
  )
}


