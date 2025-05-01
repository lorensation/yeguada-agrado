import PageHeader from "@/components/page-header"
import NewsCard from "@/components/news-card"

export default function ActualidadPage() {
  const noticias = [
    {
      title: "Nuevo nacimiento en Yeguada Agrado",
      date: "15 de abril de 2023",
      summary: "Celebramos la llegada de un nuevo potro de excepcionales características.",
      image: "/placeholder.svg?height=300&width=500&query=potro recien nacido",
    },
    {
      title: "Éxito en el Campeonato Nacional",
      date: "3 de marzo de 2023",
      summary: "Nuestros ejemplares obtuvieron reconocimientos destacados en el Campeonato Nacional.",
      image: "/placeholder.svg?height=300&width=500&query=competicion ecuestre",
    },
    {
      title: "Ampliación de nuestras instalaciones",
      date: "20 de febrero de 2023",
      summary: "Hemos completado la ampliación de nuestras instalaciones para ofrecer mejores servicios.",
      image: "/placeholder.svg?height=300&width=500&query=instalaciones ecuestres modernas",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-16">
      <PageHeader title="Actualidad" />

      <div className="mt-12 space-y-12">
        {noticias.map((noticia, index) => (
          <NewsCard
            key={index}
            title={noticia.title}
            date={noticia.date}
            summary={noticia.summary}
            image={noticia.image}
          />
        ))}
      </div>
    </div>
  )
}
