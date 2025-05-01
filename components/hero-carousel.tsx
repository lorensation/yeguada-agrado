"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0)

  const slides = [
    {
      image: "/hero/hero1.jpg",
      title: "Bienvenidos a Yeguada Agrado",
      description: "Tradición y excelencia en la cría de caballos de pura raza",
    },
    {
      image: "/hero/hero2.jpg",
      title: "Bienvenidos a Yeguada Agrado",
      description: "Tradición y excelencia en la cría de caballos de pura raza",
    },
    {
      image: "/hero/hero3.jpg",
      title: "Sementales de Primera Calidad",
      description: "Ejemplares seleccionados para garantizar la mejor genética",
    },
    {
      image: "/hero/hero4.jpeg",
      title: "Servicios Profesionales",
      description: "Cría, doma y cuidados con los más altos estándares",
    },
    {
      image: "/hero/hero5.jpeg",
      title: "Servicios Profesionales",
      description: "Cría, doma y cuidados con los más altos estándares",
    },
    {
      image: "/hero/hero6.jpg",
      title: "Servicios Profesionales",
      description: "Cría, doma y cuidados con los más altos estándares",
    },
  ]

  const nextSlide = () => {
    setCurrent(current === slides.length - 1 ? 0 : current + 1)
  }

  const prevSlide = () => {
    setCurrent(current === 0 ? slides.length - 1 : current - 1)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => clearInterval(interval)
  }, [current])

  return (
    <div className="relative h-[70vh] md:h-[85vh] lg:h-[90vh] w-full overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image src={slide.image || "/placeholder.svg"} alt={slide.title} fill priority className="object-cover" />
          {/*<div className="absolute inset-0 bg-black bg-opacity-40" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
            <h1 className="text-4xl md:text-6xl font-bold text-gold mb-4">{slide.title}</h1>
            <p className="text-xl md:text-2xl text-white max-w-3xl">{slide.description}</p>
          </div>*/}
        </div>
      ))}

      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 rounded-full p-2 text-white hover:bg-opacity-75 transition-all z-10"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-8 w-8" />
      </button>

      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 rounded-full p-2 text-white hover:bg-opacity-75 transition-all z-10"
        onClick={nextSlide}
      >
        <ChevronRight className="h-8 w-8" />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${index === current ? "bg-gold" : "bg-white bg-opacity-50"}`}
            onClick={() => setCurrent(index)}
          />
        ))}
      </div>
    </div>
  )
}
