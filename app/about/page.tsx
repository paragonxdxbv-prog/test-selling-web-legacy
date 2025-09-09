export const dynamic = "force-static"
export const revalidate = 30

export default function AboutPage() {
  return (
    <div className="flex flex-col items-center gap-6 text-center">
      <h1 className="text-2xl sm:text-3xl font-medium text-slate-12">About Legacy</h1>
      <p className="text-slate-11 max-w-prose">
        We craft digital products that help creators and teams move faster.
        From design systems to automation packs, our focus is practical
        excellence and long-term value.
      </p>
    </div>
  )
}


