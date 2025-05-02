
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Content } from "@/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { contents } from "@/lib/data";
import { useToast } from "@/components/ui/use-toast";
import { PlayCircle, Plus, Check, ChevronLeft } from "lucide-react";

const ContentDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [content, setContent] = useState<Content | null>(null);
  const [isInMyList, setIsInMyList] = useState(false);
  
  useEffect(() => {
    // In a real app, this would fetch from an API
    const foundContent = contents.find(item => item.id === id);
    
    if (foundContent) {
      setContent(foundContent);
      // Check if content is in my list (would come from API/local storage in real app)
      setIsInMyList(false);
    }
  }, [id]);
  
  const handlePlayContent = () => {
    if (content) {
      navigate(`/watch/${content.id}`);
    }
  };
  
  const handleToggleMyList = () => {
    setIsInMyList(!isInMyList);
    
    toast({
      title: isInMyList ? "Removed from My List" : "Added to My List",
      description: isInMyList 
        ? `"${content?.title}" has been removed from your list.`
        : `"${content?.title}" has been added to your list.`,
    });
  };
  
  if (!content) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[70vh]">
          <h2 className="text-2xl text-netflix-text">Content not found</h2>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="relative">
        {/* Hero banner */}
        <div 
          className="relative w-full h-[40vh] md:h-[60vh] bg-cover bg-center"
          style={{ backgroundImage: `url(${content.bannerUrl || content.thumbnailUrl})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-netflix-black via-transparent to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-netflix-black via-netflix-black/60 to-transparent" />
          
          <Button 
            variant="ghost" 
            className="absolute top-4 left-4 text-white"
            onClick={() => navigate(-1)}
          >
            <ChevronLeft className="mr-1 h-5 w-5" />
            Back
          </Button>
          
          <div className="absolute bottom-0 left-0 p-8 md:p-16 w-full md:w-2/3 space-y-4">
            <h1 className="text-3xl md:text-5xl font-bold text-white">{content.title}</h1>
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="outline" className="text-white border-white">
                {content.rating}
              </Badge>
              <Badge className="bg-netflix-red text-white">
                {content.releaseYear}
              </Badge>
              <Badge variant="outline" className="text-white border-white">
                {content.duration || (content.type === "series" ? "Series" : "Movie")}
              </Badge>
              {content.genre.map((g) => (
                <Badge key={g} variant="secondary" className="bg-white/10 text-white hover:bg-white/20">
                  {g}
                </Badge>
              ))}
            </div>
            
            <div className="flex flex-wrap gap-3 pt-4">
              <Button
                className="bg-netflix-red hover:bg-netflix-red/90 text-white"
                onClick={handlePlayContent}
              >
                <PlayCircle className="mr-2 h-5 w-5" />
                Play
              </Button>
              <Button
                variant="secondary"
                className="bg-white/20 text-white hover:bg-white/30"
                onClick={handleToggleMyList}
              >
                {isInMyList ? (
                  <>
                    <Check className="mr-2 h-5 w-5" />
                    In My List
                  </>
                ) : (
                  <>
                    <Plus className="mr-2 h-5 w-5" />
                    Add to My List
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
        
        {/* Content details */}
        <div className="container mx-auto px-8 py-12 grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <p className="text-netflix-text text-lg">{content.description}</p>
            
            {content.cast && content.cast.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-netflix-text font-medium">Cast</h3>
                <p className="text-netflix-lightGray">{content.cast.join(", ")}</p>
              </div>
            )}
          </div>
          
          <div className="space-y-4">
            <div className="border border-netflix-mediumGray rounded-md p-4">
              <h3 className="text-netflix-text font-medium mb-2">Details</h3>
              <dl className="space-y-2">
                <div className="grid grid-cols-2">
                  <dt className="text-netflix-lightGray">Type:</dt>
                  <dd className="text-netflix-text">
                    {content.type === "movie" ? "Movie" : "TV Series"}
                  </dd>
                </div>
                <div className="grid grid-cols-2">
                  <dt className="text-netflix-lightGray">Release:</dt>
                  <dd className="text-netflix-text">{content.releaseYear}</dd>
                </div>
                <div className="grid grid-cols-2">
                  <dt className="text-netflix-lightGray">Rating:</dt>
                  <dd className="text-netflix-text">{content.rating}</dd>
                </div>
                {content.duration && (
                  <div className="grid grid-cols-2">
                    <dt className="text-netflix-lightGray">Duration:</dt>
                    <dd className="text-netflix-text">{content.duration}</dd>
                  </div>
                )}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ContentDetails;
