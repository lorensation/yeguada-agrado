"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, ChevronDown } from "lucide-react"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  const toggleDropdown = (menu: string) => {
    if (activeDropdown === menu) {
      setActiveDropdown(null)
    } else {
      setActiveDropdown(menu)
    }
  }

  const menuItems = [
    {
      name: "Yeguada",
      href: "/",
      dropdown: true,
      items: [
        { name: "Historia", href: "/#historia" },
        { name: "Instalaciones", href: "/#instalaciones" },
        { name: "Nacimientos", href: "/#nacimientos" },
      ],
    },
    {
      name: "Sementales",
      href: "/sementales",
      dropdown: true,
      items: [
        { name: "Bow Creek", href: "/sementales#bow-creek" },
        { name: "Rodaballo", href: "/sementales#rodaballo" },
      ],
    },
    {
      name: "Servicios",
      href: "/servicios",
      dropdown: true,
      items: [
        { name: "Cría", href: "/servicios#cria" },
        { name: "Doma", href: "/servicios#doma" },
        { name: "Pretraining", href: "/servicios#pretraining" },
        { name: "Descanso", href: "/servicios#descanso" },
      ],
    },
    { name: "Actualidad", href: "/actualidad", dropdown: false },
    { name: "Contacto", href: "/contacto", dropdown: false },
  ]

  return (
    <nav className="bg-background border-b border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center">
            <Image
              src="/placeholder.svg?height=50&width=50&query=horse logo"
              alt="Yeguada Agrado Logo"
              width={50}
              height={50}
              className="mr-3"
            />
            <span className="text-gold font-bold text-xl">Yeguada Agrado</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {menuItems.map((item) => (
              <div key={item.name} className="relative group">
                <Link href={item.href} className="text-white hover:text-gold transition-colors flex items-center">
                  {item.name}
                  {item.dropdown && <ChevronDown className="ml-1 h-4 w-4" />}
                </Link>

                {item.dropdown && (
                  <div className="absolute left-0 mt-2 w-48 bg-background border border-gray-800 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                    <div className="py-1">
                      {item.items?.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className="block px-4 py-2 text-sm text-white hover:bg-primary hover:text-white"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white hover:text-gold">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-background border-t border-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {menuItems.map((item) => (
              <div key={item.name}>
                <div
                  className="flex items-center justify-between px-3 py-2 text-white"
                  onClick={() => item.dropdown && toggleDropdown(item.name)}
                >
                  <Link
                    href={item.href}
                    className="block text-white hover:text-gold"
                    onClick={() => !item.dropdown && setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                  {item.dropdown && (
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${activeDropdown === item.name ? "rotate-180" : ""}`}
                    />
                  )}
                </div>

                {item.dropdown && activeDropdown === item.name && (
                  <div className="pl-4 pr-2 py-2 space-y-1 border-l border-gray-700 ml-3">
                    {item.items?.map((subItem) => (
                      <Link
                        key={subItem.name}
                        href={subItem.href}
                        className="block px-3 py-2 text-sm text-gray-300 hover:text-gold"
                        onClick={() => setIsOpen(false)}
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
