
import { Content, Subscription } from "@/types";

// Mock content data
export const contents: Content[] = [
  {
    id: "1",
    title: "Stranger Things",
    description: "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces, and one strange little girl.",
    thumbnailUrl: "https://source.unsplash.com/random/300x450?movie",
    bannerUrl: "https://source.unsplash.com/random/1920x1080?dark",
    trailerUrl: "https://www.youtube.com/watch?v=b9EkMc79ZSU",
    type: "series",
    genre: ["Drama", "Fantasy", "Horror"],
    releaseYear: 2016,
    rating: "16+",
    duration: "50m",
    cast: ["Millie Bobby Brown", "Finn Wolfhard", "Winona Ryder"],
    featured: true,
    trending: true
  },
  {
    id: "2",
    title: "The Queen's Gambit",
    description: "In a 1950s orphanage, a young girl reveals an astonishing talent for chess and begins an unlikely journey to stardom while grappling with addiction.",
    thumbnailUrl: "https://source.unsplash.com/random/300x450?chess",
    bannerUrl: "https://source.unsplash.com/random/1920x1080?chess",
    trailerUrl: "https://www.youtube.com/watch?v=CDrieqwSdgI",
    type: "series",
    genre: ["Drama"],
    releaseYear: 2020,
    rating: "16+",
    duration: "60m",
    featured: true
  },
  {
    id: "3",
    title: "Breaking Bad",
    description: "A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine to secure his family's future.",
    thumbnailUrl: "https://source.unsplash.com/random/300x450?desert",
    bannerUrl: "https://source.unsplash.com/random/1920x1080?desert",
    trailerUrl: "https://www.youtube.com/watch?v=HhesaQXLuRY",
    type: "series",
    genre: ["Drama", "Crime", "Thriller"],
    releaseYear: 2008,
    rating: "18+",
    duration: "49m",
    trending: true
  },
  {
    id: "4",
    title: "The Witcher",
    description: "Geralt of Rivia, a mutated monster-hunter for hire, journeys toward his destiny in a turbulent world where people often prove more wicked than beasts.",
    thumbnailUrl: "https://source.unsplash.com/random/300x450?fantasy",
    bannerUrl: "https://source.unsplash.com/random/1920x1080?fantasy",
    trailerUrl: "https://www.youtube.com/watch?v=ndl1W4ltcmg",
    type: "series",
    genre: ["Fantasy", "Action", "Adventure"],
    releaseYear: 2019,
    rating: "18+",
    duration: "60m",
    featured: true
  },
  {
    id: "5",
    title: "Inception",
    description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    thumbnailUrl: "https://source.unsplash.com/random/300x450?dream",
    bannerUrl: "https://source.unsplash.com/random/1920x1080?dream",
    trailerUrl: "https://www.youtube.com/watch?v=YoHD9XEInc0",
    type: "movie",
    genre: ["Action", "Adventure", "Sci-Fi"],
    releaseYear: 2010,
    rating: "13+",
    duration: "2h 28m",
    featured: true
  },
  {
    id: "6",
    title: "The Dark Knight",
    description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    thumbnailUrl: "https://source.unsplash.com/random/300x450?night",
    bannerUrl: "https://source.unsplash.com/random/1920x1080?night",
    trailerUrl: "https://www.youtube.com/watch?v=EXeTwQWrcwY",
    type: "movie",
    genre: ["Action", "Crime", "Drama"],
    releaseYear: 2008,
    rating: "13+",
    duration: "2h 32m",
    trending: true
  },
  {
    id: "7",
    title: "Interstellar",
    description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    thumbnailUrl: "https://source.unsplash.com/random/300x450?space",
    bannerUrl: "https://source.unsplash.com/random/1920x1080?space",
    trailerUrl: "https://www.youtube.com/watch?v=zSWdZVtXT7E",
    type: "movie",
    genre: ["Adventure", "Drama", "Sci-Fi"],
    releaseYear: 2014,
    rating: "13+",
    duration: "2h 49m",
    featured: true
  },
  {
    id: "8",
    title: "The Shawshank Redemption",
    description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    thumbnailUrl: "https://source.unsplash.com/random/300x450?prison",
    bannerUrl: "https://source.unsplash.com/random/1920x1080?prison",
    trailerUrl: "https://www.youtube.com/watch?v=6hB3S9bIaco",
    type: "movie",
    genre: ["Drama"],
    releaseYear: 1994,
    rating: "16+",
    duration: "2h 22m"
  }
];

// Subscription plans
export const subscriptionPlans: Subscription[] = [
  {
    id: "1",
    name: "Basic",
    price: 8.99,
    description: "Good video quality in SD (480p). Watch on any phone, tablet, computer or TV.",
    features: [
      "Watch on 1 device at a time",
      "Unlimited movies and TV shows",
      "Download on 1 device"
    ]
  },
  {
    id: "2",
    name: "Standard",
    price: 13.99,
    description: "Great video quality in Full HD (1080p). Watch on any phone, tablet, computer or TV.",
    features: [
      "Watch on 2 devices at a time",
      "Unlimited movies and TV shows",
      "Download on 2 devices",
      "Full HD available"
    ]
  },
  {
    id: "3",
    name: "Premium",
    price: 17.99,
    description: "Our best video quality in Ultra HD (4K) and HDR. Watch on any phone, tablet, computer or TV.",
    features: [
      "Watch on 4 devices at a time",
      "Unlimited movies and TV shows",
      "Download on 4 devices",
      "Full HD and Ultra HD available",
      "Access to exclusive premium content"
    ]
  }
];

// Functions to manipulate data
export const getContentById = (id: string): Content | undefined => {
  return contents.find(content => content.id === id);
};

export const getContentByGenre = (genre: string): Content[] => {
  return contents.filter(content => content.genre.includes(genre));
};

export const getFeaturedContent = (): Content[] => {
  return contents.filter(content => content.featured);
};

export const getTrendingContent = (): Content[] => {
  return contents.filter(content => content.trending);
};

export const getMovies = (): Content[] => {
  return contents.filter(content => content.type === "movie");
};

export const getSeries = (): Content[] => {
  return contents.filter(content => content.type === "series");
};

export const getSubscriptionById = (id: string): Subscription | undefined => {
  return subscriptionPlans.find(plan => plan.id === id);
};
