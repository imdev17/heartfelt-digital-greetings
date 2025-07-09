import { Heart } from "lucide-react";
import { useEffect, useState } from "react";

interface FloatingHeart {
  id: number;
  left: number;
  animationDelay: number;
  size: number;
}

const FloatingHearts = () => {
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);

  useEffect(() => {
    const generateHearts = () => {
      const newHearts = Array.from({ length: 15 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        animationDelay: Math.random() * 3,
        size: Math.random() * 20 + 15
      }));
      setHearts(newHearts);
    };

    generateHearts();
    const interval = setInterval(generateHearts, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
      {hearts.map((heart) => (
        <Heart
          key={heart.id}
          className="absolute text-primary/30 animate-float"
          style={{
            left: `${heart.left}%`,
            top: `${Math.random() * 100}%`,
            width: `${heart.size}px`,
            height: `${heart.size}px`,
            animationDelay: `${heart.animationDelay}s`,
            animationDuration: `${3 + Math.random() * 2}s`
          }}
          fill="currentColor"
        />
      ))}
    </div>
  );
};

export default FloatingHearts;