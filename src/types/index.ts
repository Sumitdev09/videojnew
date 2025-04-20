
export interface User {
  id: string;
  email: string;
  name?: string;
  role: "user" | "admin";
  subscriptionTier?: "basic" | "standard" | "premium" | null;
  subscriptionStatus?: "active" | "inactive" | "pending" | null;
  createdAt: string;
}

export interface Content {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  bannerUrl?: string;
  videoUrl?: string;
  trailerUrl?: string;
  type: "movie" | "series";
  genre: string[];
  releaseYear: number;
  rating: string;
  duration?: string;
  cast?: string[];
  featured?: boolean;
  trending?: boolean;
}

export interface Subscription {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
}
