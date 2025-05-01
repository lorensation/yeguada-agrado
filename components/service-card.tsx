import Image from "next/image"

interface ServiceCardProps {
  title: string
  description: string
  image: string
}

export default function ServiceCard({ title, description, image }: ServiceCardProps) {
  return (
    <div className="bg-primary bg-opacity-10 rounded-lg overflow-hidden">
      <div className="relative h-64 w-full">
        <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover" />
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-bold text-gold mb-4">{title}</h3>
        <p className="text-gray-300 mb-4">{description}</p>
        <button className="bg-primary hover:bg-primary/80 text-white py-2 px-6 rounded-md transition-colors">
          Más Información
        </button>
      </div>
    </div>
  )
}
