
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Content } from "@/types";
import { contents } from "@/lib/data";
import { useToast } from "@/components/ui/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Film, Tv } from "lucide-react";

const ManageFeatured = () => {
  const [contentList, setContentList] = useState<Content[]>(contents);
  const navigate = useNavigate();
  const { toast } = useToast();

  const toggleFeatured = (contentId: string, isFeatured: boolean) => {
    setContentList((prev) =>
      prev.map((content) =>
        content.id === contentId
          ? { ...content, featured: isFeatured }
          : content
      )
    );

    toast({
      title: isFeatured ? "Added to Featured" : "Removed from Featured",
      description: `The content has been ${isFeatured ? "added to" : "removed from"} featured content.`,
    });
  };

  const toggleTrending = (contentId: string, isTrending: boolean) => {
    setContentList((prev) =>
      prev.map((content) =>
        content.id === contentId
          ? { ...content, trending: isTrending }
          : content
      )
    );

    toast({
      title: isTrending ? "Added to Trending" : "Removed from Trending",
      description: `The content has been ${isTrending ? "added to" : "removed from"} trending content.`,
    });
  };

  return (
    <Layout>
      <main className="container mx-auto px-4 py-16 pt-28">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">Manage Featured Content</h1>
            
            <Button
              onClick={() => navigate("/admin/content")}
              className="bg-netflix-mediumGray hover:bg-netflix-mediumGray/90 text-white"
            >
              Back to Content List
            </Button>
          </div>
          
          <div className="border rounded-md border-netflix-mediumGray overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-netflix-mediumGray hover:bg-netflix-mediumGray/90">
                  <TableHead className="text-netflix-text">Title</TableHead>
                  <TableHead className="text-netflix-text">Type</TableHead>
                  <TableHead className="text-netflix-text">Year</TableHead>
                  <TableHead className="text-netflix-text">Featured</TableHead>
                  <TableHead className="text-netflix-text">Trending</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contentList.map((content) => (
                  <TableRow key={content.id} className="border-b border-netflix-mediumGray hover:bg-netflix-darkGray/50">
                    <TableCell className="font-medium text-netflix-text">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-12 bg-netflix-mediumGray rounded overflow-hidden">
                          <img
                            src={content.thumbnailUrl}
                            alt={content.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span>{content.title}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {content.type === "movie" ? (
                        <div className="flex items-center">
                          <Film className="h-4 w-4 mr-1 text-netflix-lightGray" />
                          <span>Movie</span>
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <Tv className="h-4 w-4 mr-1 text-netflix-lightGray" />
                          <span>Series</span>
                        </div>
                      )}
                    </TableCell>
                    <TableCell>{content.releaseYear}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={content.featured || false}
                          onCheckedChange={(checked) => toggleFeatured(content.id, checked)}
                        />
                        <span>{content.featured ? "Yes" : "No"}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={content.trending || false}
                          onCheckedChange={(checked) => toggleTrending(content.id, checked)}
                        />
                        <span>{content.trending ? "Yes" : "No"}</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default ManageFeatured;
