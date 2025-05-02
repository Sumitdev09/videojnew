
import { useState, useEffect } from "react";
import { useAuth } from "@/context/auth-context";
import Layout from "@/components/layout/Layout";
import ContentRow from "@/components/content/ContentRow";
import { Content } from "@/types";
import { getMovies } from "@/lib/data";
import { useToast } from "@/components/ui/use-toast";

const Movies = () => {
  const { user } = useAuth();
  const [movies, setMovies] = useState<Content[]>([]);
  const [actionMovies, setActionMovies] = useState<Content[]>([]);
  const [dramaMovies, setDramaMovies] = useState<Content[]>([]);
  const [comedyMovies, setComedyMovies] = useState<Content[]>([]);
  const [myList, setMyList] = useState<Content[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    // Fetch all movies
    const allMovies = getMovies();
    setMovies(allMovies);

    // Filter movies by genre
    setActionMovies(allMovies.filter(movie => movie.genre.includes("Action")));
    setDramaMovies(allMovies.filter(movie => movie.genre.includes("Drama")));
    setComedyMovies(allMovies.filter(movie => movie.genre.includes("Comedy")));
    
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
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Movies</h1>
        
        <div className="space-y-10">
          <ContentRow
            title="All Movies"
            contents={movies}
            myList={myList}
            onAddToList={handleAddToList}
            onRemoveFromList={handleRemoveFromList}
          />
          
          {actionMovies.length > 0 && (
            <ContentRow
              title="Action"
              contents={actionMovies}
              myList={myList}
              onAddToList={handleAddToList}
              onRemoveFromList={handleRemoveFromList}
            />
          )}
          
          {dramaMovies.length > 0 && (
            <ContentRow
              title="Drama"
              contents={dramaMovies}
              myList={myList}
              onAddToList={handleAddToList}
              onRemoveFromList={handleRemoveFromList}
            />
          )}
          
          {comedyMovies.length > 0 && (
            <ContentRow
              title="Comedy"
              contents={comedyMovies}
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

export default Movies;
