import PageHeader from "@/components/page-header"
import ContactForm from "@/components/contact-form"
import { MapPin, Phone, Mail } from "lucide-react"

export default function ContactoPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <PageHeader title="Contacto" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
        <div>
          <h2 className="text-2xl font-bold text-gold mb-6">Información de Contacto</h2>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <MapPin className="w-6 h-6 text-primary mt-1" />
              <div>
                <h3 className="font-semibold">Dirección</h3>
                <p className="text-gray-300">Carretera de Ejemplo, Km 5</p>
                <p className="text-gray-300">28000 Madrid, España</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Phone className="w-6 h-6 text-primary mt-1" />
              <div>
                <h3 className="font-semibold">Teléfono</h3>
                <p className="text-gray-300">+34 91 123 45 67</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Mail className="w-6 h-6 text-primary mt-1" />
              <div>
                <h3 className="font-semibold">Email</h3>
                <p className="text-gray-300">info@yeguadaagrado.es</p>
              </div>
            </div>
          </div>

          <div className="mt-8 h-64 bg-gray-800 rounded-lg">
            {/* Aquí iría un mapa */}
            <div className="w-full h-full flex items-center justify-center">
              <p className="text-gray-400">Mapa de ubicación</p>
            </div>
          </div>
        </div>

        <ContactForm />
      </div>
    </div>
  )
}
