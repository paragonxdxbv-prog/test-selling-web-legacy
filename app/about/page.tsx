"use client"

import { useEffect, useState } from "react"
import { db } from "@/lib/firebase"
import { doc, getDoc } from "firebase/firestore"

export default function AboutPage() {
  const [content, setContent] = useState<string>("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      try {
        const ref = doc(db, "settings", "about")
        const snap = await getDoc(ref)
        if (snap.exists()) setContent((snap.data() as any)?.content || "")
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-3xl text-center">
        <h1 className="text-5xl font-bold mb-6">About Us</h1>
        {loading ? (
          <p className="text-neutral-400">Loading…</p>
        ) : (
          <p className="text-neutral-300 text-lg whitespace-pre-wrap">{content || "No content yet."}</p>
        )}
      </div>
    </div>
  )
}


