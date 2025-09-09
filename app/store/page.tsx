export const dynamic = "force-static"
export const revalidate = 30

export default function StorePage() {
  return (
    <div className="flex flex-col items-center gap-6 text-center">
      <h1 className="text-2xl sm:text-3xl font-medium">Store</h1>
      <p className="text-slate-11 max-w-prose">
        Welcome to Legacy’s store. Products and checkout will appear here.
      </p>
    </div>
  )
}


