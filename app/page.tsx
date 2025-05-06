import HeroCarousel from "@/components/hero-carousel"
import FeaturedQuote from "@/components/featured-quote"
import XTweetCarousel from "@/components/x-tweet-carousel"
import VideoCarousel from "@/components/video-carousel"
import Image from "next/image"
import Link from "next/link"

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
      
      {/* Sementales Section */}
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-primary text-center mb-10 hover:text-gold">Sementales</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Bow Creek */}
          <Link href="/sementales/bowcreek" className="group">
            <div className="relative h-[400px] w-full overflow-hidden rounded-lg">
              <Image
                src="/sementales/bowcreek/perfil.jpg"
                alt="Bow Creek"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0">
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gray-50 bg-opacity-30 backdrop-blur-sm">
                  <h3 className="text-3xl font-bold text-primary group-hover:text-gold">Bow Creek</h3>
                  <p className="text-lg text-primary">SHAMARDAL X BENEVENTA</p>
                </div>
              </div>
            </div>
          </Link>
          
          {/* Rodaballo */}
          <Link href="/sementales/rodaballo" className="group">
            <div className="relative h-[400px] w-full overflow-hidden rounded-lg">
              <Image
                src="/sementales/rodaballo/perfil.jpg"
                alt="Rodaballo"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0">
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gray-50 bg-opacity-30 backdrop-blur-sm">
                  <h3 className="text-3xl font-bold text-primary group-hover:text-gold">Rodaballo</h3>
                  <p className="text-lg text-primary">LOPE DE VEGA X SHORT AFFAIR</p>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
      
      {/* Video Carousel Section */}
      <div className="container mx-auto mt-20 px-4">
        <VideoCarousel 
          videos={[
            {
              url: "https://youtu.be/8idRNG0vjNg?si=ncfKXxJl7LL4oW88",
              title: "Yeguada Agrado - Instalaciones"
            },
            {
              url: "https://youtu.be/vLICvA4nNpI?si=vzPkYCr5akPz_gnX",
              title: "Yeguada Agrado - Sementales"
            },
            {
              url: "https://youtu.be/LqYRUVWlUBw?si=XWAbucNqrL8XYCLz",
              title: "Yeguada Agrado - Nacimientos"
            }
          ]}
          className="mb-8"
        />
      </div>
      
      <div className="container mx-auto px-4">
        <XTweetCarousel />
      </div>
    </div>
  )
}
