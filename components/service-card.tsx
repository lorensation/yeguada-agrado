"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"

interface ServiceCardProps {
  title: string
  description: string
  image: string
  id: string
}

export default function ServiceCard({ title, description, image, id }: ServiceCardProps) {
  const handleScroll = () => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-primary bg-opacity-10 rounded-lg overflow-hidden">
      <div className="relative h-80 w-full">
        <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover" />
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-bold text-primary hover:text-gold mb-4">{title}</h3>
        <p className="text-primary mb-4">{description}</p>
        <Button 
          onClick={handleScroll}
          className="bg-primary hover:bg-primary/80 text-white py-2 px-6 rounded-md transition-colors"
        >
          Más Información
        </Button>
      </div>
    </div>
  )
}
