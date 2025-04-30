"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? "bg-background/90 backdrop-blur-sm py-2" : "bg-transparent py-4"}`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="relative z-10">
          <Image
            src="/logo.jpg"
            alt="Yeguada Agrado"
            width={150}
            height={60}
            className="h-12 w-auto"
            style={{ height: "auto" }}
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          <div className="dropdown-trigger">
            <Link
              href="/"
              className={`nav-link text-white hover:text-gold transition-colors ${isActive("/") ? "active" : ""}`}
            >
              Yeguada
            </Link>
            <div className="dropdown absolute bg-background/95 backdrop-blur-sm mt-2 p-4 rounded-md shadow-lg">
              <div className="flex flex-col space-y-3">
                <Link href="/historia" className="text-white hover:text-gold transition-colors">
                  Historia
                </Link>
                <Link href="/instalaciones" className="text-white hover:text-gold transition-colors">
                  Instalaciones
                </Link>
                <Link href="/nacimientos" className="text-white hover:text-gold transition-colors">
                  Nacimientos
                </Link>
              </div>
            </div>
          </div>

          <div className="dropdown-trigger">
            <Link
              href="/sementales"
              className={`nav-link text-white hover:text-gold transition-colors ${isActive("/sementales") ? "active" : ""}`}
            >
              Sementales
            </Link>
            <div className="dropdown absolute bg-background/95 backdrop-blur-sm mt-2 p-4 rounded-md shadow-lg">
              <div className="flex flex-col space-y-3">
                <Link href="/sementales/bow-creek" className="text-white hover:text-gold transition-colors">
                  Bow Creek
                </Link>
                <Link href="/sementales/rodaballo" className="text-white hover:text-gold transition-colors">
                  Rodaballo
                </Link>
              </div>
            </div>
          </div>

          <div className="dropdown-trigger">
            <Link
              href="/servicios"
              className={`nav-link text-white hover:text-gold transition-colors ${isActive("/servicios") ? "active" : ""}`}
            >
              Servicios
            </Link>
            <div className="dropdown absolute bg-background/95 backdrop-blur-sm mt-2 p-4 rounded-md shadow-lg">
              <div className="flex flex-col space-y-3">
                <Link href="/servicios/cria" className="text-white hover:text-gold transition-colors">
                  Cría
                </Link>
                <Link href="/servicios/doma" className="text-white hover:text-gold transition-colors">
                  Doma
                </Link>
                <Link href="/servicios/pretraining" className="text-white hover:text-gold transition-colors">
                  Pretraining
                </Link>
                <Link href="/servicios/descanso" className="text-white hover:text-gold transition-colors">
                  Descanso
                </Link>
              </div>
            </div>
          </div>

          <Link
            href="/actualidad"
            className={`nav-link text-white hover:text-gold transition-colors ${isActive("/actualidad") ? "active" : ""}`}
          >
            Actualidad
          </Link>

          <Link
            href="/contacto"
            className={`nav-link text-white hover:text-gold transition-colors ${isActive("/contacto") ? "active" : ""}`}
          >
            Contacto
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button className="lg:hidden text-white z-10" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="fixed inset-0 bg-background/98 flex flex-col items-center justify-center lg:hidden z-0">
            <nav className="flex flex-col items-center space-y-6 text-lg">
              <Link
                href="/"
                className="text-white hover:text-gold transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Yeguada
              </Link>
              <Link
                href="/sementales"
                className="text-white hover:text-gold transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Sementales
              </Link>
              <Link
                href="/servicios"
                className="text-white hover:text-gold transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Servicios
              </Link>
              <Link
                href="/actualidad"
                className="text-white hover:text-gold transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Actualidad
              </Link>
              <Link
                href="/contacto"
                className="text-white hover:text-gold transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contacto
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
