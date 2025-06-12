export default function PatternLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (
    <section className="bg-slate-400 min-h-24">
      {/* Include shared UI here e.g. a header or sidebar */}
     
      {children}
    </section>
  )
}