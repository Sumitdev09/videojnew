
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Edit, Search, Trash, Eye, Film, Tv } from "lucide-react";

const ManageContent = () => {
  const [contentList, setContentList] = useState<Content[]>(contents);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [contentToDelete, setContentToDelete] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const filteredContent = contentList.filter(
    (content) =>
      content.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      content.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      content.genre.some((g) => g.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleEditContent = (contentId: string) => {
    navigate(`/admin/content/edit/${contentId}`);
  };

  const handleDeleteContent = (contentId: string) => {
    setContentToDelete(contentId);
    setIsDeleteDialogOpen(true);
  };

  const confirmDeleteContent = () => {
    if (!contentToDelete) return;

    setContentList((prevContent) => 
      prevContent.filter((c) => c.id !== contentToDelete)
    );
    setIsDeleteDialogOpen(false);
    
    toast({
      title: "Content deleted",
      description: "The content has been deleted successfully.",
    });
  };

  const handleViewContent = (contentId: string) => {
    navigate(`/details/${contentId}`);
  };

  return (
    <Layout>
      <main className="container mx-auto px-4 py-16 pt-28">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">Manage Content</h1>
            
            <Button
              onClick={() => navigate("/admin/content/new")}
              className="bg-netflix-red hover:bg-netflix-red/90 text-white"
            >
              Add New Content
            </Button>
          </div>
          
          <div className="relative w-full mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search content..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 bg-netflix-mediumGray border-netflix-darkGray text-netflix-text w-full"
            />
          </div>
          
          <div className="border rounded-md border-netflix-mediumGray overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-netflix-mediumGray hover:bg-netflix-mediumGray/90">
                  <TableHead className="text-netflix-text">Title</TableHead>
                  <TableHead className="text-netflix-text">Type</TableHead>
                  <TableHead className="text-netflix-text">Year</TableHead>
                  <TableHead className="text-netflix-text">Rating</TableHead>
                  <TableHead className="text-netflix-text">Genres</TableHead>
                  <TableHead className="text-netflix-text">Status</TableHead>
                  <TableHead className="text-netflix-text text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredContent.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center h-24 text-netflix-lightGray">
                      No content found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredContent.map((content) => (
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
                        <Badge variant="outline" className="text-netflix-text border-netflix-lightGray">
                          {content.rating}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {content.genre.slice(0, 2).map((genre) => (
                            <Badge key={genre} className="bg-netflix-mediumGray hover:bg-netflix-mediumGray text-netflix-text">
                              {genre}
                            </Badge>
                          ))}
                          {content.genre.length > 2 && (
                            <Badge className="bg-netflix-mediumGray hover:bg-netflix-mediumGray text-netflix-text">
                              +{content.genre.length - 2}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {content.featured && (
                            <Badge className="bg-yellow-600 hover:bg-yellow-700 text-white">
                              Featured
                            </Badge>
                          )}
                          {content.trending && (
                            <Badge className="bg-green-600 hover:bg-green-700 text-white">
                              Trending
                            </Badge>
                          )}
                          {!content.featured && !content.trending && (
                            <Badge className="bg-netflix-mediumGray hover:bg-netflix-mediumGray text-netflix-text">
                              Regular
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="text-netflix-lightGray hover:text-netflix-text">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-netflix-darkGray border-netflix-mediumGray">
                            <DropdownMenuItem 
                              onClick={() => handleViewContent(content.id)}
                              className="cursor-pointer text-netflix-text hover:bg-netflix-mediumGray"
                            >
                              <Eye className="h-4 w-4 mr-2" /> View Content
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleEditContent(content.id)}
                              className="cursor-pointer text-netflix-text hover:bg-netflix-mediumGray"
                            >
                              <Edit className="h-4 w-4 mr-2" /> Edit Content
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleDeleteContent(content.id)}
                              className="cursor-pointer text-red-500 hover:bg-netflix-mediumGray"
                            >
                              <Trash className="h-4 w-4 mr-2" /> Delete Content
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </main>
      
      {/* Delete Content Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="bg-netflix-darkGray border-netflix-mediumGray text-netflix-text">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription className="text-netflix-lightGray">
              Are you sure you want to delete this content? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsDeleteDialogOpen(false)}
              className="border-netflix-lightGray text-netflix-text hover:bg-netflix-mediumGray"
            >
              Cancel
            </Button>
            <Button 
              onClick={confirmDeleteContent}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Delete Content
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default ManageContent;
