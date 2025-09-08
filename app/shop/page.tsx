"use client"

import { useEffect, useMemo, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { db } from "@/lib/firebase"
import { collection, getDocs, query, where, limit } from "firebase/firestore"

type Featured = {
  id: string
  title: string
  subtitle: string
  image?: string
}

const FALLBACK_FEATURED: Featured[] = [
  { id: "1", title: "Design System", subtitle: "Timeless, scalable UI foundations", image: "/placeholder.jpg" },
  { id: "2", title: "UI Components", subtitle: "Production-ready React components", image: "/placeholder.jpg" },
  { id: "3", title: "Web Templates", subtitle: "Modern templates for any niche", image: "/placeholder.jpg" },
]

export default function ShopPage() {
  const [items, setItems] = useState<Featured[]>(FALLBACK_FEATURED)
  const [index, setIndex] = useState(0)

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
          image: (d.data() as any)?.image ?? "/placeholder.jpg",
        }))
        if (featured.length) setItems(featured)
      } catch (_) {}
    })()
    const t = setInterval(() => setIndex((i) => (i + 1) % items.length), 15000)
    return () => clearInterval(t)
  }, [items.length])

  const current = useMemo(() => items[index], [items, index])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 relative">
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
    </div>
  )
}


