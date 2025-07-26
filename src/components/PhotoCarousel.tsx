import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Photo {
  src: string;
  caption: string;
}

interface PhotoCarouselProps {
  photos: Photo[];
}

const PhotoCarousel = ({ photos }: PhotoCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState<Set<number>>(new Set());

  // Preload images for smooth transitions
  useEffect(() => {
    photos.forEach((photo, index) => {
      const img = new Image();
      img.onload = () => {
        setImagesLoaded(prev => new Set(prev).add(index));
      };
      img.src = photo.src;
    });
  }, [photos]);

  useEffect(() => {
    if (!isAutoPlay) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % photos.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [isAutoPlay, photos.length]);

  const nextPhoto = () => {
    setCurrentIndex((prev) => (prev + 1) % photos.length);
    setIsAutoPlay(false);
  };

  const prevPhoto = () => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
    setIsAutoPlay(false);
  };

  if (photos.length === 0) return null;

  return (
    <div className="relative w-full max-w-2xl mx-auto bg-card rounded-3xl shadow-romantic overflow-hidden">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={photos[currentIndex].src}
          alt={photos[currentIndex].caption}
          className="w-full h-full object-cover transition-all duration-300 ease-out"
          loading="lazy"
          decoding="async"
        />
        
        {/* Navigation buttons */}
        <Button
          variant="secondary"
          size="icon"
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm shadow-soft hover:scale-110 transition-all duration-200"
          onClick={prevPhoto}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        
        <Button
          variant="secondary"
          size="icon"
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm shadow-soft hover:scale-110 transition-all duration-200"
          onClick={nextPhoto}
        >
          <ChevronRight className="h-5 w-5" />
        </Button>

        {/* Photo indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {photos.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'bg-primary scale-125' : 'bg-background/50'
              }`}
              onClick={() => {
                setCurrentIndex(index);
                setIsAutoPlay(false);
              }}
            />
          ))}
        </div>
      </div>

      {/* Caption */}
      <div className="p-6 text-center">
        <p className="text-lg text-foreground/80 font-script">
          {photos[currentIndex].caption}
        </p>
        <Heart className="w-5 h-5 text-primary mx-auto mt-2 animate-heartbeat" fill="currentColor" />
      </div>
    </div>
  );
};

export default PhotoCarousel;