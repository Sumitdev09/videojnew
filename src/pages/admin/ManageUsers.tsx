
import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import UserList from "@/components/admin/UserList";
import { User } from "@/types";
import { useToast } from "@/components/ui/use-toast";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ManageUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);
  const { toast } = useToast();

  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"user" | "admin">("user");
  const [subscriptionTier, setSubscriptionTier] = useState<"basic" | "standard" | "premium" | null>(null);
  const [subscriptionStatus, setSubscriptionStatus] = useState<"active" | "inactive" | "pending" | null>(null);

  useEffect(() => {
    // In a real app, this would fetch users from an API
    // For demo purposes, just show the current user and a mock admin user
    const mockUsers: User[] = [
      {
        id: "1",
        email: "admin@bingebuddy.com",
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
      {
        id: "3",
        email: "demo@example.com",
        name: "Demo User",
        role: "user",
        subscriptionTier: null,
        subscriptionStatus: "inactive",
        createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ];
    
    setUsers(mockUsers);
  }, []);

  const handleEditUser = (user: User) => {
    setCurrentUser(user);
    setName(user.name || "");
    setEmail(user.email);
    setRole(user.role);
    setSubscriptionTier(user.subscriptionTier || null);
    setSubscriptionStatus(user.subscriptionStatus || null);
    setIsEditDialogOpen(true);
  };

  const handleDeleteUser = (userId: string) => {
    setUserToDelete(userId);
    setIsDeleteDialogOpen(true);
  };

  const handleSaveUser = () => {
    if (!currentUser) return;

    const updatedUser: User = {
      ...currentUser,
      name,
      email,
      role,
      subscriptionTier,
      subscriptionStatus,
    };

    setUsers((prevUsers) =>
      prevUsers.map((u) => (u.id === updatedUser.id ? updatedUser : u))
    );

    setIsEditDialogOpen(false);
    
    toast({
      title: "User updated",
      description: `User ${name || email} has been updated successfully.`,
    });
  };

  const confirmDeleteUser = () => {
    if (!userToDelete) return;

    setUsers((prevUsers) => prevUsers.filter((u) => u.id !== userToDelete));
    setIsDeleteDialogOpen(false);
    
    toast({
      title: "User deleted",
      description: "The user has been deleted successfully.",
    });
  };

  return (
    <Layout>
      
      <main className="container mx-auto px-4 py-16 pt-28">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">Manage Users</h1>
            
            <Button
              onClick={() => {}}
              className="bg-netflix-red hover:bg-netflix-red/90 text-white"
            >
              Add New User
            </Button>
          </div>
          
          <UserList
            users={users}
            onEdit={handleEditUser}
            onDelete={handleDeleteUser}
          />
        </div>
      </main>
      
      {/* Edit User Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="bg-netflix-darkGray border-netflix-mediumGray text-netflix-text">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription className="text-netflix-lightGray">
              Make changes to the user account.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-netflix-mediumGray border-netflix-darkGray text-netflix-text"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select
                value={role}
                onValueChange={(value) => setRole(value as "user" | "admin")}
              >
                <SelectTrigger className="bg-netflix-mediumGray border-netflix-darkGray text-netflix-text">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent className="bg-netflix-darkGray border-netflix-mediumGray">
                  <SelectItem value="user">User</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="subscription-tier">Subscription Tier</Label>
              <Select
                value={subscriptionTier || ""}
                onValueChange={(value) => {
                  if (value === "") {
                    setSubscriptionTier(null);
                  } else {
                    setSubscriptionTier(value as "basic" | "standard" | "premium");
                  }
                }}
              >
                <SelectTrigger className="bg-netflix-mediumGray border-netflix-darkGray text-netflix-text">
                  <SelectValue placeholder="Select subscription tier" />
                </SelectTrigger>
                <SelectContent className="bg-netflix-darkGray border-netflix-mediumGray">
                  <SelectItem value="">None</SelectItem>
                  <SelectItem value="basic">Basic</SelectItem>
                  <SelectItem value="standard">Standard</SelectItem>
                  <SelectItem value="premium">Premium</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="subscription-status">Subscription Status</Label>
              <Select
                value={subscriptionStatus || ""}
                onValueChange={(value) => {
                  if (value === "") {
                    setSubscriptionStatus(null);
                  } else {
                    setSubscriptionStatus(value as "active" | "inactive" | "pending");
                  }
                }}
              >
                <SelectTrigger className="bg-netflix-mediumGray border-netflix-darkGray text-netflix-text">
                  <SelectValue placeholder="Select subscription status" />
                </SelectTrigger>
                <SelectContent className="bg-netflix-darkGray border-netflix-mediumGray">
                  <SelectItem value="">None</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsEditDialogOpen(false)}
              className="border-netflix-lightGray text-netflix-text hover:bg-netflix-mediumGray"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSaveUser}
              className="bg-netflix-red hover:bg-netflix-red/90 text-white"
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete User Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="bg-netflix-darkGray border-netflix-mediumGray text-netflix-text">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription className="text-netflix-lightGray">
              Are you sure you want to delete this user? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsDeleteDialogOpen(false)}
              className="border-netflix-lightGray text-netflix-text hover:bg-netflix-mediumGray"
            >
              Cancel
            </Button>
            <Button 
              onClick={confirmDeleteUser}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Delete User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default ManageUsers;
