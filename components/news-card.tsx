import Image from "next/image"

interface NewsCardProps {
  title: string
  date: string
  summary: string
  image: string
}

export default function NewsCard({ title, date, summary, image }: NewsCardProps) {
  return (
    <div className="bg-primary bg-opacity-10 rounded-lg overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="relative h-64 md:h-auto w-full md:col-span-1">
          <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover" />
        </div>
        <div className="p-6 md:col-span-2">
          <div className="text-sm text-gray-400 mb-2">{date}</div>
          <h3 className="text-2xl font-bold text-gold mb-4">{title}</h3>
          <p className="text-gray-300 mb-4">{summary}</p>
          <button className="bg-primary hover:bg-primary/80 text-white py-2 px-6 rounded-md transition-colors">
            Leer Más
          </button>
        </div>
      </div>
    </div>
  )
}
