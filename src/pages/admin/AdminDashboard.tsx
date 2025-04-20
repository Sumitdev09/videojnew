
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User as UserIcon, Film, TrendingUp, Users } from "lucide-react";
import { User, Content } from "@/types";
import { contents } from "@/lib/data";

const AdminDashboard = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [activeSubscriptions, setActiveSubscriptions] = useState(0);
  const [contentCount, setContentCount] = useState(0);
  const [featuredContent, setFeaturedContent] = useState(0);

  useEffect(() => {
    // Simulate loading dashboard data
    const storedUser = localStorage.getItem("binge-buddy-user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUsers([user]);
      setActiveSubscriptions(user.subscriptionStatus === "active" ? 1 : 0);
    }
    
    // Count content
    setContentCount(contents.length);
    setFeaturedContent(contents.filter(item => item.featured).length);
  }, []);

  return (
    <Layout>
      
      <main className="container mx-auto px-4 py-16 pt-28">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            
            <div className="flex space-x-4">
              <Link 
                to="/admin/content"
                className="bg-netflix-red hover:bg-netflix-red/90 text-white px-4 py-2 rounded-md transition"
              >
                Manage Content
              </Link>
              <Link 
                to="/admin/users"
                className="bg-netflix-mediumGray hover:bg-netflix-mediumGray/80 text-white px-4 py-2 rounded-md transition"
              >
                Manage Users
              </Link>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-netflix-darkGray border-netflix-mediumGray">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-netflix-lightGray">
                  Total Users
                </CardTitle>
                <Users className="h-4 w-4 text-netflix-red" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-netflix-text">{users.length}</div>
                <p className="text-xs text-netflix-lightGray">
                  +0% from last month
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-netflix-darkGray border-netflix-mediumGray">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-netflix-lightGray">
                  Active Subscriptions
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-netflix-text">{activeSubscriptions}</div>
                <p className="text-xs text-netflix-lightGray">
                  +0% from last month
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-netflix-darkGray border-netflix-mediumGray">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-netflix-lightGray">
                  Total Content
                </CardTitle>
                <Film className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-netflix-text">{contentCount}</div>
                <p className="text-xs text-netflix-lightGray">
                  {contents.filter(c => c.type === "movie").length} movies, {contents.filter(c => c.type === "series").length} series
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-netflix-darkGray border-netflix-mediumGray">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-netflix-lightGray">
                  Featured Content
                </CardTitle>
                <UserIcon className="h-4 w-4 text-yellow-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-netflix-text">{featuredContent}</div>
                <p className="text-xs text-netflix-lightGray">
                  {Math.round((featuredContent / contentCount) * 100)}% of total content
                </p>
              </CardContent>
            </Card>
          </div>
          
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="bg-netflix-mediumGray w-full justify-start mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="recent-activity">Recent Activity</TabsTrigger>
              <TabsTrigger value="popular-content">Popular Content</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-netflix-darkGray border-netflix-mediumGray">
                  <CardHeader>
                    <CardTitle>Platform Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-netflix-lightGray mb-4">
                      This is a demo admin dashboard for the BingeBuddy streaming platform. In a real application, this would display charts, analytics, and important metrics about your platform's performance.
                    </p>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-netflix-lightGray">Total Movies</span>
                        <span className="text-netflix-text">{contents.filter(c => c.type === "movie").length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-netflix-lightGray">Total Series</span>
                        <span className="text-netflix-text">{contents.filter(c => c.type === "series").length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-netflix-lightGray">Featured Content</span>
                        <span className="text-netflix-text">{featuredContent}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-netflix-lightGray">Trending Content</span>
                        <span className="text-netflix-text">{contents.filter(c => c.trending).length}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-netflix-darkGray border-netflix-mediumGray">
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <Link 
                        to="/admin/content/new"
                        className="block w-full bg-netflix-mediumGray hover:bg-netflix-mediumGray/80 text-netflix-text px-4 py-3 rounded-md transition text-center"
                      >
                        Add New Content
                      </Link>
                      
                      <Link 
                        to="/admin/featured"
                        className="block w-full bg-netflix-mediumGray hover:bg-netflix-mediumGray/80 text-netflix-text px-4 py-3 rounded-md transition text-center"
                      >
                        Manage Featured Content
                      </Link>
                      
                      <Link 
                        to="/admin/users/new"
                        className="block w-full bg-netflix-mediumGray hover:bg-netflix-mediumGray/80 text-netflix-text px-4 py-3 rounded-md transition text-center"
                      >
                        Add New User
                      </Link>
                      
                      <Link 
                        to="/admin/reports"
                        className="block w-full bg-netflix-mediumGray hover:bg-netflix-mediumGray/80 text-netflix-text px-4 py-3 rounded-md transition text-center"
                      >
                        View Reports
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="recent-activity">
              <Card className="bg-netflix-darkGray border-netflix-mediumGray">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-netflix-lightGray text-center py-8">
                    In a real application, this would show recent user activities, content views, new subscriptions, etc.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="popular-content">
              <Card className="bg-netflix-darkGray border-netflix-mediumGray">
                <CardHeader>
                  <CardTitle>Popular Content</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-netflix-lightGray text-center py-8">
                    In a real application, this would show analytics for the most viewed content, user engagement metrics, etc.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </Layout>
  );
};

export default AdminDashboard;
