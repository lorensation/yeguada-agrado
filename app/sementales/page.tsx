import Link from "next/link"
import Image from "next/image"
import PageHeader from "@/components/page-header"

export default function SementalesPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <PageHeader title="Nuestros Sementales" />

      <div className="mt-12 space-y-16 mx-5">
        {/* Bow Creek */}
        <Link href="/sementales/bowcreek" className="group">
          <div className="relative mb-10 h-[600px] w-full overflow-hidden rounded-lg">
            <Image
              src="/sementales/bowcreek/perfil.jpg"
              alt="Bow Creek"
              fill
              className="object-cover object-[20%_center] sm:object-center transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0">
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gray-50 bg-opacity-30 backdrop-blur-sm">
                <h3 className="text-3xl font-bold text-primary group-hover:text-gold">Bow Creek</h3>
                <p className="text-lg text-primary">SHAMARDAL X BENEVENTA</p>
                <p className="text-lg text-primary">2.500€ PV</p>
              </div>
            </div>
          </div>
        </Link>

        {/* Rodaballo */}
        <Link href="/sementales/rodaballo" className="group">
            <div className="relative h-[600px] w-full overflow-hidden rounded-lg">
              <Image
                src="/sementales/rodaballo/perfil.jpg"
                alt="Rodaballo"
                fill
                className="object-cover object-[20%_center] sm:object-center transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0">
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gray-50 bg-opacity-30 backdrop-blur-sm">
                  <h3 className="text-3xl font-bold text-primary group-hover:text-gold">Rodaballo</h3>
                  <p className="text-lg text-primary">LOPE DE VEGA X SHORT AFFAIR</p>
                  <p className="text-lg text-primary">2.000€ PV</p>
                </div>
              </div>
            </div>
          </Link>
      </div>
    </div>
  )
}
