import Image from "next/image"

export default function NacimientosSection() {
  const nacimientos = [
    {
      name: "Lucero",
      date: "Marzo 2023",
      image: "/placeholder.svg?height=300&width=400&query=potro recien nacido",
    },
    {
      name: "Estrella",
      date: "Abril 2023",
      image: "/placeholder.svg?height=300&width=400&query=yegua con potro",
    },
    {
      name: "Relámpago",
      date: "Mayo 2023",
      image: "/placeholder.svg?height=300&width=400&query=potro joven",
    },
  ]

  return (
    <section id="nacimientos" className="py-16">
      <h2 className="text-3xl font-bold text-gold mb-6 text-center">Últimos Nacimientos</h2>
      <p className="text-gray-300 text-center max-w-3xl mx-auto mb-12">
        Celebramos con orgullo la llegada de nuevos potros a nuestra yeguada, fruto de cuidadosas selecciones genéticas
        y de nuestro compromiso con la excelencia.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {nacimientos.map((item, index) => (
          <div key={index} className="bg-primary bg-opacity-10 rounded-lg overflow-hidden">
            <div className="relative h-64 w-full">
              <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gold">{item.name}</h3>
              <p className="text-gray-300">{item.date}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
