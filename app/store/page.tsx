"use client"
export const dynamic = "force-static"
export const revalidate = 30

import { useEffect, useState } from "react"

type Featured = { title: string; subtitle: string; cta: string; href: string }

const featuredItems: Featured[] = [
  { title: "Notion OS", subtitle: "A complete productivity system.", cta: "Buy now", href: "/buy/notion-os" },
  { title: "UI Kit", subtitle: "Production-ready components.", cta: "Buy now", href: "/buy/ui-kit" },
  { title: "Automation Pack", subtitle: "Save hours with workflows.", cta: "Buy now", href: "/buy/automation-pack" },
]

export default function StorePage() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % featuredItems.length)
    }, 15000)
    return () => clearInterval(id)
  }, [])

  const current = featuredItems[index]

  return (
    <div className="flex flex-col items-center gap-8 text-center">
      <div className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-semibold text-slate-12">Legacy Store</h1>
        <p className="text-slate-11 max-w-prose">Discover our latest digital products.</p>
      </div>

      <div className="w-full max-w-xl rounded-2xl border border-slate-6 bg-slate-2 p-6 text-left">
        <p className="text-sm text-slate-10">Featured</p>
        <h2 className="mt-1 text-2xl font-medium text-slate-12">{current.title}</h2>
        <p className="text-slate-11">{current.subtitle}</p>
        <a
          href={current.href}
          className="inline-flex mt-4 px-5 py-2 rounded-full bg-slate-12 text-slate-1 font-medium"
        >
          {current.cta}
        </a>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 w-full max-w-xl">
        {[1, 2, 3, 4].map((n) => (
          <div key={n} className="rounded-xl border border-slate-6 p-4 bg-slate-2">
            <div className="text-slate-12 font-medium">Product {n}</div>
            <div className="text-slate-11">Short description for product {n}.</div>
            <a href={`/buy/product-${n}`} className="mt-3 inline-flex px-4 py-1.5 rounded-full bg-slate-12 text-slate-1 text-sm">
              Buy now
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}


