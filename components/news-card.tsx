import Image from "next/image"

interface NewsCardProps {
  title: string
  date: string
  summary: string
  image: string
}

export default function NewsCard({ title, date, summary, image }: NewsCardProps) {
  return (
    <div className="bg-primary bg-opacity-10 rounded-lg overflow-hidden h-full flex flex-col">
      <div className="relative h-48 w-full">
        <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover" />
      </div>
      <div className="p-6 flex-grow flex flex-col">
        <div className="text-sm text-gray-400 mb-2">{date}</div>
        <h3 className="text-xl font-bold text-primary hover:text-gold mb-3">{title}</h3>
        <p className="text-primary mb-4 flex-grow">{summary}</p>
        <div className="mt-auto">
          <button className="bg-primary hover:bg-primary/80 text-white py-2 px-4 rounded-md transition-colors text-sm">
            Leer Más
          </button>
        </div>
      </div>
    </div>
  )
}
