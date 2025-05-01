import Image from "next/image"

interface SementalCardProps {
  name: string
  image: string
  description: string
}

export default function SementalCard({ name, image, description }: SementalCardProps) {
  return (
    <div className="bg-primary bg-opacity-10 rounded-lg overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative h-80 w-full">
          <Image src={image || "/placeholder.svg"} alt={name} fill className="object-cover" />
        </div>
        <div className="p-6 flex flex-col justify-center">
          <h3 className="text-2xl font-bold text-gold mb-4">{name}</h3>
          <p className="text-gray-300 mb-4">{description}</p>
          <ul className="space-y-2 text-gray-300">
            <li>• Raza: Pura Raza Española</li>
            <li>• Edad: 8 años</li>
            <li>• Altura: 1.68m</li>
            <li>• Capa: Torda</li>
          </ul>
          <button className="mt-6 bg-primary hover:bg-primary/80 text-white py-2 px-6 rounded-md transition-colors">
            Ver Pedigree
          </button>
        </div>
      </div>
    </div>
  )
}
