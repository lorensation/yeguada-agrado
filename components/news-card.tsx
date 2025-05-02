import Image from "next/image"
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface NewsCardProps {
  title: string
  date: string | Date
  summary: string
  image: string
  slug?: string
}

export default function NewsCard({ title, date, summary, image, slug }: NewsCardProps) {
  // Format date whether it's a Date object or ISO string
  const formattedDate = format(new Date(date), "d 'de' MMMM 'de' yyyy", { locale: es });

  return (
    <div className="bg-primary bg-opacity-10 rounded-lg overflow-hidden h-full flex flex-col">
      <div className="relative h-48 w-full">
        <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover" />
      </div>
      <div className="p-6 flex-grow flex flex-col">
        <div className="text-sm text-gray-400 mb-2">{formattedDate}</div>
        <h3 className="text-xl font-bold text-primary hover:text-gold mb-3">{title}</h3>
        <p className="text-primary mb-4 flex-grow">{summary}</p>
        <div className="mt-auto">
          {slug ? (
            <Link href={`/actualidad/${slug}`}>
              <Button className="bg-primary hover:bg-primary/80 text-white py-2 px-4 rounded-md transition-colors text-sm">
                Leer Más
              </Button>
            </Link>
          ) : (
            <Button className="bg-primary hover:bg-primary/80 text-white py-2 px-4 rounded-md transition-colors text-sm" disabled>
              Leer Más
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
