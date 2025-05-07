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
      description: "Servicio de reproducción y cría del purasangre inglés.",
      image: "/servicios/cria-principal.jpeg",
      detailDescription: `La yeguada cuenta con <strong>servicios de cría y reproducción</strong> desde el año 2022.\n\n 
        Todas las yeguas están en <strong>continuo seguimiento</strong> desde que llegan a nuestras instalaciones. Los propietarios eligen un semental de la yeguada como son BOW CREEK y RODABALLO (o de fuera de ella) y nuestro <strong>equipo y veterinarios especializados en reproducción</strong> se encargan de todo el proceso de cubrición y confirmación de preñez de la yegua.\n\n
        Diez meses después, un mes antes de la fecha estimada de parto, las yeguas pasan a las <strong>parideras videovigiladas</strong> con el sensor <strong>EasyFoal</strong> instalado en cada una de ellas, dispositivo especializado en la detección y previo aviso de partos en yeguas. Una vez nace el potro, nuestro equipo veterinario realiza un chequeo básico y firma el acta de nacimiento.\n\n
        Una vez los foals se han desarrollado lo suficiente con sus madres en libertad, son <strong>destetados a los 6 meses</strong> y pasan a yearling el 1 de enero, donde se incrementan con <strong>suplementos vitamínicos</strong> para un correcto crecimiento y desarrollo en libertad en los prados de la yeguada, con un seguimiento básico de vacunas y herrajes. Llegado el verano, comienza su trabajo de cara a la posible presentación en <strong>subasta o doma</strong>, a elección del cliente.
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
      description: "Servicio de doma y preparación de yearlings para subasta.",
      image: "/servicios/doma-principal.jpg",
      detailDescription: `El primer gran paso para criar campeones pasa por una <strong>buena doma</strong>. Nuestro personal de la yeguada es <strong>experto en la doma del purasangre inglés</strong> basándonos en la <strong>calidad y paciencia</strong>.\n\n
        En <strong>2 semanas</strong> desde su llegada, el potro ya ha pasado todas las etapas de cinchuelo y ya estaría preparado para ser montado en el picadero para posteriormente pasar a la pista y continuar con el proceso de boca.\n\n
        En apenas <strong>3 semanas</strong>, el potro ya estaría listo para continuar su aprendizaje en la <strong>pista de pre-training</strong>.`,
      images: [
        "/servicios/doma/doma2.jpg",
        "/servicios/doma/doma1.jpg",
        "/servicios/doma/doma3.jpg"
      ]
    },
    {
      id: "pretraining",
      title: "Pretraining",
      description: "Servicio de pretraining para potros de 2 años.",
      image: "/servicios/pretraining-principal2.jpg",
      detailDescription: `El proceso de pre-training se desarrolla en la <strong>nueva pista de pre-training</strong>. Con <strong>700 metros de cuerda</strong> y <strong>4 metros de anchura</strong>, la pista de pre-training es el trazado ideal para que los potros empiecen a conocer su oficio.\n\n 
        Un <strong>drenaje especial</strong> acompañado de <strong>arena mezclada con fibra</strong> presta las condiciones idóneas para un correcto ejercicio. Los potros se dividen en lotes y completan un proceso de <strong>2 a 3 meses</strong> en la pista con <strong>profesionales de primer nivel</strong> donde aprenden a trotar, galopar y trabajar cabeza-cabeza con otros potros.\n\n
        Una vez completado el pre-training, están listos para viajar con sus entrenadores a los centros de entrenamiento.
        Esta temporada 2025, hemos completado exitosamente la doma y pre-training de <strong>16 potros</strong> que ya se encuentran a las órdenes de sus respectivos entrenadores.`,
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
      description: "Servicio de descanso y recuperación de caballos en competición.",
      image: "/servicios/descanso-principal2.jpg",
      detailDescription: `Tras una temporada exigente, muchos propietarios y entrenadores deciden dar a sus pupilos un <strong>merecido descanso</strong> alejado del estrés de la competición. 
        Nuestras instalaciones cuentan con <strong>todo lo necesario</strong> para que los caballos recuperen fuerzas y vuelvan en las <strong>mejores condiciones posibles</strong> al entrenamiento. 
        Para ello, disponen de <strong>boxes de 6,5m x 4m</strong> equipados con <strong>suelos de goma, bebederos automáticos, ventanas a ambos lados</strong> y <strong>sistema de videovigilancia 24h</strong> individual para cada box, además de <strong>prados individuales</strong> y <strong>caminador</strong> a elección del cliente.`,
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
                  <p key={idx} className="mb-4" dangerouslySetInnerHTML={{ __html: paragraph }}></p>
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
