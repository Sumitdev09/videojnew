
import { useState, useEffect } from "react";
import { useAuth } from "@/context/auth-context";
import Layout from "@/components/layout/Layout";
import FeaturedContent from "@/components/content/FeaturedContent";
import ContentRow from "@/components/content/ContentRow";
import { Content } from "@/types";
import {
  getFeaturedContent,
  getTrendingContent,
  getContentByGenre,
  getMovies,
  getSeries,
} from "@/lib/data";
import { useToast } from "@/components/ui/use-toast";

const Home = () => {
  const { user, hasSubscription } = useAuth();
  const [featuredContent, setFeaturedContent] = useState<Content | null>(null);
  const [featuredContentList, setFeaturedContentList] = useState<Content[]>([]);
  const [currentFeaturedIndex, setCurrentFeaturedIndex] = useState(0);
  const [trendingContent, setTrendingContent] = useState<Content[]>([]);
  const [actionContent, setActionContent] = useState<Content[]>([]);
  const [dramaContent, setDramaContent] = useState<Content[]>([]);
  const [sciFiContent, setSciFiContent] = useState<Content[]>([]);
  const [myList, setMyList] = useState<Content[]>([]);
  const { toast } = useToast();

  const loadContent = () => {
    // Fetch featured content
    const featured = getFeaturedContent();
    setFeaturedContentList(featured);
    setFeaturedContent(featured.length > 0 ? featured[currentFeaturedIndex] : null);

    // Fetch trending content
    setTrendingContent(getTrendingContent());

    // Fetch content by genres
    setActionContent(getContentByGenre("Action"));
    setDramaContent(getContentByGenre("Drama"));
    setSciFiContent(getContentByGenre("Sci-Fi"));
  };

  useEffect(() => {
    // Load content when component mounts
    loadContent();

    // Load my list from localStorage
    const savedList = localStorage.getItem(`my-list-${user?.id}`);
    if (savedList) {
      try {
        setMyList(JSON.parse(savedList));
      } catch (e) {
        console.error('Error parsing my list from localStorage', e);
        setMyList([]);
      }
    }
    
    // Listen for storage events (for multi-tab sync)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'netflix-content') {
        loadContent();
      }
    };
    
    // Listen for custom content-updated event
    const handleContentUpdated = () => {
      loadContent();
    };
    
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('content-updated', handleContentUpdated);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('content-updated', handleContentUpdated);
    };
  }, [user?.id]);

  // Set the featured content whenever the current index changes
  useEffect(() => {
    if (featuredContentList.length > 0) {
      setFeaturedContent(featuredContentList[currentFeaturedIndex]);
    }
  }, [currentFeaturedIndex, featuredContentList]);

  const handleNextFeatured = () => {
    setCurrentFeaturedIndex((prevIndex) => 
      prevIndex === featuredContentList.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePreviousFeatured = () => {
    setCurrentFeaturedIndex((prevIndex) => 
      prevIndex === 0 ? featuredContentList.length - 1 : prevIndex - 1
    );
  };

  const handleAddToList = (content: Content) => {
    const newList = [...myList, content];
    setMyList(newList);
    localStorage.setItem(`my-list-${user?.id}`, JSON.stringify(newList));
    
    toast({
      title: "Added to My List",
      description: `${content.title} has been added to your list.`,
    });
  };

  const handleRemoveFromList = (contentId: string) => {
    const newList = myList.filter((item) => item.id !== contentId);
    setMyList(newList);
    localStorage.setItem(`my-list-${user?.id}`, JSON.stringify(newList));
    
    toast({
      title: "Removed from My List",
      description: "The title has been removed from your list.",
    });
  };

  const isInMyList = (contentId: string) => {
    return myList.some((item) => item.id === contentId);
  };

  return (
    <Layout>
      <main>
        {featuredContent && (
          <FeaturedContent
            content={featuredContent}
            inMyList={isInMyList(featuredContent.id)}
            onAddToList={handleAddToList}
            onRemoveFromList={handleRemoveFromList}
            onNext={featuredContentList.length > 1 ? handleNextFeatured : undefined}
            onPrevious={featuredContentList.length > 1 ? handlePreviousFeatured : undefined}
          />
        )}
        
        <div className="container mx-auto px-4 py-8 -mt-16 relative z-20">
          {myList.length > 0 && (
            <ContentRow
              title="My List"
              contents={myList}
              myList={myList}
              onRemoveFromList={handleRemoveFromList}
            />
          )}
          
          <ContentRow
            title="Trending Now"
            contents={trendingContent}
            myList={myList}
            onAddToList={handleAddToList}
            onRemoveFromList={handleRemoveFromList}
          />
          
          <ContentRow
            title="Action & Adventure"
            contents={actionContent}
            myList={myList}
            onAddToList={handleAddToList}
            onRemoveFromList={handleRemoveFromList}
          />
          
          <ContentRow
            title="Drama"
            contents={dramaContent}
            myList={myList}
            onAddToList={handleAddToList}
            onRemoveFromList={handleRemoveFromList}
          />
          
          <ContentRow
            title="Sci-Fi & Fantasy"
            contents={sciFiContent}
            myList={myList}
            onAddToList={handleAddToList}
            onRemoveFromList={handleRemoveFromList}
          />
          
          {!hasSubscription && (
            <div className="mt-12 p-6 bg-gradient-to-r from-netflix-red/20 to-netflix-darkGray rounded-lg text-center">
              <h3 className="text-2xl font-bold text-white mb-2">
                Upgrade Your Experience
              </h3>
              <p className="mb-4">
                Subscribe to unlock all content and enjoy ad-free streaming.
              </p>
              <a
                href="/subscription"
                className="inline-block bg-netflix-red text-white px-6 py-2 rounded-md font-medium hover:bg-netflix-red/90 transition"
              >
                Choose a Plan
              </a>
            </div>
          )}
        </div>
      </main>
    </Layout>
  );
};

export default Home;
