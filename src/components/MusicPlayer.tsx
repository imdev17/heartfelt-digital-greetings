import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, Music } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

interface MusicPlayerProps {
  songTitle: string;
  artist: string;
  audioUrl?: string; // Optional for demo
}

const MusicPlayer = ({ songTitle, artist, audioUrl }: MusicPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState([70]);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(console.error);
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    
    audio.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (value: number[]) => {
    const audio = audioRef.current;
    if (!audio) return;
    
    setVolume(value);
    audio.volume = value[0] / 100;
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed bottom-6 right-6 bg-card/95 backdrop-blur-sm rounded-2xl shadow-romantic p-4 border border-border/50 z-20">
      {audioUrl && (
        <audio ref={audioRef} src={audioUrl} preload="metadata" />
      )}
      
      <div className="flex items-center gap-4 min-w-[300px]">
        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            size="icon"
            onClick={togglePlay}
            className="bg-gradient-heart hover:scale-110 transition-bounce shadow-soft"
            disabled={!audioUrl}
          >
            {isPlaying ? (
              <Pause className="h-5 w-5 text-primary-foreground" fill="currentColor" />
            ) : (
              <Play className="h-5 w-5 text-primary-foreground" fill="currentColor" />
            )}
          </Button>

          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <Music className="w-4 h-4 text-primary animate-pulse" />
              <h4 className="font-script text-sm text-primary font-semibold">
                {songTitle}
              </h4>
            </div>
            <p className="text-xs text-muted-foreground font-poppins">
              {artist}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMute}
            className="h-8 w-8"
          >
            {isMuted ? (
              <VolumeX className="h-4 w-4" />
            ) : (
              <Volume2 className="h-4 w-4" />
            )}
          </Button>
          
          <div className="w-20">
            <Slider
              value={volume}
              onValueChange={handleVolumeChange}
              max={100}
              step={1}
              className="cursor-pointer"
            />
          </div>
        </div>
      </div>

      {audioUrl && duration > 0 && (
        <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
          <span>{formatTime(currentTime)}</span>
          <div className="flex-1 bg-muted rounded-full h-1">
            <div
              className="bg-gradient-heart h-1 rounded-full transition-all duration-200"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            />
          </div>
          <span>{formatTime(duration)}</span>
        </div>
      )}
    </div>
  );
};

export default MusicPlayer;