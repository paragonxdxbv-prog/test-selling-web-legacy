"use client"

import { useEffect, useState } from "react"

export type FeaturedItem = { title: string; subtitle: string; cta: string; href: string }

export function FeaturedRotator({ items, intervalMs = 15000 }: { items: FeaturedItem[]; intervalMs?: number }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % items.length), intervalMs)
    return () => clearInterval(id)
  }, [items.length, intervalMs])

  const current = items[index]

  return (
    <div className="w-full max-w-xl rounded-2xl border border-slate-6 bg-slate-2 p-6 text-left">
      <p className="text-sm text-slate-10">Featured</p>
      <h2 className="mt-1 text-2xl font-medium text-slate-12">{current.title}</h2>
      <p className="text-slate-11">{current.subtitle}</p>
      <a href={current.href} className="inline-flex mt-4 px-5 py-2 rounded-full bg-slate-12 text-slate-1 font-medium">
        {current.cta}
      </a>
    </div>
  )
}


