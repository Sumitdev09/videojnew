
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { 
  BadgeCheck,
  CreditCard,
  LogOut,
  Settings,
  User as UserIcon,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const Account = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleUpdateProfile = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      
      toast({
        title: "Profile updated",
        description: "Your profile information has been updated successfully.",
      });
    }, 1000);
  };
  
  const handleUpdatePassword = () => {
    if (password !== confirmPassword) {
      toast({
        title: "Password mismatch",
        description: "The passwords you entered do not match.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsPasswordDialogOpen(false);
      setPassword("");
      setConfirmPassword("");
      
      toast({
        title: "Password updated",
        description: "Your password has been changed successfully.",
      });
    }, 1000);
  };
  
  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 pt-28">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">My Account</h1>
          
          {user?.subscriptionTier && (
            <div className="mb-8 p-4 border border-netflix-red rounded-md bg-netflix-darkGray flex gap-3 items-center">
              <BadgeCheck className="text-netflix-red h-6 w-6" />
              <div>
                <p className="text-lg font-medium">
                  {user.subscriptionTier.charAt(0).toUpperCase() + user.subscriptionTier.slice(1)} Plan
                </p>
                <p className="text-netflix-lightGray">
                  {user.subscriptionStatus === "active" 
                    ? "Your subscription is active." 
                    : "Your subscription needs attention."}
                </p>
              </div>
              <div className="ml-auto">
                <Button
                  variant="outline"
                  onClick={() => navigate("/subscription")}
                  className="border-netflix-red text-netflix-red hover:bg-netflix-red/10"
                >
                  Manage Plan
                </Button>
              </div>
            </div>
          )}
          
          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="bg-netflix-mediumGray">
              <TabsTrigger value="profile" className="data-[state=active]:bg-netflix-darkGray">
                <UserIcon className="h-4 w-4 mr-2" /> Profile
              </TabsTrigger>
              <TabsTrigger value="subscription" className="data-[state=active]:bg-netflix-darkGray">
                <CreditCard className="h-4 w-4 mr-2" /> Subscription
              </TabsTrigger>
              <TabsTrigger value="settings" className="data-[state=active]:bg-netflix-darkGray">
                <Settings className="h-4 w-4 mr-2" /> Settings
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile">
              <Card className="bg-netflix-darkGray border-netflix-mediumGray">
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>
                    Update your account profile information and email address.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input 
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="bg-netflix-mediumGray border-netflix-darkGray text-netflix-text"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-netflix-mediumGray border-netflix-darkGray text-netflix-text"
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button 
                    variant="outline"
                    onClick={() => setIsPasswordDialogOpen(true)}
                    className="border-netflix-lightGray text-netflix-text hover:bg-netflix-mediumGray"
                  >
                    Change Password
                  </Button>
                  <Button 
                    onClick={handleUpdateProfile}
                    disabled={isLoading}
                    className="bg-netflix-red hover:bg-netflix-red/90 text-white"
                  >
                    {isLoading ? "Saving..." : "Save Changes"}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="subscription">
              <Card className="bg-netflix-darkGray border-netflix-mediumGray">
                <CardHeader>
                  <CardTitle>Subscription Details</CardTitle>
                  <CardDescription>
                    View and manage your subscription details.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {user?.subscriptionTier ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="text-netflix-lightGray">Current Plan:</div>
                        <div className="text-netflix-text font-medium">
                          {user.subscriptionTier.charAt(0).toUpperCase() + user.subscriptionTier.slice(1)}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="text-netflix-lightGray">Status:</div>
                        <div className="text-netflix-text font-medium">
                          {user.subscriptionStatus === "active" ? (
                            <span className="text-green-500">Active</span>
                          ) : (
                            <span className="text-yellow-500">Inactive</span>
                          )}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="text-netflix-lightGray">Billing Date:</div>
                        <div className="text-netflix-text font-medium">
                          Next billing on May 15, 2025
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="text-netflix-lightGray">Payment Method:</div>
                        <div className="text-netflix-text font-medium">
                          Visa ending in 4242
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-netflix-lightGray mb-4">
                        You don't have an active subscription.
                      </p>
                      <Button
                        onClick={() => navigate("/subscription")}
                        className="bg-netflix-red hover:bg-netflix-red/90 text-white"
                      >
                        Subscribe Now
                      </Button>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between">
                  {user?.subscriptionTier && (
                    <>
                      <Button 
                        variant="outline" 
                        className="border-red-500 text-red-500 hover:bg-red-900/10"
                      >
                        Cancel Subscription
                      </Button>
                      <Button 
                        onClick={() => navigate("/subscription")}
                        className="bg-netflix-red hover:bg-netflix-red/90 text-white"
                      >
                        Change Plan
                      </Button>
                    </>
                  )}
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="settings">
              <Card className="bg-netflix-darkGray border-netflix-mediumGray">
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>
                    Manage your account settings and preferences.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border-b border-netflix-mediumGray pb-4">
                    <h3 className="text-lg font-medium mb-2">Account Actions</h3>
                    <Button 
                      variant="destructive"
                      onClick={handleLogout}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </Button>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2">Danger Zone</h3>
                    <Button 
                      variant="outline"
                      className="border-red-500 text-red-500 hover:bg-red-900/10"
                    >
                      Delete Account
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      {/* Password Change Dialog */}
      <Dialog open={isPasswordDialogOpen} onOpenChange={setIsPasswordDialogOpen}>
        <DialogContent className="bg-netflix-darkGray border-netflix-mediumGray text-netflix-text">
          <DialogHeader>
            <DialogTitle>Change Password</DialogTitle>
            <DialogDescription className="text-netflix-lightGray">
              Enter your new password below.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input
                id="new-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-netflix-mediumGray border-netflix-darkGray text-netflix-text"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <Input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="bg-netflix-mediumGray border-netflix-darkGray text-netflix-text"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsPasswordDialogOpen(false)}
              className="border-netflix-lightGray text-netflix-text hover:bg-netflix-mediumGray"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleUpdatePassword}
              disabled={isLoading}
              className="bg-netflix-red hover:bg-netflix-red/90 text-white"
            >
              {isLoading ? "Updating..." : "Update Password"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Account;
