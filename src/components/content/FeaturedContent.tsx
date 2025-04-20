
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Content } from "@/types";
import { Play, Info, Plus, Check, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FeaturedContentProps {
  content: Content;
  inMyList?: boolean;
  onAddToList?: (content: Content) => void;
  onRemoveFromList?: (contentId: string) => void;
}

const FeaturedContent = ({
  content,
  inMyList = false,
  onAddToList,
  onRemoveFromList,
}: FeaturedContentProps) => {
  const [isMuted, setIsMuted] = useState(true);
  const navigate = useNavigate();

  const handlePlayClick = () => {
    navigate(`/watch/${content.id}`);
  };

  const handleInfoClick = () => {
    navigate(`/details/${content.id}`);
  };

  const handleListToggle = () => {
    if (inMyList && onRemoveFromList) {
      onRemoveFromList(content.id);
    } else if (onAddToList) {
      onAddToList(content);
    }
  };

  return (
    <div className="relative w-full h-[85vh] overflow-hidden">
      {/* Background image with gradient overlay */}
      <div className="absolute inset-0">
        <img
          src={content.bannerUrl}
          alt={content.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-netflix-black via-netflix-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-netflix-black via-netflix-black/5 to-transparent" />
      </div>

      {/* Content info */}
      <div className="relative z-10 h-full flex flex-col justify-center px-8 md:px-16 max-w-3xl">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">{content.title}</h1>
        
        <div className="flex items-center space-x-4 mb-4">
          <span className="text-green-500 font-semibold">
            98% Match
          </span>
          <span>{content.releaseYear}</span>
          <span className="border px-1 text-xs">{content.rating}</span>
          <span>{content.duration}</span>
        </div>
        
        <p className="text-lg text-gray-300 mb-6 line-clamp-3 md:line-clamp-4">
          {content.description}
        </p>
        
        <div className="flex items-center space-x-3">
          <Button 
            size="lg" 
            className="bg-white hover:bg-white/90 text-black font-semibold"
            onClick={handlePlayClick}
          >
            <Play size={24} className="mr-2" /> Play
          </Button>
          
          <Button
            size="lg"
            className="bg-gray-500/70 hover:bg-gray-500/50 text-white font-semibold"
            onClick={handleInfoClick}
          >
            <Info size={20} className="mr-2" /> More Info
          </Button>
          
          <div className="ml-auto flex items-center">
            <Button
              size="icon"
              variant="ghost"
              className="rounded-full text-white hover:bg-white/10"
              onClick={handleListToggle}
            >
              {inMyList ? <Check size={24} /> : <Plus size={24} />}
            </Button>
            
            <Button
              size="icon"
              variant="ghost"
              className="rounded-full text-white hover:bg-white/10"
              onClick={() => setIsMuted(!isMuted)}
            >
              {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedContent;
