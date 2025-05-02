import HeroCarousel from "@/components/hero-carousel"
import FeaturedQuote from "@/components/featured-quote"
import NacimientosSection from "@/components/sections/nacimientos-section"

export default function Home() {
  return (
    <div className="flex flex-col gap-16 pb-16">
      <HeroCarousel />
      <FeaturedQuote 
        quote={<>
          Tras más de 15 años en el mundo de la competición como propietario, en 2020 decidí cerrar el círculo y comenzar a vivir en primera persona el apasionante mundo de la cría del pura sangre inglés.
          <br /><br />
          Con la familia como principal puntal, decidimos comprar una primera finca y comenzar este bonito proyecto con una primera yegua.
          <br /><br />
          Desde entonces, la pasión por la cria ha superado las más altas expectativas hasta llegar a ser base fundamental de nuestra continuidad en la competición.
        </>}
        author="Miguel Redondo"
      />
      <div className="container mx-auto px-4">
        <NacimientosSection />
      </div>
    </div>
  )
}
