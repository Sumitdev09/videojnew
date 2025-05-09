
import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Content } from "@/types";
import { getContentById } from "@/lib/data";
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
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const controlsTimerRef = useRef<number | null>(null);
  
  useEffect(() => {
    // Always fetch the most up-to-date content from localStorage
    if (id) {
      const foundContent = getContentById(id);
      
      if (foundContent) {
        setContent(foundContent);
        
        // Auto-hide controls after 3 seconds
        if (controlsTimerRef.current) {
          window.clearTimeout(controlsTimerRef.current);
        }
        
        controlsTimerRef.current = window.setTimeout(() => {
          setShowControls(false);
        }, 3000);
        
        return () => {
          if (controlsTimerRef.current) {
            window.clearTimeout(controlsTimerRef.current);
          }
        };
      }
    }
  }, [id]);
  
  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const handleTimeUpdate = () => {
      const current = videoElement.currentTime;
      const videoDuration = videoElement.duration || 0;
      setCurrentTime(current);
      setProgress((current / videoDuration) * 100 || 0);
    };

    const handleDurationChange = () => {
      const videoDuration = videoElement.duration;
      console.log("Video duration set:", videoDuration);
      setDuration(videoDuration);
    };

    const handleVideoEnd = () => {
      setIsPlaying(false);
      setProgress(100);
    };

    // Remove any existing listeners first
    videoElement.removeEventListener('timeupdate', handleTimeUpdate);
    videoElement.removeEventListener('durationchange', handleDurationChange);
    videoElement.removeEventListener('ended', handleVideoEnd);

    // Add listeners
    videoElement.addEventListener('timeupdate', handleTimeUpdate);
    videoElement.addEventListener('durationchange', handleDurationChange);
    videoElement.addEventListener('ended', handleVideoEnd);

    return () => {
      if (videoElement) {
        videoElement.removeEventListener('timeupdate', handleTimeUpdate);
        videoElement.removeEventListener('durationchange', handleDurationChange);
        videoElement.removeEventListener('ended', handleVideoEnd);
      }
    };
  }, [videoRef.current]);
  
  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
  
  const handleMuteToggle = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };
  
  const handleProgressChange = (values: number[]) => {
    const newProgress = values[0];
    if (videoRef.current && duration) {
      const newTime = (newProgress / 100) * duration;
      videoRef.current.currentTime = newTime;
      setProgress(newProgress);
      setCurrentTime(newTime);
    }
  };
  
  const handleMouseMove = () => {
    setShowControls(true);
    
    // Auto-hide controls after 3 seconds of inactivity
    if (controlsTimerRef.current) {
      window.clearTimeout(controlsTimerRef.current);
    }
    
    controlsTimerRef.current = window.setTimeout(() => {
      setShowControls(false);
    }, 3000);
  };

  const formatTime = (timeInSeconds: number) => {
    if (isNaN(timeInSeconds) || timeInSeconds === Infinity) return "0:00";
    
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
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
      {/* Back button positioned behind the header */}
      <div className="absolute top-16 left-6 z-40">
        <Button 
          variant="ghost" 
          size="sm"
          className="bg-black/50 text-white hover:bg-black/70 rounded-full px-4 py-2 flex items-center gap-1"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back</span>
        </Button>
      </div>

      {/* Video player */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-contain z-0"
        src={content.videoUrl}
        poster={content.bannerUrl || content.thumbnailUrl}
        autoPlay
        muted={isMuted}
        playsInline
        onClick={handlePlayPause}
      />
      
      {/* Controls overlay */}
      <div 
        className={`absolute inset-0 flex flex-col justify-between p-4 md:p-8 transition-opacity duration-300 z-10 ${
          showControls ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Top controls - removed the back button from here */}
        <div className="flex items-center">
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
              {formatTime(currentTime)}
            </span>
            <div className="flex-1">
              <Slider
                value={[progress]} 
                max={100} 
                step={0.1}
                onValueChange={handleProgressChange}
                className="cursor-pointer"
              />
            </div>
            <span className="text-white text-sm">
              {formatTime(duration)}
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
              onClick={() => {
                if (videoRef.current) {
                  if (videoRef.current.requestFullscreen) {
                    videoRef.current.requestFullscreen();
                  }
                }
              }}
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
