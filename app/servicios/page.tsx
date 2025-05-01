"use client"

import { useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import PageHeader from "@/components/page-header"
import ServiceCard from "@/components/service-card"
import { Button } from "@/components/ui/button"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

export default function ServiciosPage() {
  const servicios = [
    {
      id: "cria",
      title: "Cría",
      description: "Servicio especializado de cría de caballos de alta calidad con atención personalizada.",
      image: "/servicios/cria-principal.jpeg",
      detailDescription: "Nuestro programa de cría está diseñado para producir caballos excepcionales mediante la selección cuidadosa de sementales y yeguas. Ofrecemos asesoramiento personalizado para garantizar los mejores resultados en la reproducción y el cuidado de los potros recién nacidos.",
      images: [
        "/servicios/cria/cria1.jpg",
        "/servicios/cria/cria2.jpeg",
        "/servicios/cria/cria3.jpeg",
        "/servicios/cria/cria4.jpeg"
      ]
    },
    {
      id: "doma",
      title: "Doma",
      description: "Doma profesional adaptada a las necesidades específicas de cada caballo.",
      image: "/servicios/doma-principal.jpg",
      detailDescription: "Nuestro servicio de doma se adapta a las necesidades individuales de cada caballo, respetando su temperamento y aptitudes. Contamos con profesionales experimentados que utilizan métodos respetuosos para lograr una comunicación efectiva entre jinete y caballo.",
      images: [
        "/servicios/doma/doma1.jpg",
        "/servicios/doma/doma2.jpg",
        "/servicios/doma/doma3.jpg"
      ]
    },
    {
      id: "pretraining",
      title: "Pretraining",
      description: "Preparación inicial para caballos jóvenes antes de comenzar su entrenamiento específico.",
      image: "/servicios/pretraining-principal2.jpg",
      detailDescription: "El pretraining es fundamental para el desarrollo adecuado de caballos jóvenes. Este servicio incluye la familiarización con el equipo básico, aprendizaje de comandos elementales y acondicionamiento físico inicial, sentando las bases para un entrenamiento más avanzado en el futuro.",
      images: [
        "/servicios/pretraining/pretraining1.jpeg",
        "/servicios/pretraining-principal.jpg",
        "/servicios/pretraining/pretraining3.jpg",
        "/servicios/pretraining/pretraining4.jpg"
      ]
    },
    {
      id: "descanso",
      title: "Descanso",
      description: "Instalaciones de primera calidad para el descanso y recuperación de los caballos.",
      image: "/servicios/descanso-principal2.jpg",
      detailDescription: "Ofrecemos instalaciones especialmente diseñadas para el descanso y la recuperación de caballos. Con amplios paddocks, pastos de alta calidad y atención veterinaria permanente, garantizamos que su caballo reciba el mejor cuidado durante su periodo de descanso.",
      images: [
        "/servicios/descanso/descanso1.jpeg",
        "/servicios/descanso/descanso2.jpeg",
        "/servicios/descanso-principal.jpg",
      ],
    },
  ]

  return (
    <div className="container mx-auto px-4 py-16">
      <PageHeader title="Servicios" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
        {servicios.map((servicio, index) => (
          <ServiceCard 
            key={index} 
            title={servicio.title} 
            description={servicio.description} 
            image={servicio.image} 
            id={servicio.id} 
          />
        ))}
      </div>

      {/* Detailed service sections */}
      {servicios.map((servicio, index) => (
        <section 
          key={index} 
          id={servicio.id} 
          className="py-16 border-t border-primary/20 mt-16 scroll-mt-24"
        >
          <h2 className="text-3xl font-bold text-primary hover:text-gold mb-8">{servicio.title}</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-lg text-primary mb-6">{servicio.detailDescription}</p>
              <Link href="/contacto">
                <Button className="bg-primary hover:bg-primary/80 text-white">
                  Contactar para este servicio
                </Button>
              </Link>
            </div>
            
            <div className="w-full">
              <Carousel className="w-full max-w-xl mx-auto">
                <CarouselContent>
                  {servicio.images.map((image, idx) => (
                    <CarouselItem key={idx}>
                      <div className="relative h-80 w-full p-1">
                        <Image
                          src={image}
                          alt={`${servicio.title} ${idx + 1}`}
                          fill
                          className="rounded-lg object-cover"
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-0 text-black" />
                <CarouselNext className="right-0 text-black" />
              </Carousel>
            </div>
          </div>
        </section>
      ))}
    </div>
  )
}
