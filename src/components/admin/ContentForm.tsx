
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Content } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Upload, FileVideo } from "lucide-react";

interface ContentFormProps {
  initialData?: Content;
  onSubmit: (data: Content) => void;
}

const ContentForm = ({ initialData, onSubmit }: ContentFormProps) => {
  const isEditing = !!initialData;
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState<Content>(
    initialData || {
      id: String(Date.now()),
      title: "",
      description: "",
      thumbnailUrl: "",
      bannerUrl: "",
      videoUrl: "",
      trailerUrl: "",
      type: "movie",
      genre: [],
      releaseYear: new Date().getFullYear(),
      rating: "13+",
      duration: "",
      cast: [],
      featured: false,
      trending: false,
    }
  );

  const [selectedThumbnail, setSelectedThumbnail] = useState<File | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<File | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleArrayChange = (name: string, value: string) => {
    const array = value.split(",").map((item) => item.trim());
    setFormData((prev) => ({ ...prev, [name]: array }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fileType: 'thumbnail' | 'video') => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // In a real app, you would upload this file to a server and get a URL back
      const fileUrl = URL.createObjectURL(file);
      
      if (fileType === 'thumbnail') {
        setSelectedThumbnail(file);
        setFormData(prev => ({ ...prev, thumbnailUrl: fileUrl }));
      } else if (fileType === 'video') {
        setSelectedVideo(file);
        setFormData(prev => ({ ...prev, videoUrl: fileUrl }));
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, you would handle the file uploads here
    // For now, we'll just use the existing form data
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-netflix-text">
          {isEditing ? "Edit Content" : "Add New Content"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter title"
                className="bg-netflix-mediumGray border-netflix-darkGray text-netflix-text"
                required
              />
            </div>

            <div>
              <Label htmlFor="type">Type</Label>
              <Select
                value={formData.type}
                onValueChange={(value) => handleSelectChange("type", value)}
              >
                <SelectTrigger className="bg-netflix-mediumGray border-netflix-darkGray text-netflix-text">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent className="bg-netflix-darkGray border-netflix-mediumGray">
                  <SelectItem value="movie">Movie</SelectItem>
                  <SelectItem value="series">Series</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="releaseYear">Release Year</Label>
              <Input
                id="releaseYear"
                name="releaseYear"
                type="number"
                value={formData.releaseYear}
                onChange={handleChange}
                placeholder="Enter release year"
                className="bg-netflix-mediumGray border-netflix-darkGray text-netflix-text"
                required
              />
            </div>

            <div>
              <Label htmlFor="rating">Rating</Label>
              <Select
                value={formData.rating}
                onValueChange={(value) => handleSelectChange("rating", value)}
              >
                <SelectTrigger className="bg-netflix-mediumGray border-netflix-darkGray text-netflix-text">
                  <SelectValue placeholder="Select rating" />
                </SelectTrigger>
                <SelectContent className="bg-netflix-darkGray border-netflix-mediumGray">
                  <SelectItem value="G">G</SelectItem>
                  <SelectItem value="PG">PG</SelectItem>
                  <SelectItem value="13+">13+</SelectItem>
                  <SelectItem value="16+">16+</SelectItem>
                  <SelectItem value="18+">18+</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="duration">Duration</Label>
              <Input
                id="duration"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                placeholder="E.g. 2h 30m or 45m"
                className="bg-netflix-mediumGray border-netflix-darkGray text-netflix-text"
                required
              />
            </div>

            <div>
              <Label htmlFor="genre">Genres (comma separated)</Label>
              <Input
                id="genre"
                name="genre"
                value={formData.genre.join(", ")}
                onChange={(e) => handleArrayChange("genre", e.target.value)}
                placeholder="E.g. Drama, Action, Thriller"
                className="bg-netflix-mediumGray border-netflix-darkGray text-netflix-text"
                required
              />
            </div>

            <div>
              <Label htmlFor="cast">Cast (comma separated)</Label>
              <Input
                id="cast"
                name="cast"
                value={formData.cast?.join(", ") || ""}
                onChange={(e) => handleArrayChange("cast", e.target.value)}
                placeholder="E.g. Actor 1, Actor 2, Actor 3"
                className="bg-netflix-mediumGray border-netflix-darkGray text-netflix-text"
              />
            </div>
            
            {/* Video Upload */}
            <div>
              <Label htmlFor="videoUpload" className="block mb-2">Video File</Label>
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Input
                    id="videoUpload"
                    type="file"
                    accept="video/*"
                    className="absolute inset-0 opacity-0 cursor-pointer z-10 h-full w-full"
                    onChange={(e) => handleFileChange(e, 'video')}
                  />
                  <div className="bg-netflix-mediumGray border border-dashed border-netflix-lightGray rounded-md p-4 flex items-center justify-center gap-2 text-netflix-lightGray hover:bg-netflix-darkGray/50 h-12">
                    <FileVideo className="h-5 w-5" />
                    <span>{selectedVideo ? selectedVideo.name : "Select video file"}</span>
                  </div>
                </div>
                {formData.videoUrl && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(formData.videoUrl, '_blank')}
                    className="border-netflix-lightGray text-netflix-text hover:bg-netflix-mediumGray h-12"
                  >
                    Preview
                  </Button>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter description"
                className="bg-netflix-mediumGray border-netflix-darkGray text-netflix-text h-28"
                required
              />
            </div>

            {/* Thumbnail Upload */}
            <div>
              <Label htmlFor="thumbnailUpload" className="block mb-2">Thumbnail Image</Label>
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Input
                    id="thumbnailUpload"
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 opacity-0 cursor-pointer z-10 h-full w-full"
                    onChange={(e) => handleFileChange(e, 'thumbnail')}
                  />
                  <div className="bg-netflix-mediumGray border border-dashed border-netflix-lightGray rounded-md p-4 flex items-center justify-center gap-2 text-netflix-lightGray hover:bg-netflix-darkGray/50 h-12">
                    <Upload className="h-5 w-5" />
                    <span>{selectedThumbnail ? selectedThumbnail.name : "Select thumbnail image"}</span>
                  </div>
                </div>
                {formData.thumbnailUrl && (
                  <div className="w-12 h-12 bg-netflix-mediumGray rounded overflow-hidden border border-netflix-lightGray">
                    <img
                      src={formData.thumbnailUrl}
                      alt="Thumbnail preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
              <p className="text-xs text-netflix-lightGray mt-1">
                Or enter a URL:
              </p>
              <Input
                id="thumbnailUrl"
                name="thumbnailUrl"
                value={formData.thumbnailUrl}
                onChange={handleChange}
                placeholder="Enter thumbnail URL"
                className="bg-netflix-mediumGray border-netflix-darkGray text-netflix-text mt-1"
              />
            </div>

            <div>
              <Label htmlFor="bannerUrl">Banner URL</Label>
              <Input
                id="bannerUrl"
                name="bannerUrl"
                value={formData.bannerUrl || ""}
                onChange={handleChange}
                placeholder="Enter banner URL"
                className="bg-netflix-mediumGray border-netflix-darkGray text-netflix-text"
              />
            </div>

            <div>
              <Label htmlFor="trailerUrl">Trailer URL</Label>
              <Input
                id="trailerUrl"
                name="trailerUrl"
                value={formData.trailerUrl || ""}
                onChange={handleChange}
                placeholder="Enter trailer URL"
                className="bg-netflix-mediumGray border-netflix-darkGray text-netflix-text"
              />
            </div>

            <div className="pt-2 space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="featured"
                  checked={formData.featured || false}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange("featured", checked as boolean)
                  }
                />
                <Label htmlFor="featured">Featured Content</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="trending"
                  checked={formData.trending || false}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange("trending", checked as boolean)
                  }
                />
                <Label htmlFor="trending">Trending Content</Label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-4 pt-4">
        <Button
          type="button"
          variant="outline"
          className="border-netflix-lightGray text-netflix-text hover:bg-netflix-mediumGray"
          onClick={() => navigate("/admin/content")}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="bg-netflix-red hover:bg-netflix-red/90 text-white"
        >
          {isEditing ? "Update" : "Create"}
        </Button>
      </div>
    </form>
  );
};

export default ContentForm;
