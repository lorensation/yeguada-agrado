"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel"
import { Separator } from "@/components/ui/separator"
import OptimizedVideo from "@/components/optimized-video"
import { Button } from "./ui/button"

interface Produccion {
  nombre: string
  año: string
  origen: string
  ganancias: string
  victorias: string
  logros: string[]
  imagen?: string
}

interface Palmares {
  edad: string
  logros: string[]
  imagen?: string
}

interface SementalTabsProps {
  semental: {
    id: string
    name: string
    profile: string
    breed: string
    color: string
    height: string
    born: string
    origin: string
    achievements: string[]
    palmares?: Palmares[]
    producciones?: Produccion[]
    image: string
    videoUrl?: string
    testimonial?: string
    images?: string[]
  }
}

export default function SementalTabs({ semental }: SementalTabsProps) {
  const [activeTab, setActiveTab] = useState("perfil")
  const [stickyNav, setStickyNav] = useState(false)
  
  // References to each section
  const sectionRefs = {
    perfil: useRef<HTMLDivElement>(null),
    "ficha-origen": useRef<HTMLDivElement>(null),
    palmares: useRef<HTMLDivElement>(null),
    producciones: useRef<HTMLDivElement>(null),
    galeria: useRef<HTMLDivElement>(null),
  }

  const tabs = [
    { id: "perfil", label: "Perfil" },
    { id: "ficha-origen", label: "Ficha de Origen" },
    { id: "palmares", label: "Palmarés" },
    { id: "producciones", label: "Mejores Producciones" },
    { id: "galeria", label: "Galería" },
  ]

  // Handle scroll event to update active tab based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      // Make the tab navigation sticky when scrolled past hero
      const scrollPosition = window.scrollY

      // Check if we should activate the sticky nav (when tab nav is at top of viewport)
      const navElement = document.getElementById('semental-tabs-nav')
      if (navElement) {
        const navPosition = navElement.getBoundingClientRect().top
        setStickyNav(navPosition <= 0)
      }

      // Update active tab based on which section is most visible
      let currentSection = "perfil"
      
      for (const [id, ref] of Object.entries(sectionRefs)) {
        if (ref.current) {
          const element = ref.current
          const rect = element.getBoundingClientRect()
          
          // If the section is in view (with some buffer for better UX)
          if (rect.top <= 150 && rect.bottom > 150) {
            currentSection = id
            break
          }
        }
      }
      
      setActiveTab(currentSection)
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // Scroll to section when tab is clicked
  const scrollToSection = (id: string) => {
    setActiveTab(id)
    
    const sectionRef = sectionRefs[id as keyof typeof sectionRefs]
    
    if (sectionRef?.current) {
      const yOffset = -100 // Offset to account for sticky header
      const y = sectionRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset
      
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  // Fallback images for sections that don't have custom images
  const defaultImages = {
    palmares: `/sementales/${semental.id.toLowerCase()}/palmares.jpg`,
    producciones: `/sementales/${semental.id.toLowerCase()}/producciones.jpg`,
    galeria: [
      `/sementales/${semental.id.toLowerCase()}/${semental.id.toLowerCase()}1.jpg`,
      `/sementales/${semental.id.toLowerCase()}/${semental.id.toLowerCase()}2.jpg`,
      `/sementales/${semental.id.toLowerCase()}/${semental.id.toLowerCase()}3.jpg`,
      `/sementales/${semental.id.toLowerCase()}/${semental.id.toLowerCase()}4.jpg`,
      `/sementales/${semental.id.toLowerCase()}/${semental.id.toLowerCase()}5.jpg`,
      `/sementales/${semental.id.toLowerCase()}/${semental.id.toLowerCase()}6.jpg`,
      `/sementales/${semental.id.toLowerCase()}/${semental.id.toLowerCase()}7.jpg`,
    ]
  }

  const defaultProfileImage = `/sementales/${semental.id.toLowerCase()}/perfil.jpg`

  // Use provided images or fallback to placeholders
  const galleryImages = semental.images || 
    defaultImages.galeria.map((img, i) => img || `/placeholder.svg?height=600&width=800&query=${semental.name} ${i+1}`)

  return (
    <>
      {/* Tabs Navigation */}
      <div id="semental-tabs-nav" className={`bg-primary/10 border-t border-b border-gray-800 transition-all duration-300 ${stickyNav ? "sticky top-0 z-40 shadow-md" : ""}`}>
        <div className="container mx-auto">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`px-6 py-4 text-center whitespace-nowrap font-medium transition-colors ${
                  activeTab === tab.id 
                    ? "bg-gold/20 text-primary border-b-2 border-gold font-bold" 
                    : "text-primary hover:text-gold hover:bg-gold/10"
                }`}
                onClick={() => scrollToSection(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="container mx-auto">
        {/* Perfil Section */}
        <div ref={sectionRefs.perfil} id="perfil" className="px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            <div className="md:col-span-3">
              <h3 className="text-4xl font-bold text-primary mb-6">{semental.name}</h3>
              <div className="text-primary mb-6 whitespace-pre-line">{semental.profile}</div>

              {semental.testimonial && (
                <div className="mt-8 p-6 border-l-4 border-gold">
                  <p className="text-primary italic">{semental.testimonial}</p>
                </div>
              )}
            </div>
            <div className="md:col-span-2 relative h-80 md:h-auto rounded-lg overflow-hidden">
              <Image src={defaultProfileImage || "/placeholder.svg"} alt={semental.name} fill className="object-cover" />
            </div>
          </div>
          
          {semental.videoUrl && (
            <div className="mt-12">
              <h4 className="text-2xl font-bold text-primary mb-4">VIDEO</h4>
              <OptimizedVideo
                src={semental.videoUrl}
                poster={`/sementales/${semental.id.toLowerCase()}/poster.jpeg`}
                aspectRatio="16:9"
                controls={true}
                preload="metadata"
                muted={false}
                className="max-w-4xl mx-auto"
              />
            </div>
          )}
          
          <Separator className="my-8 bg-contrast/30" />
        </div>

        {/* Ficha de Origen Section */}
        <div ref={sectionRefs["ficha-origen"]} id="ficha-origen" className="px-4 py-8">
          <h3 className="text-4xl font-bold text-primary mb-6">Pedigree</h3>
          
          {/* Full-width genealogy image */}
          <div className="mb-8 border border-contrast/20 rounded-lg overflow-hidden">
            <div className="relative w-full h-[300px] md:h-[400px]">
              <Image 
                src={`/sementales/${semental.id.toLowerCase()}/${semental.id.toLowerCase()}-genealogy.jpg`}
                alt="Genealogía"
                fill
                className="object-contain p-3"
              />
            </div>
          </div>
          
          {/* Full-width ficha preview image */}
          <div className="mb-8 border border-contrast/20 rounded-lg overflow-hidden">
            <div className="p-4 border-t border-contrast/20">
              <h4 className="text-xl font-semibold text-primary text-center">Vista previa del pedigree completo</h4>
            </div>
            <div className="relative w-full h-[400px] md:h-[2000px]">
              <Image 
                src={`/sementales/${semental.id.toLowerCase()}/ficha-${semental.id.toLowerCase()}.png`}
                alt="Vista previa de pedigree"
                fill
              />
            </div>
          </div>
          
          {/* Centered download button */}
          <div className="flex flex-col items-center justify-center mb-8">
            <div className="text-center max-w-lg mb-6">
              <p className="text-primary">Descargue el pedigree completo de {semental.name} con información detallada sobre sus orígenes y línea genética.</p>
            </div>
            
            <Button
              onClick={() => window.open(`/sementales/${semental.id.toLowerCase()}/pedigree.pdf`, "_blank")}
              className="bg-gold hover:bg-gold/80 text-white py-4 px-10 rounded-md transition-all transform hover:scale-105 flex items-center justify-center gap-3 shadow-md"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              Descargar PDF
            </Button>
          </div>
          
          <Separator className="my-8 bg-contrast/30" />
        </div>

        {/* Palmarés Section */}
        <div ref={sectionRefs.palmares} id="palmares" className="px-4 py-8">
          <h3 className="text-4xl font-bold text-primary mb-6">Palmarés</h3>
          
          <div className="relative rounded-lg mb-20">
            {/* Content positioned on the left side (first quarter) */}
            <div className="absolute top-0 left-0 bottom-0 w-3/4 z-10 p-18">
              <div>
                {semental.palmares && semental.palmares.length > 0 ? (
                  <div className="space-y-2">
                    {semental.palmares.map((item, index) => (
                      <div key={index} className="pb-6 mb-6 last:mb-0">
                        <h4 className="text-2xl font-semibold text-primary mb-4">{item.edad}</h4>
                        <ul className="space-y-2">
                          {item.logros.map((logro, idx) => (
                            <li key={idx} className="flex items-start">
                              <span className="text-gold mr-2">•</span>
                              <span className="text-primary">{logro}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-primary font-medium text-lg">No hay información disponible sobre el palmarés de este semental.</p>
                )}
              </div>
            </div>
            
            {/* Background color for the text area (first quarter) */}
            <div className="absolute top-0 left-0 bottom-0 w-1/4 bg-white"></div>
            
            {/* Image container positioned to take up 3/4 of the width and start from the second quarter */}
            <div className="relative ml-0 w-full h-[600px]">
              <Image 
                src={defaultImages.palmares || `/placeholder.svg?height=800&width=1200&query=${semental.name} achievement`} 
                alt={`Palmarés de ${semental.name}`} 
                fill 
                className="object-cover" 
              />
              {/* Gradient overlay from left edge of image to maintain readability at the boundary */}
              <div 
                className="absolute inset-0" 
                style={{ 
                  background: 'linear-gradient(to right, rgba(255,255,255,0.7) 40%, rgba(255,255,255,0.3) 55%, rgba(255,255,255,0) 60%)' 
                }}
              ></div>
            </div>
          </div>
          
          <Separator className="my-8 bg-contrast/30" />
        </div>

        {/* Producciones Section */}
        <div ref={sectionRefs.producciones} id="producciones" className="px-4 py-8">
          <h3 className="text-4xl font-bold text-primary mb-6">Mejores Producciones</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="md:col-span-2">
              {semental.producciones && semental.producciones.length > 0 ? (
                <div className="space-y-8">
                  {semental.producciones.map((produccion, index) => (
                    <div key={index} className="border-b border-contrast/20 pb-6 mb-6 last:border-0">
                      <div className="flex gap-4">
                        <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                          <Image 
                            src={produccion.imagen || `/placeholder.svg?height=100&width=100&query=horse ${produccion.nombre}`} 
                            alt={produccion.nombre}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-grow">
                          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
                            <h4 className="text-2xl font-semibold text-primary">
                              {produccion.nombre}, {produccion.año}
                            </h4>
                            <p className="text-gold">{produccion.ganancias}</p>
                          </div>
                          <p className="text-primary mb-2">{produccion.origen}</p>
                          <p className="text-primary mb-4">{produccion.victorias}</p>

                          <ul className="space-y-2">
                            {produccion.logros.map((logro, idx) => (
                              <li key={idx} className="flex items-start">
                                <span className="text-gold mr-2">•</span>
                                <span className="text-primary">{logro}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-primary">Debut como semental en 2025.</p>
              )}
            </div>
            <div className="relative h-80 md:h-auto rounded-lg overflow-hidden">
              <Image 
                src={defaultImages.producciones || `/placeholder.svg?height=400&width=300&query=${semental.name} offspring`} 
                alt={`Producciones de ${semental.name}`} 
                fill 
                className="object-cover" 
              />
            </div>
          </div>
          
          <Separator className="my-8 bg-contrast/30" />
        </div>

        {/* Galería Section - Transformed to Carousel */}
        <div ref={sectionRefs.galeria} id="galeria" className="px-4 py-8">
          <h3 className="text-4xl font-bold text-primary mb-6">Galería</h3>
          
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {galleryImages.map((image, index) => (
                <CarouselItem key={index} className="basis-full md:basis-1/2 lg:basis-1/3">
                  <div className="relative h-80 rounded-lg overflow-hidden">
                    <Image
                      src={image}
                      alt={`Imagen de ${semental.name} ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center gap-4 mt-8">
              <CarouselPrevious className="bg-contrast/10 hover:bg-contrast/20 text-primary border-primary" />
              <CarouselNext className="bg-contrast/10 hover:bg-contrast/20 text-primary border-primary" />
            </div>
          </Carousel>
        </div>
      </div>
    </>
  )
}
