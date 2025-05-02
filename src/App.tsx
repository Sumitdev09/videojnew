
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/auth-context";
import ProtectedRoute from "@/components/layout/ProtectedRoute";
import NotFound from "@/pages/NotFound";

// Pages
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Search from "@/pages/Search";
import Subscription from "@/pages/Subscription";
import Account from "@/pages/Account";
import ContentDetails from "@/pages/ContentDetails";
import WatchContent from "@/pages/WatchContent";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import ManageUsers from "@/pages/admin/ManageUsers";
import ManageContent from "@/pages/admin/ManageContent";
import Movies from "@/pages/Movies";
import Series from "@/pages/Series";
import MyList from "@/pages/MyList";

// New Admin Pages
import AddContent from "@/pages/admin/AddContent";
import EditContent from "@/pages/admin/EditContent";
import ManageFeatured from "@/pages/admin/ManageFeatured";
import AddUser from "@/pages/admin/AddUser";
import Reports from "@/pages/admin/Reports";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Protected Routes */}
            <Route path="/" element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } />
            <Route path="/search" element={
              <ProtectedRoute>
                <Search />
              </ProtectedRoute>
            } />
            <Route path="/movies" element={
              <ProtectedRoute>
                <Movies />
              </ProtectedRoute>
            } />
            <Route path="/series" element={
              <ProtectedRoute>
                <Series />
              </ProtectedRoute>
            } />
            <Route path="/my-list" element={
              <ProtectedRoute>
                <MyList />
              </ProtectedRoute>
            } />
            <Route path="/subscription" element={
              <ProtectedRoute>
                <Subscription />
              </ProtectedRoute>
            } />
            <Route path="/account" element={
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            } />
            <Route path="/details/:id" element={
              <ProtectedRoute>
                <ContentDetails />
              </ProtectedRoute>
            } />
            <Route path="/watch/:id" element={
              <ProtectedRoute requireSubscription>
                <WatchContent />
              </ProtectedRoute>
            } />
            
            {/* Admin Routes */}
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute requireAdmin>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/users" 
              element={
                <ProtectedRoute requireAdmin>
                  <ManageUsers />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/content" 
              element={
                <ProtectedRoute requireAdmin>
                  <ManageContent />
                </ProtectedRoute>
              } 
            />
            {/* New Admin Routes */}
            <Route 
              path="/admin/content/new" 
              element={
                <ProtectedRoute requireAdmin>
                  <AddContent />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/content/edit/:id" 
              element={
                <ProtectedRoute requireAdmin>
                  <EditContent />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/featured" 
              element={
                <ProtectedRoute requireAdmin>
                  <ManageFeatured />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/users/new" 
              element={
                <ProtectedRoute requireAdmin>
                  <AddUser />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/reports" 
              element={
                <ProtectedRoute requireAdmin>
                  <Reports />
                </ProtectedRoute>
              } 
            />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
