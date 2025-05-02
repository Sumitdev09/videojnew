
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { contents } from "@/lib/data";

const Reports = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");

  const generateReport = (type: string) => {
    toast({
      title: "Report Generated",
      description: `The ${type} report has been generated.`,
    });
  };

  // Get some stats for the reports
  const moviesCount = contents.filter(c => c.type === "movie").length;
  const seriesCount = contents.filter(c => c.type === "series").length;
  const featuredCount = contents.filter(c => c.featured).length;
  const trendingCount = contents.filter(c => c.trending).length;
  
  // Generate top 5 trending content for demo
  const topContent = [...contents]
    .sort(() => 0.5 - Math.random()) // Random sorting for demo
    .slice(0, 5)
    .map((content, index) => ({
      ...content,
      views: Math.floor(Math.random() * 10000) + 1000, // Random view count for demo
    }));

  return (
    <Layout>
      <main className="container mx-auto px-4 py-16 pt-28">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">Reports</h1>
            
            <div className="flex space-x-4">
              <Button
                onClick={() => generateReport("user activity")}
                className="bg-netflix-mediumGray hover:bg-netflix-mediumGray/80 text-netflix-text"
              >
                Generate Activity Report
              </Button>
              <Button
                onClick={() => generateReport("content performance")}
                className="bg-netflix-red hover:bg-netflix-red/90 text-white"
              >
                Export Reports
              </Button>
            </div>
          </div>
          
          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="bg-netflix-mediumGray w-full justify-start mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="content">Content Reports</TabsTrigger>
              <TabsTrigger value="users">User Reports</TabsTrigger>
              <TabsTrigger value="subscriptions">Subscription Reports</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-netflix-darkGray border-netflix-mediumGray">
                  <CardHeader>
                    <CardTitle>Platform Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="bg-netflix-mediumGray/20 p-4 rounded-md">
                        <h3 className="font-bold mb-2">Content Distribution</h3>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>Movies</span>
                            <span>{moviesCount}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Series</span>
                            <span>{seriesCount}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Featured</span>
                            <span>{featuredCount}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Trending</span>
                            <span>{trendingCount}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-netflix-mediumGray/20 p-4 rounded-md">
                        <h3 className="font-bold mb-2">User Metrics</h3>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>Total Users</span>
                            <span>1</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Active Subscriptions</span>
                            <span>1</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-netflix-darkGray border-netflix-mediumGray">
                  <CardHeader>
                    <CardTitle>Popular Content</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow className="border-netflix-mediumGray hover:bg-transparent">
                          <TableHead className="text-netflix-lightGray">Title</TableHead>
                          <TableHead className="text-netflix-lightGray">Type</TableHead>
                          <TableHead className="text-netflix-lightGray text-right">Views</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {topContent.map((content) => (
                          <TableRow key={content.id} className="border-netflix-mediumGray hover:bg-netflix-darkGray/50">
                            <TableCell className="font-medium">{content.title}</TableCell>
                            <TableCell>{content.type === "movie" ? "Movie" : "Series"}</TableCell>
                            <TableCell className="text-right">{content.views?.toLocaleString()}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="content">
              <Card className="bg-netflix-darkGray border-netflix-mediumGray">
                <CardHeader>
                  <CardTitle>Content Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-netflix-lightGray mb-6">
                    This report shows the performance metrics for all content on the platform. 
                    In a real application, this would include views, completion rates, and user ratings.
                  </p>
                  
                  <div className="text-center py-12 bg-netflix-mediumGray/20 rounded-md">
                    <p className="text-netflix-lightGray mb-4">Content performance chart would appear here</p>
                    <Button 
                      onClick={() => generateReport("content performance")}
                      className="bg-netflix-red hover:bg-netflix-red/90 text-white"
                    >
                      Generate Detailed Report
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="users">
              <Card className="bg-netflix-darkGray border-netflix-mediumGray">
                <CardHeader>
                  <CardTitle>User Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-netflix-lightGray mb-6">
                    This report shows user activity metrics including logins, watch time, and subscription changes.
                    In a real application, this would include detailed user analytics.
                  </p>
                  
                  <div className="text-center py-12 bg-netflix-mediumGray/20 rounded-md">
                    <p className="text-netflix-lightGray mb-4">User activity chart would appear here</p>
                    <Button 
                      onClick={() => generateReport("user activity")}
                      className="bg-netflix-red hover:bg-netflix-red/90 text-white"
                    >
                      Generate User Report
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="subscriptions">
              <Card className="bg-netflix-darkGray border-netflix-mediumGray">
                <CardHeader>
                  <CardTitle>Subscription Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-netflix-lightGray mb-6">
                    This report shows subscription analytics including conversions, upgrades, and churn rate.
                    In a real application, this would include revenue metrics and subscription trends.
                  </p>
                  
                  <div className="text-center py-12 bg-netflix-mediumGray/20 rounded-md">
                    <p className="text-netflix-lightGray mb-4">Subscription analytics chart would appear here</p>
                    <Button 
                      onClick={() => generateReport("subscription")}
                      className="bg-netflix-red hover:bg-netflix-red/90 text-white"
                    >
                      Generate Subscription Report
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </Layout>
  );
};

export default Reports;
