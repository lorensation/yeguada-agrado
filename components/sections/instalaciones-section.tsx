import Image from "next/image"

export default function InstalacionesSection() {
  const instalaciones = [
    {
      title: "Patio Principal",
      description: "Cuadras principales formadas por un patio de 20 boxes individuales de 3,5m x 3,5m, con suelo de goma, bebederos automáticos y ventana a ambos lados del box. Cuenta con una manga de ecografías y despacho veterinario para seguimiento reproductivo.",
      image: "/instalaciones/patio-principal.jpg",
    },
    {
      title: "Cuadras de Descanso",
      description: "En el corazón de la yeguada se encuentra la nave de descanso con 8 parideras y cuadras para caballos de 6,5m x 4m. Equipadas con suelos de goma, bebederos automáticos, ventanas y videovigilancia 24h. Incluye balanza para control de peso y salida directa a prados individuales.",
      image: "/instalaciones/cuadras-descanso.jpg",
    },
    {
      title: "Caminador",
      description: "Para garantizar un ejercicio seguro durante la recuperación y descanso, contamos con un caminador abierto para cuatro caballos con suelo de viruta de goma.",
      image: "/instalaciones/caminador.jpg",
    },
    {
      title: "Pista de Pretraining",
      description: "Una de las joyas de la yeguada con 700 metros de cuerda y 4 metros de anchura. Cuenta con drenaje especial y arena mezclada con fibra, ofreciendo condiciones idóneas para que los potros empiecen a conocer su oficio.",
      image: "/instalaciones/pretraining.jpg",
    },
    {
      title: "Prados de Cría",
      description: "Más de 10 hectáreas de prados destinados a la cría del purasangre inglés, con planes de expansión gracias a la reciente adquisición de nuevos terrenos.",
      image: "/instalaciones/prados-cria.jpg",
    },
    {
      title: "Prados de Descanso",
      description: "Rodean el corazón de la yeguada, cuentan con bebederos automáticos y dimensiones reducidas, desde 20m x 10m a 30m x 30m.",
      image: "/instalaciones/prados-descanso.jpg",
    },
  ]

  return (
    <section id="instalaciones" className="py-16">
      <h2 className="text-3xl font-bold text-primary mb-6 text-center hover:text-gold">Nuestras Instalaciones</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {instalaciones.map((item, index) => (
          <div key={index} className="bg-primary bg-opacity-10 rounded-lg overflow-hidden group">
            <div className="relative h-64 w-full overflow-hidden">
              <Image 
                src={item.image || "/placeholder.svg"} 
                alt={item.title} 
                fill 
                className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-110" 
              />
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold text-primary mb-2">{item.title}</h3>
              <p className="text-primary text-sm">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
