import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-background border-t border-gray-800 pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-gold font-bold text-lg mb-4">Yeguada Agrado</h3>
            <p className="text-gray-300 mb-4">Dedicados a la cría y doma de caballos de alta calidad desde 1985.</p>
            <div className="flex space-x-4">
              <Link href="#" className="text-white hover:text-gold transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-white hover:text-gold transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-white hover:text-gold transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-gold font-bold text-lg mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-gold transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/sementales" className="text-gray-300 hover:text-gold transition-colors">
                  Sementales
                </Link>
              </li>
              <li>
                <Link href="/servicios" className="text-gray-300 hover:text-gold transition-colors">
                  Servicios
                </Link>
              </li>
              <li>
                <Link href="/actualidad" className="text-gray-300 hover:text-gold transition-colors">
                  Actualidad
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="text-gray-300 hover:text-gold transition-colors">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-gold font-bold text-lg mb-4">Contacto</h3>
            <address className="not-italic text-gray-300 space-y-2">
              <p>Carretera de Ejemplo, Km 5</p>
              <p>28000 Madrid, España</p>
              <p>Teléfono: +34 91 123 45 67</p>
              <p>Email: info@yeguadaagrado.es</p>
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
