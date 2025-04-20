
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Content } from "@/types";
import { Play, Info, Plus, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ContentCardProps {
  content: Content;
  inMyList?: boolean;
  onAddToList?: (content: Content) => void;
  onRemoveFromList?: (contentId: string) => void;
}

const ContentCard = ({ 
  content, 
  inMyList = false,
  onAddToList,
  onRemoveFromList
}: ContentCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/watch/${content.id}`);
  };

  const handleInfoClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/details/${content.id}`);
  };

  const handleListToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (inMyList && onRemoveFromList) {
      onRemoveFromList(content.id);
    } else if (onAddToList) {
      onAddToList(content);
    }
  };

  return (
    <div
      className="relative group transition-transform duration-300 rounded-md overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
      <div 
        className={`bg-netflix-darkGray aspect-[2/3] w-full rounded-md overflow-hidden transition-all duration-300 cursor-pointer ${
          isHovered ? 'scale-105 shadow-xl z-10' : ''
        }`}
      >
        <img
          src={content.thumbnailUrl}
          alt={content.title}
          className="w-full h-full object-cover"
        />
        
        {isHovered && (
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent p-4 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div>
              <h3 className="text-white font-bold truncate">{content.title}</h3>
              <div className="flex items-center mt-1 text-xs text-gray-300 space-x-2">
                <span>{content.releaseYear}</span>
                <span className="border px-1 text-xs">{content.rating}</span>
                <span>{content.duration}</span>
              </div>
            </div>
            
            <div className="flex space-x-2 mt-4">
              <Button 
                size="sm" 
                className="rounded-full bg-white hover:bg-white/90 text-black"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/watch/${content.id}`);
                }}
              >
                <Play size={16} className="mr-1" /> Play
              </Button>
              
              <Button
                size="icon"
                variant="outline"
                className="rounded-full border-white/40 bg-black/30 text-white hover:bg-black/50"
                onClick={handleInfoClick}
              >
                <Info size={16} />
              </Button>
              
              <Button
                size="icon"
                variant="outline"
                className="rounded-full border-white/40 bg-black/30 text-white hover:bg-black/50 ml-auto"
                onClick={handleListToggle}
              >
                {inMyList ? <Check size={16} /> : <Plus size={16} />}
              </Button>
            </div>
            
            <div className="flex flex-wrap text-xs text-gray-300 mt-2">
              {content.genre.map((genre, index) => (
                <span key={genre}>
                  {genre}
                  {index < content.genre.length - 1 && <span className="mx-1">•</span>}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentCard;
