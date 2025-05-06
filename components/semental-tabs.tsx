"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel"
import { Separator } from "@/components/ui/separator"
import { Button } from "./ui/button"
import VideoCarousel from "./video-carousel"
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

interface VideoItem {
  url: string
  title?: string
  poster?: string
}

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
    fee?: string
    achievements: string[]
    palmares?: Palmares[]
    producciones?: Produccion[]
    image: string
    videoUrl?: string
    videos?: VideoItem[]
    testimonial?: string
    images?: string[]
  }
}

export default function SementalTabs({ semental }: SementalTabsProps) {
  const [activeTab, setActiveTab] = useState("perfil")
  const [stickyNav, setStickyNav] = useState(false)
  // New state for the image modal
  const [showImageModal, setShowImageModal] = useState(false)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  
  // References to each section
  const sectionRefs = {
    perfil: useRef<HTMLDivElement>(null),
    "ficha-origen": useRef<HTMLDivElement>(null),
    palmares: useRef<HTMLDivElement>(null),
    producciones: useRef<HTMLDivElement>(null),
    videos: useRef<HTMLDivElement>(null),
    galeria: useRef<HTMLDivElement>(null),
  }

  const tabs = [
    { id: "perfil", label: "Perfil" },
    { id: "ficha-origen", label: "Pedigree" },
    { id: "palmares", label: "Palmarés" },
    { id: "producciones", label: "Mejor Producción" },
    { id: "videos", label: "Vídeos" },
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
      `/sementales/${semental.id.toLowerCase()}/${semental.id.toLowerCase()}8.jpg`,
      `/sementales/${semental.id.toLowerCase()}/${semental.id.toLowerCase()}9.jpg`,
      `/sementales/${semental.id.toLowerCase()}/${semental.id.toLowerCase()}10.jpg`,
      `/sementales/${semental.id.toLowerCase()}/${semental.id.toLowerCase()}11.jpg`,
    ]
  }

  const defaultProfileImage = `/sementales/${semental.id.toLowerCase()}/perfil.jpg`

  // Use provided images or fallback to placeholders
  const galleryImages = semental.images || 
    defaultImages.galeria.map((img, i) => img || `/placeholder.svg?height=600&width=800&query=${semental.name} ${i+1}`)

  // Function to navigate to the previous image in the modal
  const prevImage = () => {
    setSelectedImageIndex((prev) => 
      prev === 0 ? galleryImages.length - 1 : prev - 1
    )
  }

  // Function to navigate to the next image in the modal
  const nextImage = () => {
    setSelectedImageIndex((prev) => 
      prev === galleryImages.length - 1 ? 0 : prev + 1
    )
  }

  // Add keyboard event handlers for the fullscreen image modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!showImageModal) return

      if (e.key === 'ArrowLeft') {
        prevImage()
      } else if (e.key === 'ArrowRight') {
        nextImage()
      } else if (e.key === 'Escape') {
        setShowImageModal(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [showImageModal])

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
      <div className="container mx-auto py-10">
        {/* Perfil Section */}
        <div ref={sectionRefs.perfil} id="perfil" className="px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Left side - Name and Profile Text */}
            <div className="md:col-span-5">
              <h1 className="text-5xl md:text-6xl font-bold text-contrast uppercase tracking-wide mb-6">{semental.name}</h1>
              
              <div className="text-primary text-lg mb-6 whitespace-pre-line pr-8">
                {semental.profile && semental.profile.split('\n').map((paragraph, idx) => {
                  // Process the paragraph to handle bold formatting
                  const parts = paragraph.split(/(\*\*.*?\*\*)/g);
                  
                  return (
                    <p key={idx} className="mb-4">
                      {parts.map((part, partIdx) => {
                        // Check if this part is bold (enclosed in **)
                        if (part.startsWith('**') && part.endsWith('**')) {
                          // Extract the text between ** and render it as bold
                          const boldText = part.substring(2, part.length - 2);
                          return <strong key={partIdx} className="font-bold">{boldText}</strong>;
                        }
                        return <span key={partIdx}>{part}</span>;
                      })}
                    </p>
                  );
                })}
              </div>

              {semental.achievements && semental.achievements.length > 0 && (
                <div className="mt-6">
                  <h4 className="text-xl font-bold text-gold mb-4">LOGROS DESTACADOS</h4>
                  <ul className="list-none space-y-2">
                    {semental.achievements.map((achievement, idx) => (
                      <li key={idx} className="flex items-baseline">
                        <span className="text-gold mr-2 text-lg">•</span>
                        <span className="text-primary">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {/* Testimonial */}
              {semental.testimonial && (
                <div className="p-4 border-l-4 border-gold bg-primary/5 flex items-center gap-4">
                  <div className="relative h-14 w-14 rounded-full overflow-hidden flex-shrink-0 border-2 border-gold">
                    <Image 
                      src={`/sementales/${semental.id.toLowerCase()}/testimonial-avatar.jpg`}
                      alt="Testimonial"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-primary italic text-lg">{semental.testimonial}</p>
                  </div>
                </div>
              )}
            </div>
            
            {/* Right side - Image and Details */}
            <div className="md:col-span-7 flex flex-col">
              <div className="relative w-full h-[400px] md:h-[500px] rounded-lg overflow-hidden shadow-lg mb-4">
                <Image 
                  src={defaultProfileImage || "/placeholder.svg"} 
                  alt={semental.name} 
                  fill 
                  className="object-cover" 
                  priority
                />
              </div>
              
              {/* Details under the image */}
              <div className="bg-primary/5 p-4 rounded-lg mb-4">
                {semental.origin && (
                  <div className="mb-2">
                    <span className="text-primary font-bold text-xl italic">{semental.origin}</span>
                  </div>
                )}
                
                <div className="grid grid-cols-2 gap-2">
                  {semental.born && semental.height && (
                    <div>
                      <span className="text-primary font-bold mx-2">Año de nacimiento:</span>
                      <span className="text-primary">{semental.born}</span>
                      <span className="text-primary font-bold mx-2">|</span>
                      <span className="text-primary font-bold mx-2">Alzada:</span>
                      <span className="text-primary">{semental.height}</span>
                    </div>
                  )}
                  {semental.fee && (
                    <div className="col-span-2 mt-2">
                      <span className="text-primary font-bold mx-2">Fee 2025:</span>
                      <span className="text-primary">{semental.fee}</span>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mb-4">
                <Link href={"/contacto"} className="w-full sm:flex-1">
                  <Button
                    className="w-full bg-primary hover:bg-primary/80 text-white py-3 px-4 rounded-md transition-all flex items-center justify-center gap-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                    Contáctanos para más información
                  </Button>
                </Link>
                <Button
                  onClick={() => window.open(`/sementales/${semental.id.toLowerCase()}/pedigree.pdf`, "_blank")}
                  className="w-full sm:flex-1 bg-gold hover:bg-gold/80 text-white py-3 px-4 rounded-md transition-all flex items-center justify-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                  Descargar PDF del Pedigree
                </Button>
              </div>
            </div>
          </div>
          
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
          
          <div className="flex flex-col lg:relative lg:rounded-lg mb-8 lg:mb-20">
            {/* Content first on mobile, positioned on desktop */}
            <div className="w-full mb-6 lg:absolute lg:top-0 lg:left-0 lg:bottom-0 lg:w-3/4 lg:z-10 lg:p-18 lg:mb-0">
              <div>
                {semental.palmares && semental.palmares.length > 0 ? (
                  <div className="space-y-2">
                    {semental.palmares.map((item, index) => (
                      <div key={index} className="pb-6 mb-6 last:mb-0">
                        <h4 className="text-2xl font-semibold text-primary mb-4">
                          {item.edad}
                          {semental.id === "rodaballo" && item.edad === "A 4 años" && (
                            <span className="inline-flex items-center ml-3 text-gold">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 mr-1">
                                <path fillRule="evenodd" d="M5.166 2.621v.858c-1.035.148-2.059.33-3.071.543a.75.75 0 0 0-.584.859 6.753 6.753 0 0 0 6.138 5.6 6.73 6.73 0 0 0 2.743 1.346A6.707 6.707 0 0 1 9.279 15H8.54c-1.036 0-1.875.84-1.875 1.875V19.5h-.75a2.25 2.25 0 0 0-2.25 2.25c0 .414.336.75.75.75h15a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-2.25-2.25h-.75v-2.625c0-1.036-.84-1.875-1.875-1.875h-.739a6.706 6.706 0 0 1-1.112-3.173 6.73 6.73 0 0 0 2.743-1.347 6.753 6.753 0 0 0 6.139-5.6.75.75 0 0 0-.585-.858 47.077 47.077 0 0 0-3.07-.543V2.62a.75.75 0 0 0-.658-.744 49.22 49.22 0 0 0-6.093-.377c-2.063 0-4.096.128-6.093.377a.75.75 0 0 0-.657.744Zm0 2.629c0 1.196.312 2.32.857 3.294A5.266 5.266 0 0 1 3.16 5.337a45.6 45.6 0 0 1 2.006-.343v.256Zm13.5 0v-.256c.674.1 1.343.214 2.006.343a5.265 5.265 0 0 1-2.863 3.207 6.72 6.72 0 0 0 .857-3.294Z" clipRule="evenodd" />
                              </svg>
                              <span className="font-bold">Mejor Caballo del Año</span>
                            </span>
                          )}
                        </h4>
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
            
            {/* Background color for the text area on desktop only */}
            <div className="hidden lg:block lg:absolute lg:top-0 lg:left-0 lg:bottom-0 lg:w-1/4 lg:bg-white"></div>
            
            {/* Image container - displayed below content on mobile, positioned on desktop */}
            <div className="w-full h-[800px] lg:relative lg:ml-[25%] lg:w-[75%] rounded-lg overflow-hidden">
              {/* Non-absolute positioning in mobile, absolute positioning only on larger screens */}
              <div className="relative w-full h-full lg:static">
                <Image 
                  src={defaultImages.palmares || `/placeholder.svg?height=800&width=1200&query=${semental.name}achievement`} 
                  alt={`Palmarés de ${semental.name}`}
                  className="object-cover"
                  width={1200}
                  height={800}
                  style={{ width: '100%', height: '100%' }}
                />
                {/* Gradient overlay only on desktop */}
                <div 
                  className="hidden lg:block lg:absolute lg:inset-0" 
                  style={{ 
                    background: 'linear-gradient(to right, rgba(255,255,255,1) 5%, rgba(255,255,255,0.3) 55%, rgba(255,255,255,0) 60%)' 
                  }}
                ></div>
              </div>
            </div>
          </div>
          
          <Separator className="my-8 bg-contrast/30" />
        </div>

        {/* Producciones Section */}
        <div ref={sectionRefs.producciones} id="producciones" className="px-4 py-8">
          <h3 className="text-4xl font-bold text-primary mb-6">Mejor Producción</h3>

          {semental.producciones && semental.producciones.length > 0 ? (
            <div className="space-y-12">
              {semental.producciones.map((produccion, index) => (
                <div key={index} className="border-b border-contrast/20 pb-10 mb-6 last:border-0">
                  <div className="flex flex-col md:flex-row gap-8">
                    {/* Larger image on the left */}
                    <div className="relative w-full md:w-1/3 h-64 md:h-80 rounded-lg overflow-hidden flex-shrink-0">
                      <Image 
                        src={produccion.imagen || `/placeholder.svg?height=400&width=400&query=horse ${produccion.nombre}`} 
                        alt={produccion.nombre}
                        fill
                        className="object-cover"
                      />
                    </div>
                    
                    {/* Details on the right, occupying more horizontal space */}
                    <div className="flex-grow pl-10 md:w-2/3">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
                        <h4 className="text-3xl font-semibold text-primary">
                          {produccion.nombre}, {produccion.año}
                        </h4>
                      </div>
                      <p className="text-lg text-primary mb-3">{produccion.origen}</p>
                      <p className="text-primary mb-6 font-medium">
                        <span className="text-lg">{produccion.victorias}</span>
                        <span className="text-xl font-semibold text-primary">- {produccion.ganancias}</span>
                      </p>
                      <ul className="space-y-3">
                        {produccion.logros.map((logro, idx) => (
                          <li key={idx} className="flex items-start text-lg">
                            <span className="text-gold mr-3 text-xl">•</span>
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
            <p className="text-lg text-primary">Debut como semental en 2025.</p>
          )}
          
          <Separator className="my-8 bg-contrast/30" />
        </div>
          
        {/* Videos Section */}
        <div ref={sectionRefs.videos} id="videos" className="px-4 py-8">
          <h3 className="text-4xl font-bold text-primary mb-6">Vídeos</h3>
          
          {semental.videos && semental.videos.length > 0 ? (
            <VideoCarousel videos={semental.videos} className="mb-8" />
          ) : semental.videoUrl ? (
            <div className="max-w-3xl mx-auto aspect-video mb-8">
              <iframe
                width="100%"
                height="100%"
                src={semental.videoUrl.replace("youtu.be/", "youtube.com/embed/").replace("?si=", "?").split("&")[0]}
                title={`Video de ${semental.name}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-lg shadow-lg"
              ></iframe>
            </div>
          ) : (
            <p className="text-primary mb-8">No hay videos disponibles para este semental.</p>
          )}
          
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
                  <div 
                    className="relative h-80 rounded-lg overflow-hidden cursor-pointer"
                    onClick={() => {
                      setSelectedImageIndex(index)
                      setShowImageModal(true)
                    }}
                  >
                    <Image
                      src={image}
                      alt={`Imagen de ${semental.name} ${index + 1}`}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
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

      {/* Fullscreen Image Modal */}
      <Dialog open={showImageModal} onOpenChange={setShowImageModal}>
        <DialogContent className="max-w-screen-lg p-0 w-[calc(100vw-32px)] h-[calc(100vh-32px)] border-none bg-transparent shadow-none">
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Image container */}
            <div className="relative w-full h-full flex items-center justify-center">
              {galleryImages.length > 0 && (
                <div className="relative w-full h-full flex items-center justify-center">
                  <div className="relative w-auto h-auto max-w-full max-h-full">
                    <Image
                      src={galleryImages[selectedImageIndex]}
                      alt={`Imagen de ${semental.name}`}
                      width={1200}
                      height={800}
                      className="object-contain rounded-md"
                      style={{ maxHeight: 'calc(100vh - 100px)' }}
                    />
                  </div>
                </div>
              )}
            </div>
            
            {/* Close button */}
            <button 
              onClick={() => setShowImageModal(false)}
              className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-all z-50"
              aria-label="Cerrar"
            >
              <X className="w-6 h-6" />
            </button>
            
            {/* Navigation controls */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-all z-50"
              aria-label="Anterior"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-all z-50"
              aria-label="Siguiente"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
            
            {/* Image counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
              {selectedImageIndex + 1} / {galleryImages.length}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
