
import { useRef } from "react";
import { Content } from "@/types";
import ContentCard from "./ContentCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ContentRowProps {
  title: string;
  contents: Content[];
  myList?: Content[];
  onAddToList?: (content: Content) => void;
  onRemoveFromList?: (contentId: string) => void;
}

const ContentRow = ({ 
  title, 
  contents,
  myList = [],
  onAddToList,
  onRemoveFromList
}: ContentRowProps) => {
  const rowRef = useRef<HTMLDivElement>(null);
  
  const scroll = (direction: "left" | "right") => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo = direction === "left" 
        ? scrollLeft - clientWidth * 0.75 
        : scrollLeft + clientWidth * 0.75;
      
      rowRef.current.scrollTo({
        left: scrollTo,
        behavior: "smooth"
      });
    }
  };

  const isInMyList = (contentId: string) => {
    return myList.some(item => item.id === contentId);
  };

  return (
    <div className="mb-8">
      <h2 className="text-netflix-text text-xl font-medium mb-4">{title}</h2>
      
      <div className="relative group">
        <div 
          ref={rowRef}
          className="flex space-x-4 overflow-x-scroll scrollbar-hide scroll-smooth"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {contents.map((content) => (
            <div key={content.id} className="flex-shrink-0 w-[180px] md:w-[200px]">
              <ContentCard 
                content={content} 
                inMyList={isInMyList(content.id)}
                onAddToList={onAddToList}
                onRemoveFromList={onRemoveFromList}
              />
            </div>
          ))}
        </div>
        
        <Button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 rounded-full p-1 hidden group-hover:flex items-center justify-center"
          size="icon"
          variant="ghost"
        >
          <ChevronLeft className="text-white h-6 w-6" />
        </Button>
        
        <Button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 rounded-full p-1 hidden group-hover:flex items-center justify-center"
          size="icon"
          variant="ghost"
        >
          <ChevronRight className="text-white h-6 w-6" />
        </Button>
      </div>
    </div>
  );
};

export default ContentRow;
