"use client"

import Image from "next/image"
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel"
import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function NacimientosSection() {
  const [isPaused, setIsPaused] = useState(false);
  const [api, setApi] = useState<any>();
  const [activeYear, setActiveYear] = useState<string>("2025");

  const nacimientosData = {
    "2025": [
      {
        name: "RULER OF THE WORLD X SAMAY",
        parentage: "(KENDARGENT)",
        sex: "M",
        color: "al",
        date: "23/02/2025",
        image: "/nacimientos/2025/samay.jpg",
        year: "2025",
      },
      {
        name: "BOW CREEK X QUICK ARTIST",
        parentage: "(DUTCH ART)",
        sex: "M",
        color: "cas",
        date: "10/03/2025",
        image: "/nacimientos/2025/quickartist.jpg",
        year: "2025",
      },
      {
        name: "BOW CREEK X MITRA",
        parentage: "(CARADAK)",
        sex: "H",
        color: "n",
        date: "21/03/2025",
        image: "/nacimientos/2025/mitra.jpg",
        year: "2025",
      },
      {
        name: "BOW CREEK X LADY MOON",
        parentage: "(LIGHTNING MOON)",
        sex: "H",
        color: "cas",
        date: "26/03/2025",
        image: "/nacimientos/2025/ladymoon.jpeg",
        year: "2025",
      },
      {
        name: "BOW CREEK X LINDA",
        parentage: "(HUNTER'S LIGHT)",
        sex: "H",
        color: "n",
        date: "30/03/2025",
        image: "/nacimientos/2025/linda.jpg",
        year: "2025",
      },
      {
        name: "RULER OF THE WORLD X CRUMBLECREEK",
        parentage: "(SIR PRANCELOT)",
        sex: "M",
        color: "cas",
        date: "07/04/2025",
        image: "/nacimientos/2025/crumblecreek.jpg",
        year: "2025",
      },
      {
        name: "BOW CREEK X MUSIQUE SACRÉE",
        parentage: "(DOCTOR DINO)",
        sex: "M",
        color: "cas",
        date: "10/04/2025",
        image: "/nacimientos/2025/musiquesacree.jpg",
        year: "2025",
      },
      {
        name: "BOW CREEK X STARLIGHT MYSTERY",
        parentage: "(IFRAAJ)",
        sex: "H",
        color: "cas",
        date: "14/04/2025",
        image: "/nacimientos/2025/starlightmistery.jpg",
        year: "2025",
      },
      {
        name: "ELZAAM X GALDANA",
        parentage: "(RIP VAN WINKEL)",
        sex: "M",
        color: "cas",
        date: "19/04/2025",
        image: "/nacimientos/2025/galdana.jpg",
        year: "2025",
      },
    ],
  };

  const nacimientos = nacimientosData[activeYear as keyof typeof nacimientosData] || [];
  const years = Object.keys(nacimientosData).sort().reverse();

  // Helper function to get color name in Spanish
  interface ColorsMap {
    [key: string]: string;
  }

  const getColorName = (colorCode: string): string => {
    const colors: ColorsMap = {
      al: "Alazán",
      cas: "Castaño",
      n: "Negro",
      tor: "Tordo",
    };
    return colors[colorCode] || colorCode;
  }

  useEffect(() => {
    if (!api) return;

    // Reset to first slide when changing year
    api.scrollTo(0);

    const autoplayInterval = setInterval(() => {
      if (!isPaused) {
        api.scrollNext();
      }
    }, 3000);

    return () => {
      clearInterval(autoplayInterval);
    };
  }, [api, isPaused, activeYear]);

  const handleYearChange = (year: string) => {
    setActiveYear(year);
  };

  return (
    <section id="nacimientos" className="py-16 w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 mb-10">
        <h2 className="text-3xl font-bold text-primary mb-6 text-center hover:text-gold">Últimos Nacimientos</h2>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 mb-6">
        <div className="flex justify-center space-x-4">
          {years.map((year) => (
            <Button
              key={year}
              variant={activeYear === year ? "default" : "outline"}
              onClick={() => handleYearChange(year)}
              className={`
                ${activeYear === year ? "bg-primary text-white hover:bg-primary/90" : "text-primary border-primary hover:bg-primary/10"}
                min-w-20
              `}
            >
              {year}
            </Button>
          ))}
        </div>
      </div>

      <div 
        className="w-full" 
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <Carousel
          opts={{
            align: "start",
            loop: true,
            slidesToScroll: 1,
          }}
          className="w-full"
          setApi={setApi}
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {nacimientos.length > 0 ? (
              nacimientos.map((item, index) => (
                <CarouselItem key={index} className="pl-2 md:pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/3">
                  <Card className="bg-contrast/5 rounded-lg overflow-hidden h-full flex flex-col">
                    <div className="relative h-72 w-full">
                      <Image 
                        src={item.image || "/placeholder.svg"} 
                        alt={item.name} 
                        fill 
                        className="object-cover" 
                      />
                    </div>
                    <CardContent className="p-4 flex-1 flex flex-col">
                      <h3 className="text-xl font-semibold text-primary">{item.name}</h3>
                      <p className="text-xl font-semibold text-primary">{item.parentage}</p>
                      <p className="text-contrast mb-1">
                        {item.sex === "M" ? "Macho" : "Hembra"} - {getColorName(item.color)}
                      </p>
                      <p className="text-contrast mt-auto">{item.date}</p>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))
            ) : (
              <CarouselItem className="pl-2 md:pl-4 basis-full">
                <div className="h-64 flex items-center justify-center text-contrast text-xl">
                  No hay nacimientos registrados para el año {activeYear}
                </div>
              </CarouselItem>
            )}
          </CarouselContent>
          {nacimientos.length > 3 && (
            <div className="flex justify-center gap-4 mt-8">
              <CarouselPrevious className="static translate-y-0 left-0 bg-contrast/10 hover:bg-contrast/20 text-primary border-primary" />
              <CarouselNext className="static translate-y-0 right-0 bg-contrast/10 hover:bg-contrast/20 text-primary border-primary" />
            </div>
          )}
        </Carousel>
      </div>
    </section>
  )
}
