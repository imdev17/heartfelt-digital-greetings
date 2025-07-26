import { Heart } from "lucide-react";
import PhotoCarousel from "@/components/PhotoCarousel";
import LoveLetter from "@/components/LoveLetter";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

// Import generated images
import coupleImage from "@/assets/couple-sunset.jpg";
import coffeeImage from "@/assets/coffee-date.jpg";
import picnicImage from "@/assets/picnic-memory.jpg";

const Surprise = () => {
  const navigate = useNavigate();
  const { ref: photosRef, hasIntersected: photosVisible } = useIntersectionObserver();
  const { ref: letterRef, hasIntersected: letterVisible } = useIntersectionObserver();
  const { ref: finalRef, hasIntersected: finalVisible } = useIntersectionObserver();

  // Sample photos for the carousel
  const photos = [
    {
      src: coupleImage,
      caption: "Our first sunset together... and every moment since has been magical ✨"
    },
    {
      src: coffeeImage,
      caption: "That little coffee shop where you said yes to being mine ☕️💕"
    },
    {
      src: picnicImage,
      caption: "Perfect days are made of simple moments with you 🌸"
    }
  ];

  // Sample love letter
  const loveLetterText = `My dearest love,

Every day with you feels like a beautiful dream that I never want to wake up from. You are the sunshine that brightens my darkest days, the melody that makes my heart sing, and the home I never knew I was searching for.

From the moment you walked into my life, everything changed. Your smile became my favorite sight, your laugh became my favorite sound, and your happiness became my greatest mission.

Today, as we celebrate another year of your wonderful existence, I want you to know that you are loved beyond measure. You are cherished, adored, and absolutely perfect just as you are.

Thank you for being you. Thank you for choosing us. Thank you for making every ordinary moment feel extraordinary.

Here's to another year of adventures, laughter, love, and countless beautiful memories together.`;

  const signature = "Your Forever Love";

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="container mx-auto px-4 py-12 space-y-20 relative z-10">
        
        {/* Back Button */}
        <div className="text-center">
          <Button
            onClick={() => navigate("/")}
            variant="outline"
            className="mb-8"
          >
            ← Back to Home
          </Button>
        </div>

        {/* Photo Memories Section */}
        <section 
          ref={photosRef}
          className={`transition-all duration-700 ${
            photosVisible ? 'animate-slide-up opacity-100' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-script text-primary mb-4">
              Our Beautiful Memories
            </h2>
            <p className="text-xl text-muted-foreground font-poppins">
              Some of my favorite moments with you 📸
            </p>
          </div>
          {photosVisible && <PhotoCarousel photos={photos} />}
        </section>

        {/* Love Letter Section */}
        <section 
          ref={letterRef}
          className={`transition-all duration-700 delay-300 ${
            letterVisible ? 'animate-slide-up opacity-100' : 'opacity-0 translate-y-10'
          }`}
        >
          {letterVisible && <LoveLetter letter={loveLetterText} signature={signature} />}
        </section>

        {/* Final Message */}
        <section 
          ref={finalRef}
          className={`text-center max-w-3xl mx-auto transition-all duration-700 delay-500 ${
            finalVisible ? 'animate-slide-up opacity-100' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="bg-gradient-heart p-12 rounded-3xl shadow-romantic">
            <Heart className="w-16 h-16 text-primary-foreground mx-auto mb-6 animate-heartbeat" fill="currentColor" />
            <h2 className="text-4xl font-script text-primary-foreground mb-6">
              You Are My Everything
            </h2>
            <p className="text-xl text-primary-foreground/90 font-poppins leading-relaxed">
              Today we celebrate you, but every day I celebrate the gift of having you in my life. 
              Thank you for being the most amazing person I know. I love you more than words can express! 💕
            </p>
            <div className="flex justify-center gap-4 mt-8">
              <Heart className="w-6 h-6 text-primary-foreground animate-heartbeat" fill="currentColor" />
              <Heart className="w-8 h-8 text-primary-foreground animate-heartbeat" fill="currentColor" style={{ animationDelay: '0.2s' }} />
              <Heart className="w-6 h-6 text-primary-foreground animate-heartbeat" fill="currentColor" style={{ animationDelay: '0.4s' }} />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Surprise;