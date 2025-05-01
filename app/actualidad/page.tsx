"use client"

import { useState } from "react"
import PageHeader from "@/components/page-header"
import NewsCard from "@/components/news-card"
import { Button } from "@/components/ui/button"

export default function ActualidadPage() {
  const allNoticias = [
    {
      id: 1,
      title: "Nuevo nacimiento en Yeguada Agrado",
      date: "15 de abril de 2025",
      summary: "Celebramos la llegada de un nuevo potro de excepcionales características.",
      image: "/QuickArtist+Potro.jpg",
      slug: "nuevo-nacimiento-2025",
    },
    {
      id: 2,
      title: "Éxito en el Campeonato Nacional",
      date: "3 de marzo de 2025",
      summary: "Nuestros ejemplares obtuvieron reconocimientos destacados en el Campeonato Nacional.",
      image: "/kowalsky-duque-albuquerque.jpg",
      slug: "exito-campeonato-nacional-2025",
    },
    {
      id: 3,
      title: "Ampliación de nuestras instalaciones",
      date: "20 de febrero de 2025",
      summary: "Hemos completado la ampliación de nuestras instalaciones para ofrecer mejores servicios.",
      image: "/caballos-descansando.png",
      slug: "ampliacion-instalaciones-2025",
    },
    {
      id: 4,
      title: "Seminario de doma clásica",
      date: "10 de abril de 2025",
      summary: "Gran éxito en nuestro seminario mensual de doma clásica con participación internacional.",
      image: "/doma-black-horse.jpg",
      slug: "seminario-doma-clasica-2025",
    },
    {
      id: 5,
      title: "Visita de expertos internacionales",
      date: "25 de marzo de 2025",
      summary: "Recibimos la visita de criadores y especialistas de renombre internacional.",
      image: "/3horses+jockeys.jpg",
      slug: "visita-expertos-internacionales-2025",
    },
    {
      id: 6,
      title: "Reconocimiento a nuestro semental estrella",
      date: "12 de marzo de 2025",
      summary: "Nuestro semental Rodaballo recibe un importante reconocimiento por su genética.",
      image: "/instalaciones/instalaciones4.jpg",
      slug: "reconocimiento-semental-estrella-2025",
    },
    {
      id: 7,
      title: "Jornada de puertas abiertas",
      date: "5 de marzo de 2025",
      summary: "Gran afluencia en nuestra jornada anual de puertas abiertas para amantes de la equitación.",
      image: "/hero/hero2.jpg",
      slug: "jornada-puertas-abiertas-2025",
    },
    {
      id: 8,
      title: "Nuevo convenio de colaboración",
      date: "27 de febrero de 2025",
      summary: "Firmamos un importante convenio con la Federación Española de Hípica.",
      image: "/inicio-miguel.jpg",
      slug: "convenio-colaboracion-federacion-2025",
    },
    {
      id: 9,
      title: "Innovación en técnicas de reproducción",
      date: "15 de febrero de 2025",
      summary: "Implementamos las últimas técnicas en reproducción equina con excelentes resultados.",
      image: "/cria-de-caballos.png",
      slug: "innovacion-tecnicas-reproduccion-2025",
    },
    {
      id: 10,
      title: "Primera competición del año",
      date: "30 de enero de 2025",
      summary: "Participación destacada en la primera competición del calendario ecuestre del año.",
      image: "/hero/hero5.jpeg",
      slug: "primera-competicion-2025",
    },
    {
      id: 11,
      title: "Incorporación de nuevas líneas genéticas",
      date: "15 de enero de 2025",
      summary: "Incorporamos nuevas líneas genéticas a nuestra yeguada para mejorar nuestros ejemplares.",
      image: "/bowcreek-genealogy.jpg",
      slug: "nuevas-lineas-geneticas-2025",
    },
    {
      id: 12,
      title: "Celebración del aniversario de la yeguada",
      date: "5 de enero de 2025",
      summary: "Celebramos otro año más de dedicación a la excelencia en la cría de caballos.",
      image: "/family-running-grass.jpeg",
      slug: "aniversario-yeguada-2025",
    },
  ]

  const [visibleCount, setVisibleCount] = useState(9);
  
  const handleCardClick = (slug: string) => {
    alert(`Navegando al artículo: ${slug} (en desarrollo)`);
  };

  const handleLoadMore = () => {
    setVisibleCount(prev => Math.min(prev + 3, allNoticias.length));
  };

  const visibleNoticias = allNoticias.slice(0, visibleCount);
  
  return (
    <div className="container mx-auto px-4 py-16">
      <PageHeader title="Actualidad" />

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleNoticias.map((noticia) => (
          <div 
            key={noticia.id} 
            onClick={() => handleCardClick(noticia.slug)}
            className="cursor-pointer transition-transform hover:scale-[1.02]"
          >
            <NewsCard
              title={noticia.title}
              date={noticia.date}
              summary={noticia.summary}
              image={noticia.image}
            />
          </div>
        ))}
      </div>
      
      {visibleCount < allNoticias.length && (
        <div className="mt-10 text-center">
          <Button 
            onClick={handleLoadMore} 
            className="bg-primary hover:bg-primary/80 text-white py-2 px-8 text-lg"
          >
            Cargar más noticias
          </Button>
        </div>
      )}
    </div>
  )
}
