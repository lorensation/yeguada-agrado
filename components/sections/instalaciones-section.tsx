import Image from "next/image"

export default function InstalacionesSection() {
  const instalaciones = [
    {
      title: "Boxes Amplios",
      image: "/placeholder.svg?height=300&width=400&query=boxes para caballos",
    },
    {
      title: "Pistas de Entrenamiento",
      image: "/placeholder.svg?height=300&width=400&query=pista de entrenamiento ecuestre",
    },
    {
      title: "Paddocks Verdes",
      image: "/placeholder.svg?height=300&width=400&query=paddock para caballos",
    },
    {
      title: "Zona de Duchas",
      image: "/placeholder.svg?height=300&width=400&query=ducha para caballos",
    },
  ]

  return (
    <section id="instalaciones" className="py-16">
      <h2 className="text-3xl font-bold text-gold mb-6 text-center">Nuestras Instalaciones</h2>
      <p className="text-gray-300 text-center max-w-3xl mx-auto mb-12">
        Contamos con modernas instalaciones diseñadas para garantizar el máximo bienestar y confort de nuestros
        caballos, así como para facilitar el trabajo diario y el entrenamiento.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {instalaciones.map((item, index) => (
          <div key={index} className="bg-primary bg-opacity-10 rounded-lg overflow-hidden">
            <div className="relative h-64 w-full">
              <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gold">{item.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
