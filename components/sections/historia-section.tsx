import Image from "next/image"

export default function HistoriaSection() {
  return (
    <section id="historia" className="py-16">
      <div className="flex flex-col gap-12">
        {/* First row with text on left, image on right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-primary mb-6 hover:text-gold">Nuestra Historia</h2>
            <p className="text-primary mb-4">
              La Yeguada Agrado es un <strong>proyecto familiar</strong> que comenzó en 2019 con el objetivo de <strong>fomentar la cría nacional en España</strong>. Tras más de 15 años como propietarios de caballos de carreras en España, la familia Redondo se embarcó en un ilusionante proyecto de cría y centro de descanso para los caballos de su propiedad al adquirir un terreno de <strong>20 hectáreas</strong> en Aldea del Fresno, Madrid.
            </p>
            <p className="text-primary mb-4">
              La idea inicial era tener unas instalaciones para abastecer las necesidades de sus caballos retirados y en competición, pero con el paso del tiempo, amigos y conocidos del turf quedaron prendados de sus instalaciones y comenzó el <strong>proceso de expansión y profesionalización</strong> de cara a nuevos clientes.
            </p>
          </div>
          <div className="relative h-96 w-full">
            <Image
              src="/historia/historia1.jpg"
              alt="Historia de Yeguada Agrado - Inicios"
              fill
              className="object-cover rounded-lg"
            />
          </div>
        </div>

        {/* Second row with image on left, text on right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative h-96 w-full order-last lg:order-first">
            <Image
              src="/historia/historia2.jpg"
              alt="Historia de Yeguada Agrado - Crecimiento"
              fill
              className="object-cover rounded-lg"
            />
          </div>
          <div>
            <p className="text-primary mb-4">
              Cinco años después de la adquisición de ese primer terreno con principio recreativo, la Yeguada Agrado ha crecido exponencialmente hasta convertirse en <strong>uno de los centros de cría y recuperación de caballos de carreras más importantes del país</strong>, con unas instalaciones de <strong>50 hectáreas</strong>, 2 patios de cuadras, más de 30 boxes, caminador, pista de pre-training, prados de descanso, …
            </p>
            <p className="text-primary mb-4">
              Un <strong>proyecto joven y ambicioso</strong> que empezó desde cero con el objetivo de <strong>fortalecer y fomentar la cría y las carreras de caballos en España</strong>, basado en el respeto, admiración y cariño por el purasangre inglés, protagonista en nuestros hipódromos y que permite disfrutar de uno de los deportes más espectaculares del mundo.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
