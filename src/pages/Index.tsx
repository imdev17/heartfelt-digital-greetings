import { useState, useEffect } from "react";
import { Heart, Gift, Sparkles, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import FloatingHearts from "@/components/FloatingHearts";
import TypingText from "@/components/TypingText";
import PhotoCarousel from "@/components/PhotoCarousel";
import CountdownTimer from "@/components/CountdownTimer";
import LoveLetter from "@/components/LoveLetter";
import MusicPlayer from "@/components/MusicPlayer";

// Import generated images
import coupleImage from "@/assets/couple-sunset.jpg";
import coffeeImage from "@/assets/coffee-date.jpg";
import picnicImage from "@/assets/picnic-memory.jpg";

const Index = () => {
  const [showSecondMessage, setShowSecondMessage] = useState(false);
  const [showSurprise, setShowSurprise] = useState(false);
  const [confetti, setConfetti] = useState(false);

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

  // Countdown to next special date (example: 30 days from now)
  const nextSpecialDate = new Date();
  nextSpecialDate.setDate(nextSpecialDate.getDate() + 30);

  const triggerConfetti = () => {
    setConfetti(true);
    setTimeout(() => setConfetti(false), 3000);
  };

  const handleSurpriseClick = () => {
    setShowSurprise(true);
    triggerConfetti();
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <FloatingHearts />
      
      {/* Confetti effect */}
      {confetti && (
        <div className="fixed inset-0 pointer-events-none z-30">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-primary rounded-full animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      )}

      <MusicPlayer
        songTitle="Perfect"
        artist="Ed Sheeran"
        // audioUrl="/path/to/your/song.mp3" // Add your audio file
      />

      <div className="container mx-auto px-4 py-12 space-y-20 relative z-10">
        {/* Hero Section */}
        <section className="text-center max-w-4xl mx-auto">
          <div className="mb-8">
            <Sparkles className="w-16 h-16 text-primary mx-auto mb-6 animate-sparkle" />
            <h1 className="text-6xl md:text-8xl font-script bg-gradient-heart bg-clip-text text-transparent mb-6 animate-slide-up">
              Happy Birthday
            </h1>
            <div className="text-4xl md:text-6xl font-script text-primary mb-8">
              <TypingText
                text="My Beautiful Love! 💕"
                speed={150}
                onComplete={() => setTimeout(() => setShowSecondMessage(true), 1000)}
              />
            </div>
          </div>

          {showSecondMessage && (
            <div className="animate-slide-up">
              <p className="text-xl md:text-2xl text-foreground/80 mb-8 font-poppins leading-relaxed">
                Today is all about celebrating the most incredible person in my world.
                <br />
                You make every day brighter just by being you! ✨
              </p>
              
              {!showSurprise && (
                <Button
                  onClick={handleSurpriseClick}
                  className="bg-gradient-heart hover:scale-110 transition-bounce text-2xl py-8 px-12 rounded-3xl shadow-glow font-poppins text-primary-foreground"
                >
                  <Gift className="w-8 h-8 mr-3" />
                  Click for Your Birthday Surprise!
                  <Heart className="w-8 h-8 ml-3 animate-heartbeat" fill="currentColor" />
                </Button>
              )}
            </div>
          )}
        </section>

        {showSurprise && (
          <>
            {/* Photo Memories Section */}
            <section className="animate-slide-up">
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-script text-primary mb-4">
                  Our Beautiful Memories
                </h2>
                <p className="text-xl text-muted-foreground font-poppins">
                  Some of my favorite moments with you 📸
                </p>
              </div>
              <PhotoCarousel photos={photos} />
            </section>

            {/* Love Letter Section */}
            <section className="animate-slide-up" style={{ animationDelay: '0.5s' }}>
              <LoveLetter letter={loveLetterText} signature={signature} />
            </section>

            {/* Countdown Section */}
            <section className="animate-slide-up" style={{ animationDelay: '1s' }}>
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-script text-primary mb-4">
                  Counting Down to Our Next Adventure
                </h2>
                <p className="text-xl text-muted-foreground font-poppins">
                  Every moment until I see you again 💫
                </p>
              </div>
              <CountdownTimer
                targetDate={nextSpecialDate}
                title="Until our next special date"
                onComplete={() => console.log("Countdown complete!")}
              />
            </section>

            {/* Final Message */}
            <section className="text-center max-w-3xl mx-auto animate-slide-up" style={{ animationDelay: '1.5s' }}>
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
          </>
        )}
      </div>
    </div>
  );
};

export default Index;
