
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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

            <div>
              <Label htmlFor="thumbnailUrl">Thumbnail URL</Label>
              <Input
                id="thumbnailUrl"
                name="thumbnailUrl"
                value={formData.thumbnailUrl}
                onChange={handleChange}
                placeholder="Enter thumbnail URL"
                className="bg-netflix-mediumGray border-netflix-darkGray text-netflix-text"
                required
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
