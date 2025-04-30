import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react"

const Footer = () => {
  return (
    <footer className="bg-primary py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center md:items-start">
            <Image src="/logo.jpg" alt="Yeguada Agrado" width={180} height={70} className="mb-4" />
            <p className="text-white/80 text-sm text-center md:text-left">
              Centro ecuestre especializado en cría, doma y servicios para caballos de alta calidad.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-gold font-semibold text-lg mb-4">Enlaces</h3>
            <div className="grid grid-cols-2 gap-x-8 gap-y-2">
              <Link href="/" className="text-white hover:text-gold transition-colors">
                Inicio
              </Link>
              <Link href="/sementales" className="text-white hover:text-gold transition-colors">
                Sementales
              </Link>
              <Link href="/servicios" className="text-white hover:text-gold transition-colors">
                Servicios
              </Link>
              <Link href="/actualidad" className="text-white hover:text-gold transition-colors">
                Actualidad
              </Link>
              <Link href="/contacto" className="text-white hover:text-gold transition-colors">
                Contacto
              </Link>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-gold font-semibold text-lg mb-4">Contacto</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Phone size={16} className="text-gold" />
                <span className="text-white">+34 123 456 789</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-gold" />
                <span className="text-white">info@yeguadaagrado.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-gold" />
                <span className="text-white">Madrid, España</span>
              </div>
              <div className="flex items-center gap-4 mt-4">
                <a href="#" className="text-white hover:text-gold transition-colors">
                  <Facebook size={20} />
                </a>
                <a href="#" className="text-white hover:text-gold transition-colors">
                  <Instagram size={20} />
                </a>
                <a href="#" className="text-white hover:text-gold transition-colors">
                  <Twitter size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center">
          <p className="text-white/60 text-sm">
            © {new Date().getFullYear()} Yeguada Agrado. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
