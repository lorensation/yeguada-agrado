import PageHeader from "@/components/page-header"
import ServiceCard from "@/components/service-card"

export default function ServiciosPage() {
  const servicios = [
    {
      title: "Cría",
      description: "Servicio especializado de cría de caballos de alta calidad con atención personalizada.",
      image: "/cria-de-caballos.png",
    },
    {
      title: "Doma",
      description: "Doma profesional adaptada a las necesidades específicas de cada caballo.",
      image: "/horse-taming.png",
    },
    {
      title: "Pretraining",
      description: "Preparación inicial para caballos jóvenes antes de comenzar su entrenamiento específico.",
      image: "/horse-training.png",
    },
    {
      title: "Descanso",
      description: "Instalaciones de primera calidad para el descanso y recuperación de los caballos.",
      image: "/caballos-descansando.png",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-16">
      <PageHeader title="Servicios" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
        {servicios.map((servicio, index) => (
          <ServiceCard key={index} title={servicio.title} description={servicio.description} image={servicio.image} />
        ))}
      </div>
    </div>
  )
}
