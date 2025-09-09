export const dynamic = "force-static"
export const revalidate = 30

export default function Home() {
  return (
    <section className="flex flex-col items-center text-center gap-6">
      <div className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-semibold text-slate-12">Digital products by Legacy</h1>
        <p className="text-slate-11 max-w-prose">
          Premium templates, toolkits, and resources to help you build faster. Simple
          licensing. Instant download.
        </p>
      </div>
      <div className="flex gap-3">
        <a href="/store" className="px-5 py-2 rounded-full bg-slate-12 text-slate-1 font-medium">
          Browse the store
        </a>
        <a href="/about" className="px-5 py-2 rounded-full border border-slate-7 text-slate-12">
          About Legacy
        </a>
      </div>
    </section>
  )
}
