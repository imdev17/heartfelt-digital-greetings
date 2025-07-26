import { useState } from "react";
import { Heart, Mail, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import TypingText from "./TypingText";

interface LoveLetterProps {
  letter: string;
  signature: string;
}

const LoveLetter = ({ letter, signature }: LoveLetterProps) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [showTyping, setShowTyping] = useState(false);

  const handleReveal = () => {
    setIsRevealed(true);
    setTimeout(() => setShowTyping(true), 800);
  };

  return (
    <div className="max-w-3xl mx-auto">
      {!isRevealed ? (
        <div className="text-center p-12 bg-card rounded-3xl shadow-romantic">
          <Mail className="w-16 h-16 text-primary mx-auto mb-6 animate-float" />
          <h2 className="text-3xl font-script text-primary mb-4">
            A Letter From My Heart
          </h2>
          <p className="text-lg text-muted-foreground mb-8 font-poppins">
            I wrote you something special...
          </p>
          <Button
            onClick={handleReveal}
            className="bg-gradient-heart hover:scale-105 transition-bounce text-xl py-6 px-8 rounded-2xl shadow-glow font-poppins"
          >
            <Heart className="w-6 h-6 mr-2" fill="currentColor" />
            Read My Letter
            <Sparkles className="w-6 h-6 ml-2" />
          </Button>
        </div>
      ) : (
        <div className="bg-card rounded-3xl shadow-romantic p-8 md:p-12 animate-slide-up">
          <div className="relative">
            {/* Letter paper texture */}
            <div className="absolute inset-0 bg-gradient-soft rounded-2xl opacity-50"></div>
            
            <div className="relative z-10">
              <div className="text-center mb-8">
                <Heart className="w-8 h-8 text-primary mx-auto mb-4 animate-heartbeat" fill="currentColor" />
                <h3 className="text-2xl font-script text-primary">My Dearest Love</h3>
              </div>

              <div className="prose prose-lg max-w-none text-foreground/90 font-poppins leading-relaxed">
                {showTyping ? (
                  <TypingText
                    text={letter}
                    speed={50}
                    className="block whitespace-pre-wrap"
                  />
                ) : (
                  <div className="h-32 flex items-center justify-center">
                    <div className="animate-pulse text-muted-foreground">
                      Preparing your letter...
                    </div>
                  </div>
                )}
              </div>

              {showTyping && (
                <div className="mt-8 text-right animate-slide-up" style={{ animationDelay: '2s' }}>
                  <p className="text-xl font-script text-primary">
                    With all my love,
                  </p>
                  <p className="text-2xl font-script text-primary mt-2">
                    {signature} 💕
                  </p>
                  <div className="flex justify-end gap-2 mt-4">
                    <Heart className="w-4 h-4 text-primary animate-heartbeat" fill="currentColor" />
                    <Heart className="w-4 h-4 text-primary animate-heartbeat" fill="currentColor" style={{ animationDelay: '0.2s' }} />
                    <Heart className="w-4 h-4 text-primary animate-heartbeat" fill="currentColor" style={{ animationDelay: '0.4s' }} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoveLetter;