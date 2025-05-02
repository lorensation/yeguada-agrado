import { Card } from "@/components/ui/card"
import Image from "next/image"

interface FeaturedQuoteProps {
  quote: React.ReactNode
  author: string
}

export default function FeaturedQuote({ quote, author }: FeaturedQuoteProps) {
  return (
    <div className="w-full mx-auto my-16 px-4">
      <Card className="bg-slate-50 border-none overflow-hidden shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-0">
          {/* Image section - takes up 2/5 of the width on desktop */}
          <div className="relative h-[300px] md:h-auto min-h-[400px] md:col-span-2 order-2 md:order-1">
            <Image 
              src="/inicio-miguel.jpg" 
              alt="Miguel Redondo" 
              fill 
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 40vw"
              priority
            />
          </div>
          
          {/* Text section - takes up 3/5 of the width on desktop */}
          <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center order-1 md:order-2 md:col-span-3">
            <div className="text-6xl text-slate-300 font-serif mb-6">"</div>
            <blockquote className="text-xl md:text-2xl font-light italic text-slate-700 leading-relaxed mb-8 max-w-3xl space-y-6">
              {quote}
            </blockquote>
            <div className="border-t border-slate-200 pt-6 mt-auto">
              <p className="text-slate-900 font-semibold text-xl">{author}</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}