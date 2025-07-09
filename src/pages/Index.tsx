import { useState, useEffect } from "react";
import { Heart, Gift, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import FloatingHearts from "@/components/FloatingHearts";
import TypingText from "@/components/TypingText";
import CountdownTimer from "@/components/CountdownTimer";
import MusicPlayer from "@/components/MusicPlayer";

const Index = () => {
  const [showSecondMessage, setShowSecondMessage] = useState(false);
  const [countdownComplete, setCountdownComplete] = useState(false);
  const [confetti, setConfetti] = useState(false);
  const navigate = useNavigate();

  // Countdown to birthday (example: 2 minutes from now for demo)
  const birthdayDate = new Date();
  birthdayDate.setMinutes(birthdayDate.getMinutes() + 2);

  const triggerConfetti = () => {
    setConfetti(true);
    setTimeout(() => setConfetti(false), 3000);
  };

  const handleSurpriseClick = () => {
    if (countdownComplete) {
      triggerConfetti();
      setTimeout(() => navigate("/surprise"), 1000);
    }
  };

  const handleCountdownComplete = () => {
    setCountdownComplete(true);
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
            </div>
          )}
        </section>

        {/* Countdown Section */}
        {showSecondMessage && (
          <section className="text-center max-w-3xl mx-auto animate-slide-up">
            <div className="mb-12">
              <h2 className="text-4xl md:text-5xl font-script text-primary mb-4">
                {countdownComplete ? "🎉 It's Time! 🎉" : "Wait for the Magic..."}
              </h2>
              <p className="text-xl text-muted-foreground font-poppins">
                {countdownComplete ? "Your birthday surprise is ready!" : "The countdown to your special moment 💫"}
              </p>
            </div>
            
            {!countdownComplete && (
              <CountdownTimer
                targetDate={birthdayDate}
                title="Until your birthday surprise"
                onComplete={handleCountdownComplete}
              />
            )}

            {countdownComplete && (
              <div className="animate-slide-up">
                <Button
                  onClick={handleSurpriseClick}
                  className="bg-gradient-heart hover:scale-110 transition-bounce text-2xl py-8 px-12 rounded-3xl shadow-glow font-poppins text-primary-foreground"
                >
                  <Gift className="w-8 h-8 mr-3" />
                  Enter Your Birthday Surprise!
                  <Heart className="w-8 h-8 ml-3 animate-heartbeat" fill="currentColor" />
                </Button>
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  );
};

export default Index;
