"use client"

import Link from "next/link"
import Image from "next/image"
import PageHeader from "@/components/page-header"

export default function SementalesPage() {
  const sementales = [
    {
      id: "bowcreek",
      name: "BOW CREEK",
      tagline: "SHAMARDAL X BENEVENTA (MOST WELCOME)",
      fee: "2.500€ PV",
      year: "2023",
      image: "/sementales/bowcreek/hero.jpg",
      description: "Precocidad y velocidad asegurada",
    },
    {
      id: "rodaballo",
      name: "RODABALLO",
      tagline: "LOPE DE VEGA X SHORT AFFAIR (SINGSPIEL)",
      fee: "2.000€ PV",
      year: "2023",
      image: "/sementales/rodaballo/hero.jpg",
      description: "Uno de los mejores caballos del siglo XXI en España",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-16">
      <PageHeader title="Nuestros Sementales" />

      <div className="mt-12 space-y-16">
        {sementales.map((semental) => (
          <div key={semental.id} className="relative w-full overflow-hidden rounded-lg">
            <div className="relative h-[90vh] w-full">
              <Link href={`/sementales/${semental.id.toLowerCase()}`} className="block w-full h-full relative">
                <Image
                  src={`/sementales/${semental.id.toLowerCase()}/perfil.jpg`}
                  alt={semental.name}
                  fill
                  className="object-cover cursor-pointer"
                  priority
                />
              </Link>
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute bottom-0 left-0 right-0 p-2 md:p-6 bg-gray-50 bg-opacity-30 backdrop-blur-sm pointer-events-auto">
                  <h2 className="text-4xl md:text-6xl font-bold text-primary mb-2">{semental.name}</h2>
                  <p className="text-xl md:text-2xl text-primary mb-4">{semental.tagline}</p>
                  <p className="text-xl font-bold text-primary mb-6">{semental.fee}</p>

                  <div className="flex flex-wrap gap-4">
                    <Link
                      href={`/sementales/${semental.id}`}
                      className="bg-primary hover:bg-primary/80 text-white py-2 px-6 rounded-md transition-all hover:scale-105"
                    >
                      Ver Perfil
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
