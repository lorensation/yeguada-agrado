export default function PageHeader({ title }: { title: string }) {
  return (
    <div className="text-center mb-12">
      <h1 className="text-4xl md:text-5xl font-bold text-gold">{title}</h1>
      <div className="mt-4 w-24 h-1 bg-primary mx-auto"></div>
    </div>
  )
}
