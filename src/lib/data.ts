
import { Content, Subscription } from "@/types";

// Initial mock content data with real video URLs and updated image links
const initialContents: Content[] = [
  {
    id: "1",
    title: "Stranger Things",
    description: "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces, and one strange little girl.",
    thumbnailUrl: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=450&q=80",
    bannerUrl: "https://images.unsplash.com/photo-1506512479288-fc0e36d34283?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=1080&q=80",
    trailerUrl: "https://www.youtube.com/watch?v=b9EkMc79ZSU",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-mystery-man-looking-at-a-foggy-forest-4173-large.mp4",
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
    thumbnailUrl: "https://images.unsplash.com/photo-1585504198199-20277593b94f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=450&q=80",
    bannerUrl: "https://images.unsplash.com/photo-1582266255765-fa5cf1a1d501?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=1080&q=80",
    trailerUrl: "https://www.youtube.com/watch?v=CDrieqwSdgI",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-woman-thinking-in-a-modern-office-4048-large.mp4",
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
    thumbnailUrl: "https://images.unsplash.com/photo-1612266666726-91ab12d45c87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=450&q=80",
    bannerUrl: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=1080&q=80",
    trailerUrl: "https://www.youtube.com/watch?v=HhesaQXLuRY",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-man-under-multicolored-lights-4196-large.mp4",
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
    thumbnailUrl: "https://images.unsplash.com/photo-1514539079130-25950c84af65?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=450&q=80",
    bannerUrl: "https://images.unsplash.com/photo-1553696590-4b3f68898333?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=1080&q=80",
    trailerUrl: "https://www.youtube.com/watch?v=ndl1W4ltcmg",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-medieval-fighting-scene-fantasy-6170-large.mp4",
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
    thumbnailUrl: "https://images.unsplash.com/photo-1487174244970-cd18784bb4a4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=450&q=80",
    bannerUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=1080&q=80",
    trailerUrl: "https://www.youtube.com/watch?v=YoHD9XEInc0",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-flying-over-a-city-at-night-9182-large.mp4",
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
    thumbnailUrl: "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=450&q=80",
    bannerUrl: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=1080&q=80",
    trailerUrl: "https://www.youtube.com/watch?v=EXeTwQWrcwY",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-rain-falling-on-the-water-of-a-lake-seen-up-18312-large.mp4",
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
    thumbnailUrl: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=450&q=80",
    bannerUrl: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=1080&q=80",
    trailerUrl: "https://www.youtube.com/watch?v=zSWdZVtXT7E",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-stars-in-space-1610-large.mp4",
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
    thumbnailUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=450&q=80",
    bannerUrl: "https://images.unsplash.com/photo-1541252260730-0412e8e2108e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=1080&q=80",
    trailerUrl: "https://www.youtube.com/watch?v=6hB3S9bIaco",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-man-runs-past-ground-level-shot-32809-large.mp4",
    type: "movie",
    genre: ["Drama"],
    releaseYear: 1994,
    rating: "16+",
    duration: "2h 22m"
  },
  {
    id: "9",
    title: "Pulp Fiction",
    description: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    thumbnailUrl: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=450&q=80",
    bannerUrl: "https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=1080&q=80",
    trailerUrl: "https://www.youtube.com/watch?v=s7EdQ4FqbhY",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-urban-life-of-a-big-city-at-night-11784-large.mp4",
    type: "movie",
    genre: ["Crime", "Drama"],
    releaseYear: 1994,
    rating: "18+",
    duration: "2h 34m",
    trending: true
  },
  {
    id: "10",
    title: "The Matrix",
    description: "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
    thumbnailUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=450&q=80",
    bannerUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=1080&q=80",
    trailerUrl: "https://www.youtube.com/watch?v=vKQi3bBA1y8",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-a-city-at-night-11280-large.mp4",
    type: "movie",
    genre: ["Action", "Sci-Fi"],
    releaseYear: 1999,
    rating: "16+",
    duration: "2h 16m",
    featured: true
  },
  {
    id: "11",
    title: "Game of Thrones",
    description: "Nine noble families fight for control over the lands of Westeros, while an ancient enemy returns after being dormant for millennia.",
    thumbnailUrl: "https://images.unsplash.com/photo-1599719500956-d158a3a7f69b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=450&q=80",
    bannerUrl: "https://images.unsplash.com/photo-1488866022504-f2584929ca5f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=1080&q=80",
    trailerUrl: "https://www.youtube.com/watch?v=KPLWWIOCOOQ",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-clouds-moving-over-a-mountain-range-at-dawn-4052-large.mp4",
    type: "series",
    genre: ["Action", "Adventure", "Drama"],
    releaseYear: 2011,
    rating: "18+",
    duration: "57m",
    trending: true
  },
  {
    id: "12",
    title: "Black Mirror",
    description: "An anthology series exploring a twisted, high-tech multiverse where humanity's greatest innovations and darkest instincts collide.",
    thumbnailUrl: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=450&q=80",
    bannerUrl: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=1080&q=80",
    trailerUrl: "https://www.youtube.com/watch?v=jROLrhQkK78",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-digital-native-woman-working-at-home-4807-large.mp4",
    type: "series",
    genre: ["Drama", "Sci-Fi", "Thriller"],
    releaseYear: 2011,
    rating: "18+",
    duration: "60m",
    featured: true
  }
];

// Get content from localStorage or use initial content
export const getContent = (): Content[] => {
  const savedContent = localStorage.getItem('netflix-content');
  if (savedContent) {
    try {
      return JSON.parse(savedContent);
    } catch (e) {
      console.error('Error parsing content from localStorage', e);
      return initialContents;
    }
  }
  return initialContents;
};

// Save content to localStorage
export const saveContent = (content: Content[]): void => {
  localStorage.setItem('netflix-content', JSON.stringify(content));
};

// Export contents to maintain compatibility with existing code
export const contents = getContent();

// Functions to manipulate data
export const getContentById = (id: string): Content | undefined => {
  // Always get the latest content from localStorage
  const currentContent = getContent();
  return currentContent.find(content => content.id === id);
};

export const getContentByGenre = (genre: string): Content[] => {
  // Always get the latest content from localStorage
  const currentContent = getContent();
  return currentContent.filter(content => content.genre.includes(genre));
};

export const getFeaturedContent = (): Content[] => {
  // Always get the latest content from localStorage
  const currentContent = getContent();
  return currentContent.filter(content => content.featured);
};

export const getTrendingContent = (): Content[] => {
  // Always get the latest content from localStorage
  const currentContent = getContent();
  return currentContent.filter(content => content.trending);
};

export const getMovies = (): Content[] => {
  // Always get the latest content from localStorage
  const currentContent = getContent();
  return currentContent.filter(content => content.type === "movie");
};

export const getSeries = (): Content[] => {
  // Always get the latest content from localStorage
  const currentContent = getContent();
  return currentContent.filter(content => content.type === "series");
};

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

export const getSubscriptionById = (id: string): Subscription | undefined => {
  return subscriptionPlans.find(plan => plan.id === id);
};
