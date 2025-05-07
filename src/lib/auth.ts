
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
      const user = users.find((u) => u.email === email);
      if (user && password === "password") { // In a real app, we'd use proper password hashing
        currentUser = user;
        localStorage.setItem("binge-buddy-user", JSON.stringify(user));
        resolve(user);
      } else {
        reject(new Error("Invalid email or password"));
      }
    }, 800);
  });
};

export const register = (email: string, password: string, name: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    // Simulate API call
    setTimeout(() => {
      if (users.some((u) => u.email === email)) {
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
      localStorage.setItem("binge-buddy-user", JSON.stringify(newUser));
      resolve(newUser);
    }, 800);
  });
};

export const logout = (): void => {
  currentUser = null;
  localStorage.removeItem("binge-buddy-user");
};

export const getCurrentUser = (): User | null => {
  if (currentUser) return currentUser;
  
  const storedUser = localStorage.getItem("binge-buddy-user");
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
