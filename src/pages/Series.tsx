
import { useState, useEffect } from "react";
import { useAuth } from "@/context/auth-context";
import Layout from "@/components/layout/Layout";
import ContentRow from "@/components/content/ContentRow";
import { Content } from "@/types";
import { getSeries } from "@/lib/data";
import { useToast } from "@/components/ui/use-toast";

const Series = () => {
  const { user } = useAuth();
  const [series, setSeries] = useState<Content[]>([]);
  const [dramaSeries, setDramaSeries] = useState<Content[]>([]);
  const [sciFiSeries, setSciFiSeries] = useState<Content[]>([]);
  const [crimeSeries, setCrimeSeries] = useState<Content[]>([]);
  const [myList, setMyList] = useState<Content[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    // Fetch all series
    const allSeries = getSeries();
    setSeries(allSeries);

    // Filter series by genre
    setDramaSeries(allSeries.filter(show => show.genre.includes("Drama")));
    setSciFiSeries(allSeries.filter(show => show.genre.includes("Sci-Fi")));
    setCrimeSeries(allSeries.filter(show => show.genre.includes("Crime")));
    
    // Load my list from localStorage
    const savedList = localStorage.getItem(`my-list-${user?.id}`);
    if (savedList) {
      setMyList(JSON.parse(savedList));
    }
  }, [user?.id]);

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
      <main className="container mx-auto px-4 py-24">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">TV Shows</h1>
        
        <div className="space-y-10">
          <ContentRow
            title="All TV Shows"
            contents={series}
            myList={myList}
            onAddToList={handleAddToList}
            onRemoveFromList={handleRemoveFromList}
          />
          
          {dramaSeries.length > 0 && (
            <ContentRow
              title="Drama Series"
              contents={dramaSeries}
              myList={myList}
              onAddToList={handleAddToList}
              onRemoveFromList={handleRemoveFromList}
            />
          )}
          
          {sciFiSeries.length > 0 && (
            <ContentRow
              title="Sci-Fi Series"
              contents={sciFiSeries}
              myList={myList}
              onAddToList={handleAddToList}
              onRemoveFromList={handleRemoveFromList}
            />
          )}
          
          {crimeSeries.length > 0 && (
            <ContentRow
              title="Crime Series"
              contents={crimeSeries}
              myList={myList}
              onAddToList={handleAddToList}
              onRemoveFromList={handleRemoveFromList}
            />
          )}
        </div>
      </main>
    </Layout>
  );
};

export default Series;
