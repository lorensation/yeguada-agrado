import Image from "next/image"

interface SementalProps {
  semental: {
    id: string
    name: string
    tagline: string
    fee: string
    year?: string
    image: string
  }
}

export default function SementalHero({ semental }: SementalProps) {
  return (
    <div className="relative w-full h-[70vh] overflow-hidden">
      <Image src={semental.image || "/placeholder.svg"} alt={semental.name} fill className="object-cover" priority />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent">
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
          <h2 className="text-5xl md:text-7xl font-bold text-primary hover:text-gold mb-2">{semental.name}</h2>
          <p className="text-xl md:text-2xl text-primary mb-4">{semental.tagline}</p>
          <p className="text-xl font-bold text-gold">{semental.fee}</p>
        </div>
      </div>
    </div>
  )
}
