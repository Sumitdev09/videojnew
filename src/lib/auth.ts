
import { User } from "@/types";

// Mock data for development - In a real app, this would be managed by a backend
let currentUser: User | null = null;

// Mock users database
const users: User[] = [
  {
    id: "1",
    email: "admin@videoj.com",
    name: "Admin User",
    role: "admin",
    subscriptionTier: "premium",
    subscriptionStatus: "active",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    email: "user@example.com",
    name: "Regular User",
    role: "user",
    subscriptionTier: "basic",
    subscriptionStatus: "active",
    createdAt: new Date().toISOString(),
  },
];

export const login = (email: string, password: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    // Simulate API call
    setTimeout(() => {
      console.log("Login attempt:", email, password); // Debug log
      const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
      
      if (user) {
        console.log("User found:", user.email); // Debug log
        // For demo purposes, accept any password
        currentUser = user;
        localStorage.setItem("videoj-user", JSON.stringify(user));
        resolve(user);
      } else {
        console.log("User not found"); // Debug log
        reject(new Error("Invalid email or password"));
      }
    }, 800);
  });
};

export const register = (email: string, password: string, name: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    // Simulate API call
    setTimeout(() => {
      if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
        reject(new Error("Email already in use"));
        return;
      }
      
      const newUser: User = {
        id: String(users.length + 1),
        email,
        name,
        role: "user",
        subscriptionTier: null,
        subscriptionStatus: "inactive",
        createdAt: new Date().toISOString(),
      };
      
      users.push(newUser);
      currentUser = newUser;
      localStorage.setItem("videoj-user", JSON.stringify(newUser));
      resolve(newUser);
    }, 800);
  });
};

export const logout = (): void => {
  currentUser = null;
  localStorage.removeItem("videoj-user");
};

export const getCurrentUser = (): User | null => {
  if (currentUser) return currentUser;
  
  const storedUser = localStorage.getItem("videoj-user");
  if (storedUser) {
    currentUser = JSON.parse(storedUser);
    return currentUser;
  }
  
  return null;
};

export const isAdmin = (): boolean => {
  const user = getCurrentUser();
  return user?.role === "admin";
};

export const isAuthenticated = (): boolean => {
  return getCurrentUser() !== null;
};

export const hasActiveSubscription = (): boolean => {
  const user = getCurrentUser();
  return user?.subscriptionStatus === "active";
};
