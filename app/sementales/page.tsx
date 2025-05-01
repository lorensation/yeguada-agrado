import PageHeader from "@/components/page-header"
import SementalCard from "@/components/semental-card"

export default function SementalesPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <PageHeader title="Sementales" />

      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gold mb-8">Bow Creek</h2>
        <SementalCard
          name="Bow Creek"
          image="/semental-imponente.png"
          description="Semental de pura raza con excelente linaje y características excepcionales."
        />
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-bold text-gold mb-8">Rodaballo</h2>
        <SementalCard
          name="Rodaballo"
          image="/semental-imponente.png"
          description="Semental destacado por su temperamento y cualidades físicas superiores."
        />
      </div>
    </div>
  )
}
