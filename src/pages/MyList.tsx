
import { useState, useEffect } from "react";
import { useAuth } from "@/context/auth-context";
import Layout from "@/components/layout/Layout";
import { Content } from "@/types";
import { useToast } from "@/components/ui/use-toast";
import SearchResults from "@/components/content/SearchResults";

const MyList = () => {
  const { user } = useAuth();
  const [myList, setMyList] = useState<Content[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    // Load my list from localStorage
    const savedList = localStorage.getItem(`my-list-${user?.id}`);
    if (savedList) {
      setMyList(JSON.parse(savedList));
    }
  }, [user?.id]);

  const handleRemoveFromList = (contentId: string) => {
    const newList = myList.filter((item) => item.id !== contentId);
    setMyList(newList);
    localStorage.setItem(`my-list-${user?.id}`, JSON.stringify(newList));
    
    toast({
      title: "Removed from My List",
      description: "The title has been removed from your list.",
    });
  };

  return (
    <Layout>
      <main className="container mx-auto px-4 py-24">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">My List</h1>
        
        {myList.length > 0 ? (
          <SearchResults 
            results={myList} 
            query="" 
            myList={myList} 
            onRemoveFromList={handleRemoveFromList} 
          />
        ) : (
          <div className="text-center py-16">
            <h2 className="text-2xl mb-4">Your list is empty</h2>
            <p className="text-netflix-lightGray mb-6">
              Add movies and TV shows to your list to watch them later
            </p>
            <a 
              href="/" 
              className="inline-block bg-netflix-red text-white px-6 py-2 rounded-md font-medium hover:bg-netflix-red/90 transition"
            >
              Browse Content
            </a>
          </div>
        )}
      </main>
    </Layout>
  );
};

export default MyList;
