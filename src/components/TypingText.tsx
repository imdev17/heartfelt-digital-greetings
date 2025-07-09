import { useEffect, useState } from "react";

interface TypingTextProps {
  text: string;
  speed?: number;
  className?: string;
  onComplete?: () => void;
}

const TypingText = ({ text, speed = 100, className = "", onComplete }: TypingTextProps) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let currentIndex = 0;
    setDisplayedText("");
    setIsComplete(false);

    const timer = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayedText(text.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        setIsComplete(true);
        clearInterval(timer);
        onComplete?.();
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed, onComplete]);

  return (
    <span className={`${className} ${!isComplete ? 'border-r-2 border-primary' : ''}`}>
      {displayedText}
      {!isComplete && (
        <span className="animate-pulse">|</span>
      )}
    </span>
  );
};

export default TypingText;