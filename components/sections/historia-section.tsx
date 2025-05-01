import Image from "next/image"

export default function HistoriaSection() {
  return (
    <section id="historia" className="py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-bold text-gold mb-6">Nuestra Historia</h2>
          <p className="text-gray-300 mb-4">
            Fundada en 1985, Yeguada Agrado nació de la pasión por los caballos y el compromiso con la excelencia. Lo
            que comenzó como un pequeño proyecto familiar se ha convertido en una de las yeguadas más prestigiosas de
            España.
          </p>
          <p className="text-gray-300 mb-4">
            A lo largo de los años, hemos dedicado nuestros esfuerzos a la selección y mejora de nuestros ejemplares,
            buscando siempre la perfección en cada generación.
          </p>
          <p className="text-gray-300">
            Hoy, Yeguada Agrado es sinónimo de calidad y tradición en el mundo ecuestre, con ejemplares que destacan
            tanto por su belleza como por sus aptitudes deportivas.
          </p>
        </div>
        <div className="relative h-96 w-full">
          <Image
            src="/placeholder.svg?height=600&width=800&query=yeguada historica"
            alt="Historia de Yeguada Agrado"
            fill
            className="object-cover rounded-lg"
          />
        </div>
      </div>
    </section>
  )
}
