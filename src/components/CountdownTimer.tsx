import { useState, useEffect } from "react";
import { Calendar, Clock, Heart } from "lucide-react";

interface CountdownTimerProps {
  targetDate: Date;
  title: string;
  onComplete?: () => void;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownTimer = ({ targetDate, title, onComplete }: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        if (!isComplete) {
          setIsComplete(true);
          onComplete?.();
        }
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate, isComplete, onComplete]);

  if (isComplete) {
    return (
      <div className="text-center p-8 bg-gradient-heart rounded-3xl shadow-romantic animate-glow">
        <Heart className="w-16 h-16 text-primary-foreground mx-auto mb-4 animate-heartbeat" fill="currentColor" />
        <h2 className="text-3xl font-script text-primary-foreground mb-2">
          The moment is here! 🎉
        </h2>
        <p className="text-primary-foreground/90 text-lg">
          {title}
        </p>
      </div>
    );
  }

  return (
    <div className="text-center p-8 bg-card rounded-3xl shadow-romantic">
      <div className="flex items-center justify-center gap-2 mb-6">
        <Calendar className="w-6 h-6 text-primary" />
        <h2 className="text-2xl font-script text-primary">{title}</h2>
        <Clock className="w-6 h-6 text-primary" />
      </div>
      
      <div className="grid grid-cols-4 gap-4 max-w-md mx-auto">
        {[
          { label: "Days", value: timeLeft.days },
          { label: "Hours", value: timeLeft.hours },
          { label: "Minutes", value: timeLeft.minutes },
          { label: "Seconds", value: timeLeft.seconds }
        ].map((item, index) => (
          <div key={item.label} className="text-center">
            <div className="bg-gradient-romantic text-primary-foreground rounded-2xl p-4 shadow-soft animate-slide-up" 
                 style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="text-2xl font-bold font-poppins">
                {item.value.toString().padStart(2, '0')}
              </div>
            </div>
            <div className="text-sm text-muted-foreground mt-2 font-poppins">
              {item.label}
            </div>
          </div>
        ))}
      </div>
      
      <Heart className="w-6 h-6 text-primary mx-auto mt-6 animate-heartbeat" fill="currentColor" />
    </div>
  );
};

export default CountdownTimer;