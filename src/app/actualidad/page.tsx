import PageHeader from "@/components/page-header"
import Image from "next/image"
import Link from "next/link"

export default function Actualidad() {
  const news = [
    {
      id: "1",
      title: "Éxito en el Campeonato Nacional",
      date: "15 de abril de 2023",
      excerpt: "Nuestro semental Bow Creek obtiene el primer premio en el Campeonato Nacional de Morfología.",
      image: "/placeholder.svg?height=400&width=600&query=horse show competition trophy",
    },
    {
      id: "2",
      title: "Nuevos nacimientos en Yeguada Agrado",
      date: "3 de marzo de 2023",
      excerpt:
        "Celebramos la llegada de cinco nuevos potros que prometen continuar el legado de excelencia de nuestra yeguada.",
      image: "/placeholder.svg?height=400&width=600&query=newborn foal with mother",
    },
    {
      id: "3",
      title: "Ampliación de nuestras instalaciones",
      date: "20 de febrero de 2023",
      excerpt: "Inauguramos nuevas instalaciones para mejorar nuestros servicios de doma y entrenamiento.",
      image: "/placeholder.svg?height=400&width=600&query=modern horse stable facility",
    },
    {
      id: "4",
      title: "Participación en la Feria Internacional Ecuestre",
      date: "5 de enero de 2023",
      excerpt: "Yeguada Agrado estará presente en la próxima edición de la Feria Internacional Ecuestre en Madrid.",
      image: "/placeholder.svg?height=400&width=600&query=international horse fair exhibition",
    },
  ]

  return (
    <div className="pt-20">
      <PageHeader title="Actualidad" subtitle="Mantente al día con las últimas noticias y eventos de Yeguada Agrado" />

      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {news.map((item) => (
              <div
                key={item.id}
                className="bg-primary rounded-lg overflow-hidden hover:transform hover:scale-[1.02] transition-transform"
              >
                <div className="relative h-[240px]">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="p-6">
                  <div className="text-gold/80 text-sm mb-2">{item.date}</div>
                  <h3 className="text-xl font-bold text-gold mb-3">{item.title}</h3>
                  <p className="text-white/80 mb-4">{item.excerpt}</p>
                  <Link href={`/actualidad/${item.id}`} className="text-gold hover:underline">
                    Leer más →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-primary">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gold mb-6">Próximos Eventos</h2>
              <div className="space-y-6">
                {[
                  { date: "20 de mayo, 2023", title: "Jornada de puertas abiertas", location: "Yeguada Agrado" },
                  {
                    date: "15 de junio, 2023",
                    title: "Exhibición de doma clásica",
                    location: "Centro Ecuestre Madrid",
                  },
                  { date: "10 de julio, 2023", title: "Campeonato Regional", location: "Sevilla" },
                ].map((event, index) => (
                  <div key={index} className="border-l-2 border-gold pl-4">
                    <div className="text-gold/80 text-sm">{event.date}</div>
                    <h3 className="text-lg font-semibold text-white">{event.title}</h3>
                    <div className="text-white/70">{event.location}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg?height=400&width=600&query=equestrian event calendar"
                alt="Próximos eventos"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-gold mb-6">Suscríbete a nuestro boletín</h2>
          <p className="text-white/90 max-w-2xl mx-auto mb-8">
            Recibe las últimas noticias, eventos y novedades de Yeguada Agrado directamente en tu correo electrónico.
          </p>
          <form className="max-w-md mx-auto">
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Tu correo electrónico"
                className="flex-1 px-4 py-3 rounded-md bg-primary border border-white/20 text-white focus:outline-none focus:border-gold"
              />
              <button
                type="submit"
                className="bg-gold text-primary px-6 py-3 rounded-md font-medium hover:bg-gold/90 transition-colors"
              >
                Suscribirse
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  )
}
