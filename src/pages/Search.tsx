
import { useState, useEffect } from "react";
import { useAuth } from "@/context/auth-context";
import Layout from "@/components/layout/Layout";
import SearchResults from "@/components/content/SearchResults";
import { Input } from "@/components/ui/input";
import { Content } from "@/types";
import { contents } from "@/lib/data";
import { Search as SearchIcon, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Search = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Content[]>([]);
  const [myList, setMyList] = useState<Content[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    // Load my list from localStorage
    const savedList = localStorage.getItem(`my-list-${user?.id}`);
    if (savedList) {
      setMyList(JSON.parse(savedList));
    }
  }, [user?.id]);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults([]);
      return;
    }

    const query = searchQuery.toLowerCase();
    const results = contents.filter(
      (content) =>
        content.title.toLowerCase().includes(query) ||
        content.description.toLowerCase().includes(query) ||
        content.genre.some((genre) => genre.toLowerCase().includes(query))
    );

    setSearchResults(results);
  }, [searchQuery]);

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

  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
  };

  return (
    <Layout>
      
      <main className="container mx-auto px-4 py-16 pt-28">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Search</h1>
          
          <div className="relative mb-8">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-netflix-lightGray h-5 w-5" />
            <Input
              type="text"
              placeholder="Search for movies, TV shows, genres..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-10 py-6 bg-netflix-mediumGray border-netflix-darkGray text-white rounded-md text-lg"
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-netflix-lightGray hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
          
          <SearchResults
            results={searchResults}
            query={searchQuery}
            myList={myList}
            onAddToList={handleAddToList}
            onRemoveFromList={handleRemoveFromList}
          />
          
          {searchQuery.trim() === "" && (
            <div className="py-12 text-center">
              <p className="text-netflix-lightGray text-lg">
                Search for movies, TV shows, actors, or genres
              </p>
              
              <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {["Action", "Drama", "Comedy", "Thriller", "Sci-Fi", "Fantasy", "Horror", "Animation"].map(
                  (genre) => (
                    <button
                      key={genre}
                      onClick={() => setSearchQuery(genre)}
                      className="px-4 py-3 rounded-md bg-netflix-mediumGray hover:bg-netflix-darkGray text-netflix-text transition"
                    >
                      {genre}
                    </button>
                  )
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </Layout>
  );
};

export default Search;
