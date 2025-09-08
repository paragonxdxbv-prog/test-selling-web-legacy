"use client"

import Link from "next/link"

export default function NavBar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-black/40 bg-black/60 border-b border-neutral-900">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <img src="/images/legacy-logo.png" alt="Logo" className="h-7 w-7 object-contain" />
          <span className="font-semibold tracking-wide">LEGACY</span>
        </Link>
        <div className="flex items-center gap-6 text-sm">
          <Link href="/shop" className="text-neutral-300 hover:text-white transition-colors">Shop</Link>
          <Link href="/about" className="text-neutral-300 hover:text-white transition-colors">About</Link>
          <Link href="/admin" className="text-neutral-300 hover:text-white transition-colors">Admin</Link>
        </div>
      </nav>
    </header>
  )
}


