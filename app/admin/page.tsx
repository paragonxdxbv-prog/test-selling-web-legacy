"use client"

import { useEffect, useState } from "react"
import { db } from "@/lib/firebase"
import { doc, getDoc, setDoc, collection, addDoc, serverTimestamp } from "firebase/firestore"

export default function AdminPage() {
  const [ready, setReady] = useState(false)
  const [about, setAbout] = useState("")
  const [savingAbout, setSavingAbout] = useState(false)

  const [productName, setProductName] = useState("")
  const [productSubtitle, setProductSubtitle] = useState("")
  const [productImage, setProductImage] = useState("")
  const [productFeatured, setProductFeatured] = useState(true)
  const [addingProduct, setAddingProduct] = useState(false)

  useEffect(() => {
    setReady(true)
    ;(async () => {
      try {
        const ref = doc(db, "settings", "about")
        const snap = await getDoc(ref)
        if (snap.exists()) {
          setAbout((snap.data() as any)?.content || "")
        }
      } catch (_) {}
    })()
  }, [])

  const saveAbout = async () => {
    setSavingAbout(true)
    try {
      const ref = doc(db, "settings", "about")
      await setDoc(ref, { content: about, updatedAt: serverTimestamp() }, { merge: true })
    } finally {
      setSavingAbout(false)
    }
  }

  const addProduct = async () => {
    setAddingProduct(true)
    try {
      const ref = collection(db, "products")
      await addDoc(ref, {
        name: productName,
        subtitle: productSubtitle,
        image: productImage,
        featured: productFeatured,
        createdAt: serverTimestamp(),
      })
      setProductName("")
      setProductSubtitle("")
      setProductImage("")
      setProductFeatured(true)
    } finally {
      setAddingProduct(false)
    }
  }

  return (
    <div className="min-h-screen p-8 max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">Admin</h1>
      {!ready ? (
        <p className="text-neutral-400">Loading…</p>
      ) : (
        <div className="grid gap-8 md:grid-cols-2">
          <section className="border border-neutral-800 rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-2">About Content</h2>
            <p className="text-neutral-400 text-sm mb-4">Edit the About page content stored in Firebase.</p>
            <textarea
              className="w-full h-40 bg-black border border-neutral-800 rounded p-3"
              placeholder="About content…"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            />
            <div className="mt-4 flex gap-2">
              <button onClick={saveAbout} disabled={savingAbout} className="bg-white text-black px-4 py-2 rounded">
                {savingAbout ? "Saving…" : "Save"}
              </button>
              <button onClick={() => setAbout(about)} className="border border-neutral-700 px-4 py-2 rounded">Cancel</button>
            </div>
          </section>
          <section className="border border-neutral-800 rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-2">Products</h2>
            <p className="text-neutral-400 text-sm mb-4">Create and manage products for the Shop page.</p>
            <div className="space-y-3">
              <input
                className="w-full bg-black border border-neutral-800 rounded p-3"
                placeholder="Name"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
              <input
                className="w-full bg-black border border-neutral-800 rounded p-3"
                placeholder="Subtitle"
                value={productSubtitle}
                onChange={(e) => setProductSubtitle(e.target.value)}
              />
              <input
                className="w-full bg-black border border-neutral-800 rounded p-3"
                placeholder="Image URL"
                value={productImage}
                onChange={(e) => setProductImage(e.target.value)}
              />
              <label className="flex items-center gap-2 text-sm text-neutral-300">
                <input type="checkbox" checked={productFeatured} onChange={(e) => setProductFeatured(e.target.checked)} />
                Featured (rotates in Shop hero)
              </label>
              <button onClick={addProduct} disabled={addingProduct} className="bg-white text-black px-4 py-2 rounded">
                {addingProduct ? "Adding…" : "Add Product"}
              </button>
            </div>
          </section>
        </div>
      )}
    </div>
  )
}


