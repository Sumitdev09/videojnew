
import { Content } from "@/types";
import ContentCard from "./ContentCard";

interface SearchResultsProps {
  results: Content[];
  query: string;
  myList?: Content[];
  onAddToList?: (content: Content) => void;
  onRemoveFromList?: (contentId: string) => void;
}

const SearchResults = ({ 
  results, 
  query,
  myList = [],
  onAddToList,
  onRemoveFromList
}: SearchResultsProps) => {
  const isInMyList = (contentId: string) => {
    return myList.some(item => item.id === contentId);
  };

  if (results.length === 0 && query.trim() !== "") {
    return (
      <div className="py-16 text-center">
        <p className="text-netflix-text text-lg mb-2">
          Your search for "{query}" did not have any matches.
        </p>
        <p className="text-netflix-lightGray">
          Suggestions:
          <ul className="mt-2 list-disc list-inside">
            <li>Try different keywords</li>
            <li>Looking for a movie or TV show?</li>
            <li>Try using a movie or TV show title</li>
            <li>Try a genre like comedy, drama, or sports</li>
          </ul>
        </p>
      </div>
    );
  }

  return (
    <div className="py-8">
      {query.trim() !== "" && (
        <h2 className="text-netflix-text text-xl font-medium mb-6">
          {results.length} {results.length === 1 ? "result" : "results"} for "{query}"
        </h2>
      )}
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {results.map((content) => (
          <ContentCard 
            key={content.id} 
            content={content} 
            inMyList={isInMyList(content.id)}
            onAddToList={onAddToList}
            onRemoveFromList={onRemoveFromList}
          />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
