import PageHeader from "@/components/page-header"
import ContactForm from "@/components/contact-form"
import { MapPin, Phone, Mail } from "lucide-react"
import Image from "next/image"

export default function ContactoPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <PageHeader title="Contacto" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
        <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-primary mb-6 transition-colors relative after:content-[''] after:block after:w-16 after:h-1 after:bg-gold after:mt-2">Información de Contacto</h2>

          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="bg-primary rounded-full p-2 text-white">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-contrast">Dirección</h3>
                <p className="text-gray-700 dark:text-gray-300">Carretera M507, km. 20, 500</p>
                <p className="text-gray-700 dark:text-gray-300">28620 Aldea del Fresno, Madrid</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-primary rounded-full p-2 text-white">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-contrast hover:text-gold"><a href="https://wa.me/34616053904">Teléfono</a></h3>
                <p className="text-gray-700 dark:text-gray-300 hover:text-gold"><a href="https://wa.me/34616053904">+34 616 05 39 04</a></p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-primary rounded-full p-2 text-white">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-contrast">Email</h3>
                <p className="text-gray-700 dark:text-gray-300">info@yeguada-agrado.es</p>
              </div>
            </div>
          </div>

          <div className="mt-10 h-64 bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-300 dark:border-gray-700">
            <div className="relative w-full h-full">
              <Image 
                src="/mapa.jpeg" 
                alt="Mapa de ubicación de Yeguada Agrado" 
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: 'cover' }}
                priority
                className="hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-lg shadow-md">
          <ContactForm />
        </div>
      </div>
    </div>
  )
}
