import HeroCarousel from "@/components/hero-carousel"
import Image from "next/image"
import Link from "next/link"

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroCarousel />

      <section id="about" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gold section-title">Nuestra Historia</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-white/90 mb-6 leading-relaxed">
                Fundada en 1985, Yeguada Agrado ha sido sinónimo de excelencia en la cría y doma de caballos de pura
                raza. Nuestra pasión por estos magníficos animales nos ha llevado a crear un espacio donde la tradición
                ecuestre se combina con las técnicas más modernas.
              </p>
              <p className="text-white/90 mb-6 leading-relaxed">
                A lo largo de nuestra historia, hemos desarrollado líneas genéticas excepcionales que han dado como
                resultado ejemplares premiados en competiciones nacionales e internacionales.
              </p>
              <Link
                href="/historia"
                className="inline-block bg-transparent border-2 border-gold text-gold px-6 py-3 rounded-md font-medium hover:bg-gold hover:text-primary transition-colors"
              >
                Conocer más
              </Link>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src="/elegant-horse-farm-mountains.png"
                alt="Historia de Yeguada Agrado"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-primary">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gold section-title">Nuestros Servicios</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Cría",
                description: "Programas de cría selectiva con las mejores líneas genéticas.",
                link: "/servicios/cria",
              },
              {
                title: "Doma",
                description: "Doma clásica y natural adaptada a cada caballo.",
                link: "/servicios/doma",
              },
              {
                title: "Pretraining",
                description: "Preparación física y mental para competiciones.",
                link: "/servicios/pretraining",
              },
              {
                title: "Descanso",
                description: "Instalaciones de primer nivel para el descanso y recuperación.",
                link: "/servicios/descanso",
              },
            ].map((service, index) => (
              <div
                key={index}
                className="bg-background p-6 rounded-lg hover:transform hover:scale-105 transition-transform"
              >
                <h3 className="text-xl font-semibold text-gold mb-3">{service.title}</h3>
                <p className="text-white/80 mb-4">{service.description}</p>
                <Link href={service.link} className="text-gold hover:underline">
                  Saber más →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gold section-title">Sementales Destacados</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {[
              {
                name: "Bow Creek",
                description: "Semental de pura raza con múltiples premios internacionales.",
                image: "/elegant-brown-stallion.png",
                link: "/sementales/bow-creek",
              },
              {
                name: "Rodaballo",
                description: "Ejemplar excepcional con una genética privilegiada.",
                image: "/majestic-white-stallion.png",
                link: "/sementales/rodaballo",
              },
            ].map((stallion, index) => (
              <div key={index} className="group">
                <div className="relative h-[400px] rounded-lg overflow-hidden mb-4">
                  <Image
                    src={stallion.image || "/placeholder.svg"}
                    alt={stallion.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                    <div className="p-6">
                      <h3 className="text-2xl font-bold text-gold">{stallion.name}</h3>
                      <p className="text-white/90 mb-4">{stallion.description}</p>
                      <Link
                        href={stallion.link}
                        className="inline-block bg-gold text-primary px-4 py-2 rounded-md font-medium hover:bg-gold/90 transition-colors"
                      >
                        Ver perfil
                      </Link>
                    </div>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gold">{stallion.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-primary">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gold mb-6">¿Interesado en nuestros servicios?</h2>
          <p className="text-white/90 max-w-2xl mx-auto mb-8">
            Contáctenos para obtener más información sobre nuestros servicios de cría, doma y cuidado de caballos.
          </p>
          <Link
            href="/contacto"
            className="inline-block bg-gold text-primary px-8 py-4 rounded-md font-medium hover:bg-gold/90 transition-colors"
          >
            Contactar ahora
          </Link>
        </div>
      </section>
    </div>
  )
}
