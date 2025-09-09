export const dynamic = "force-static"
export const revalidate = 30

export default function AboutPage() {
  return (
    <div className="flex flex-col items-center gap-6 text-center">
      <h1 className="text-2xl sm:text-3xl font-medium">About Legacy</h1>
      <p className="text-slate-11 max-w-prose">
        Legacy is a brand focused on timeless quality. This page can be
        expanded with your story, mission, and team.
      </p>
    </div>
  )
}


