import HistoriaSection from "@/components/sections/historia-section"
import InstalacionesSection from "@/components/sections/instalaciones-section"

export default function Yeguada() {
  return (
    <div className="flex flex-col gap-16 pb-16">
      <div className="container mx-auto px-4">
        <HistoriaSection />
        <InstalacionesSection />
      </div>
    </div>
  )
}