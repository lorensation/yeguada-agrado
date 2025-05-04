"use client"

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
      detailDescription: `La yeguada cuenta con servicios de cría y reproducción desde el año 2022.\n\n 
        Todas las yeguas están en continuo seguimiento desde que llegan a nuestras instalaciones. Los propietarios eligen un semental de la yeguada como son BOW CREEK y RODABALLO (o de fuera de ella) y nuestro equipo y veterinarios especializados en reproducción se encargan de todo el proceso de cubrición y confirmación de preñez de la yegua.\n\n
        Diez meses después, un mes antes de la fecha estimada de parto, las yeguas pasan a las parideras videovigiladas con el sensor EasyFoal instalado en cada una de ellas, dispositivo especializado en la detección y previo aviso de partos en yeguas. Una vez nace el potro, nuestro equipo veterinario realiza un chequeo básico y firma el acta de nacimiento.\n\n
        Una vez los foals se han desarrollado lo suficiente con sus madres en libertad, son destetados a los 6 meses y pasan a yerling el 1 de enero, donde se incrementan con suplementos vitamínicos para un correcto crecimiento y desarrollo en libertad en los prados de la yeguada, con un seguimiento básico de vacunas y herrajes. Llegado el verano, comienza su trabajo de cara a la posible presentación en subasta o doma, a elección del cliente.
        `,
      images: [
        "/servicios/cria/cria3.jpeg",
        "/servicios/cria/cria2.jpeg",
        "/servicios/cria/cria1.jpg",
        "/servicios/cria/cria4.jpeg"
      ]
    },
    {
      id: "doma",
      title: "Doma",
      description: "Doma profesional adaptada a las necesidades específicas de cada caballo.",
      image: "/servicios/doma-principal.jpg",
      detailDescription: `El primer gran paso para criar campeones pasa por una buena doma. Nuestro personal de la yeguada es experto en la doma del purasangre inglés basándonos en la calidad y paciencia.\n\n
        En 2 semanas desde su llegada, el potro ya ha pasado todas las etapas de cinchuelo y ya estaría preparado para ser montado en el picadero para posteriormente pasar a la pista y continuar con el proceso de boca.\n\n
        En apenas 3 semanas, el potro ya estaría listo para continuar su aprendizaje en la pista de pre-training.`,
      images: [
        "/servicios/doma/doma2.jpg",
        "/servicios/doma/doma1.jpg",
        "/servicios/doma/doma3.jpg"
      ]
    },
    {
      id: "pretraining",
      title: "Pretraining",
      description: "Preparación inicial para caballos jóvenes antes de comenzar su entrenamiento específico.",
      image: "/servicios/pretraining-principal2.jpg",
      detailDescription: `El proceso de pre-training se desarrolla en la nueva pista de pre-training. Con 700 metros de cuerda y 4 metros de anchura, la pista de pre-training es el trazado ideal para que los potros empiecen a conocer su oficio.\n\n 
        Un drenaje especial acompañado de arena mezclada con fibra presta las condiciones idóneas para un correcto ejercicio. Los potros se dividen en lotes y completan un proceso de 2 a 3 meses en la pista con profesionales de primer nivel donde aprenden a trotar, galopar y trabajar cabeza-cabeza con otros potros.\n\n
        Una vez completado el pre-training, están listos para viajar con sus entrenadores a los centros de entrenamiento.
        Esta temporada 2025, hemos completado exitosamente la doma y pre-training de 16 potros que ya se encuentran a las órdenes de sus respectivos entrenadores.`,
      images: [
        "/servicios/pretraining/pretraining4.jpg",
        "/servicios/pretraining-principal.jpg",
        "/servicios/pretraining/pretraining3.jpg",
        "/servicios/pretraining/pretraining1.jpeg"
      ]
    },
    {
      id: "descanso",
      title: "Descanso",
      description: "Instalaciones de primera calidad para el descanso y recuperación de los caballos.",
      image: "/servicios/descanso-principal2.jpg",
      detailDescription: `Tras una temporada exigente, muchos propietarios y entrenadores deciden dar a sus pupilos un merecido descanso alejado del estrés de la competición. 
        Nuestras instalaciones cuentan con todo lo necesario para que los caballos recuperen fuerzas y vuelvan en las mejores condiciones posibles al entrenamiento. 
        Para ello, disponen de boxes de 6,5m x 4m equipados con suelos de goma, bebederos automáticos, ventanas a ambos lados y sistema de videovigilancia 24h individual para cada box, además de prados individuales y caminador a elección del cliente.`,
      images: [
        "/servicios/descanso/descanso1.jpeg",
        "/servicios/descanso/descanso3.jpg",
        "/servicios/descanso/descanso2.jpeg",
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
            <div className="text-primary text-lg mb-6 whitespace-pre-line pr-8">
                {servicio.detailDescription && servicio.detailDescription.split('\n').map((paragraph, idx) => (
                  <p key={idx} className="mb-4">{paragraph}</p>
                ))}
              </div>
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
