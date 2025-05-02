
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Content } from "@/types";
import { contents } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { ArrowLeft, Play, Pause, Volume2, VolumeX, Maximize } from "lucide-react";
import "@/components/ui/scrollbar-hide.css";

const WatchContent = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [content, setContent] = useState<Content | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showControls, setShowControls] = useState(true);
  
  useEffect(() => {
    // In a real app, this would fetch from an API
    const foundContent = contents.find(item => item.id === id);
    
    if (foundContent) {
      setContent(foundContent);
      
      // Auto-hide controls after 3 seconds
      const timer = setTimeout(() => {
        setShowControls(false);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [id]);
  
  useEffect(() => {
    if (isPlaying && content) {
      // Simulate video progress
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            setIsPlaying(false);
            clearInterval(interval);
            return 100;
          }
          return prev + 0.5;
        });
      }, 1000);
      
      return () => clearInterval(interval);
    }
  }, [isPlaying, content]);
  
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };
  
  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
  };
  
  const handleMouseMove = () => {
    setShowControls(true);
    
    // Auto-hide controls after 3 seconds of inactivity
    const timer = setTimeout(() => {
      setShowControls(false);
    }, 3000);
    
    return () => clearTimeout(timer);
  };
  
  if (!content) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <h2 className="text-2xl text-white">Content not found</h2>
      </div>
    );
  }
  
  return (
    <div 
      className="relative w-full h-screen bg-black overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Video placeholder (in a real app, this would be a video player) */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${content.bannerUrl || content.thumbnailUrl})` }}
      >
        <div className="absolute inset-0 bg-black/30" />
      </div>
      
      {/* Controls overlay */}
      <div 
        className={`absolute inset-0 flex flex-col justify-between p-4 md:p-8 transition-opacity duration-300 ${
          showControls ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Top controls */}
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            className="text-white hover:bg-black/20"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-6 w-6" />
            <span className="ml-2">Back</span>
          </Button>
          <h2 className="ml-4 text-xl text-white font-medium">{content.title}</h2>
        </div>
        
        {/* Center play/pause button */}
        <div className="flex-1 flex items-center justify-center">
          {!isPlaying && (
            <Button
              variant="ghost"
              size="icon"
              className="h-20 w-20 rounded-full bg-white/10 hover:bg-white/20 text-white"
              onClick={handlePlayPause}
            >
              <Play className="h-12 w-12" />
            </Button>
          )}
        </div>
        
        {/* Bottom controls */}
        <div className="space-y-4">
          {/* Progress bar */}
          <div className="flex items-center gap-4">
            <span className="text-white text-sm">
              {Math.floor(progress / 100 * 90)}:00
            </span>
            <div className="flex-1">
              <Slider
                value={[progress]} 
                max={100} 
                step={0.1}
                onValueChange={(values) => setProgress(values[0])}
                className="cursor-pointer"
              />
            </div>
            <span className="text-white text-sm">
              90:00
            </span>
          </div>
          
          {/* Control buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-black/20"
                onClick={handlePlayPause}
              >
                {isPlaying ? (
                  <Pause className="h-5 w-5" />
                ) : (
                  <Play className="h-5 w-5" />
                )}
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-black/20"
                onClick={handleMuteToggle}
              >
                {isMuted ? (
                  <VolumeX className="h-5 w-5" />
                ) : (
                  <Volume2 className="h-5 w-5" />
                )}
              </Button>
            </div>
            
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-black/20"
            >
              <Maximize className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WatchContent;
