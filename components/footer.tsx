import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-contrast border-t border-gray-800 pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="mb-4">
              <Image 
                src="/logo.jpg" 
                alt="Yeguada Agrado Logo" 
                width={120} 
                height={120} 
                className="rounded-lg object-cover"
              />
            </div>
            <h3 className="text-gold font-bold text-lg mb-4">Yeguada Agrado</h3>
            <p className="text-gray-300 mb-4">Dedicados a la cría y doma de caballos de alta calidad desde hace más de 15 años.</p>
            <div className="flex space-x-4">
              <Link href="https://www.instagram.com/yeguadaagrado" className="text-white hover:text-gold transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="https://x.com/yeguadaagrado" className="text-white hover:text-gold transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-gold font-bold text-lg mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-gold hover:underline transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/yeguada" className="text-gray-300 hover:text-gold hover:underline transition-colors">
                  Yeguada
                </Link>
              </li>
              <li>
                <Link href="/sementales" className="text-gray-300 hover:text-gold hover:underline transition-colors">
                  Sementales
                </Link>
              </li>
              <li>
                <Link href="/servicios" className="text-gray-300 hover:text-gold hover:underline transition-colors">
                  Servicios
                </Link>
              </li>
              <li>
                <Link href="/actualidad" className="text-gray-300 hover:text-gold hover:underline transition-colors">
                  Actualidad
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="text-gray-300 hover:text-gold hover:underline transition-colors">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-gold font-bold text-lg mb-4">Contacto</h3>
            <address className="not-italic text-gray-300 space-y-2">
              <p>Carretera M507, km. 20, 500</p>
              <p>28620 Aldea del Fresno, Madrid</p>
              <p><a href="https://wa.me/34616053904">Teléfono: +34 616 05 39 04</a></p>
              <p>Email: info@yeguada-agrado.es</p>
            </address>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Yeguada Agrado. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
