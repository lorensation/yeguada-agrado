import HeroCarousel from "@/components/hero-carousel"
import HistoriaSection from "@/components/sections/historia-section"
import InstalacionesSection from "@/components/sections/instalaciones-section"
import NacimientosSection from "@/components/sections/nacimientos-section"

export default function Home() {
  return (
    <div className="flex flex-col gap-16 pb-16">
      <HeroCarousel />
      <div className="container mx-auto px-4">
        <HistoriaSection />
        <InstalacionesSection />
        <NacimientosSection />
      </div>
    </div>
  )
}
