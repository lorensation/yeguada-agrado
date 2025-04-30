import PageHeader from "@/components/page-header"
import Image from "next/image"
import Link from "next/link"

export default function Servicios() {
  const services = [
    {
      id: "cria",
      title: "Cría",
      description:
        "Programas de cría selectiva con las mejores líneas genéticas para obtener ejemplares de alta calidad.",
      image: "/mare-and-foal-pasture.png",
      features: [
        "Selección genética cuidadosa",
        "Seguimiento veterinario especializado",
        "Instalaciones adaptadas para yeguas gestantes",
        "Cuidados personalizados para potros",
      ],
    },
    {
      id: "doma",
      title: "Doma",
      description: "Doma clásica y natural adaptada a las necesidades específicas de cada caballo y su futuro uso.",
      image: "/horse-dressage-training.png",
      features: [
        "Métodos respetuosos con el bienestar animal",
        "Entrenadores con amplia experiencia",
        "Programas personalizados",
        "Seguimiento del progreso",
      ],
    },
    {
      id: "pretraining",
      title: "Pretraining",
      description: "Preparación física y mental para caballos destinados a competiciones deportivas.",
      image: "/horse-jumping-training.png",
      features: [
        "Acondicionamiento físico progresivo",
        "Entrenamiento específico según disciplina",
        "Preparación psicológica",
        "Nutrición especializada",
      ],
    },
    {
      id: "descanso",
      title: "Descanso",
      description: "Instalaciones de primer nivel para el descanso y recuperación de caballos en un entorno natural.",
      image: "/horses-resting-meadow.png",
      features: [
        "Amplios paddocks y pastos",
        "Supervisión veterinaria",
        "Alimentación controlada",
        "Rehabilitación post-competición",
      ],
    },
  ]

  return (
    <div className="pt-20">
      <PageHeader
        title="Nuestros Servicios"
        subtitle="Ofrecemos servicios integrales para el cuidado y desarrollo de su caballo"
      />

      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <p className="text-white/90 leading-relaxed">
              En Yeguada Agrado nos especializamos en ofrecer servicios completos para el cuidado, desarrollo y
              entrenamiento de caballos. Nuestro equipo de profesionales cuenta con décadas de experiencia y pasión por
              estos magníficos animales.
            </p>
          </div>

          <div className="grid gap-16">
            {services.map((service, index) => (
              <div
                key={service.id}
                className={`grid md:grid-cols-2 gap-8 items-center ${index % 2 === 1 ? "md:grid-flow-dense" : ""}`}
              >
                <div className={`${index % 2 === 1 ? "md:col-start-2" : ""}`}>
                  <h2 className="text-3xl font-bold text-gold mb-4">{service.title}</h2>
                  <p className="text-white/90 mb-6 leading-relaxed">{service.description}</p>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-gold mr-2">•</span>
                        <span className="text-white/80">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/servicios/${service.id}`}
                    className="inline-block bg-gold text-primary px-6 py-3 rounded-md font-medium hover:bg-gold/90 transition-colors"
                  >
                    Más información
                  </Link>
                </div>
                <div className="relative h-[400px] rounded-lg overflow-hidden">
                  <Image
                    src={service.image || "/placeholder.svg"}
                    alt={service.title}
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
          <h2 className="text-3xl font-bold text-gold mb-6">¿Necesita un servicio personalizado?</h2>
          <p className="text-white/90 max-w-2xl mx-auto mb-8">
            Contáctenos para discutir sus necesidades específicas. Podemos crear un programa a medida para su caballo.
          </p>
          <Link
            href="/contacto"
            className="inline-block bg-transparent border-2 border-gold text-gold px-6 py-3 rounded-md font-medium hover:bg-gold hover:text-primary transition-colors"
          >
            Solicitar presupuesto
          </Link>
        </div>
      </section>
    </div>
  )
}
