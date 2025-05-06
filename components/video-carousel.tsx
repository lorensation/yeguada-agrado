import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel"

interface VideoItem {
  url: string
  title?: string
  poster?: string
}

interface VideoCarouselProps {
  videos: VideoItem[]
  title?: string
  className?: string
}

export default function VideoCarousel({ videos, title, className }: VideoCarouselProps) {
  // Function to convert YouTube URLs to embedded format and extract video ID
  const getYouTubeEmbedUrl = (url: string) => {
    // Extract the video ID from different YouTube URL formats
    const videoId = url.includes('youtu.be') 
      ? url.split('youtu.be/')[1].split('?')[0]
      : url.includes('youtube.com/watch') 
        ? url.split('v=')[1].split('&')[0] 
        : '';
    
    if (!videoId) return { embedUrl: "", posterUrl: "" };
    
    // Create thumbnail URL
    const posterUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    
    return {
      embedUrl: `https://www.youtube.com/embed/${videoId}`,
      posterUrl
    };
  };

  return (
    <div className={className}>
      {title && <h4 className="text-2xl font-bold text-primary mb-4">{title}</h4>}
      
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {videos.map((video, index) => {
            const { embedUrl } = getYouTubeEmbedUrl(video.url);
            return (
              <CarouselItem key={index} className="basis-full md:basis-1/2 lg:basis-1/3 p-2">
                <div className="relative h-60 md:h-72 rounded-lg overflow-hidden bg-black">
                  <iframe
                    width="100%"
                    height="100%"
                    src={embedUrl}
                    title={video.title || `Video ${index + 1}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="rounded-lg w-full h-full"
                  ></iframe>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <div className="flex justify-center gap-4 mt-8">
          <CarouselPrevious className="static bg-contrast/10 hover:bg-contrast/20 text-primary border-primary" />
          <CarouselNext className="static bg-contrast/10 hover:bg-contrast/20 text-primary border-primary" />
        </div>
      </Carousel>
    </div>
  )
}