import PageHeader from "@/components/page-header"
import Image from "next/image"
import Link from "next/link"

export default function Sementales() {
  const stallions = [
    {
      id: "bow-creek",
      name: "Bow Creek",
      breed: "Pura Raza Española",
      age: 8,
      description:
        "Semental de pura raza con múltiples premios internacionales. Destacado por su elegancia y temperamento.",
      image: "/elegant-brown-stallion.png",
    },
    {
      id: "rodaballo",
      name: "Rodaballo",
      breed: "Anglo-Árabe",
      age: 10,
      description: "Ejemplar excepcional con una genética privilegiada. Conocido por su resistencia y velocidad.",
      image: "/majestic-white-stallion.png",
    },
  ]

  return (
    <div className="pt-20">
      <PageHeader
        title="Nuestros Sementales"
        subtitle="Ejemplares de excepción seleccionados por su morfología, temperamento y genética"
      />

      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <p className="text-white/90 leading-relaxed">
              En Yeguada Agrado, seleccionamos cuidadosamente nuestros sementales basándonos en su morfología,
              temperamento y líneas genéticas. Cada uno de nuestros ejemplares ha sido elegido para aportar
              características excepcionales a las futuras generaciones.
            </p>
          </div>

          <div className="grid gap-16">
            {stallions.map((stallion, index) => (
              <div
                key={stallion.id}
                className={`grid md:grid-cols-2 gap-8 items-center ${index % 2 === 1 ? "md:grid-flow-dense" : ""}`}
              >
                <div className={`${index % 2 === 1 ? "md:col-start-2" : ""}`}>
                  <h2 className="text-3xl font-bold text-gold mb-2">{stallion.name}</h2>
                  <div className="flex gap-4 text-white/70 mb-4">
                    <span>{stallion.breed}</span>
                    <span>•</span>
                    <span>{stallion.age} años</span>
                  </div>
                  <p className="text-white/90 mb-6 leading-relaxed">{stallion.description}</p>
                  <Link
                    href={`/sementales/${stallion.id}`}
                    className="inline-block bg-gold text-primary px-6 py-3 rounded-md font-medium hover:bg-gold/90 transition-colors"
                  >
                    Ver perfil completo
                  </Link>
                </div>
                <div className="relative h-[400px] rounded-lg overflow-hidden">
                  <Image
                    src={stallion.image || "/placeholder.svg"}
                    alt={stallion.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-primary">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-gold mb-6">Servicios de Reproducción</h2>
          <p className="text-white/90 max-w-2xl mx-auto mb-8">
            Ofrecemos servicios de reproducción con nuestros sementales de élite. Consulte disponibilidad y condiciones
            para la temporada actual.
          </p>
          <Link
            href="/contacto"
            className="inline-block bg-transparent border-2 border-gold text-gold px-6 py-3 rounded-md font-medium hover:bg-gold hover:text-primary transition-colors"
          >
            Solicitar información
          </Link>
        </div>
      </section>
    </div>
  )
}
