
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
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
import { useToast } from "@/components/ui/use-toast";

const AddUser = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "user",
    subscriptionTier: "basic",
    subscriptionStatus: "active",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would create a user in the backend
    // Here we'll just show a success message and navigate back
    
    toast({
      title: "User created",
      description: `${formData.name} has been added successfully.`,
    });
    
    // Navigate back to users list
    navigate("/admin/users");
  };

  return (
    <Layout>
      <main className="container mx-auto px-4 py-16 pt-28">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Add New User</h1>
          </div>
          
          <div className="bg-netflix-darkGray border border-netflix-mediumGray rounded-md p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter full name"
                    className="bg-netflix-mediumGray border-netflix-darkGray text-netflix-text"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter email address"
                    className="bg-netflix-mediumGray border-netflix-darkGray text-netflix-text"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="role">Role</Label>
                  <Select
                    value={formData.role}
                    onValueChange={(value) => handleSelectChange("role", value)}
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
                
                <div>
                  <Label htmlFor="subscriptionTier">Subscription Tier</Label>
                  <Select
                    value={formData.subscriptionTier}
                    onValueChange={(value) => handleSelectChange("subscriptionTier", value)}
                  >
                    <SelectTrigger className="bg-netflix-mediumGray border-netflix-darkGray text-netflix-text">
                      <SelectValue placeholder="Select subscription tier" />
                    </SelectTrigger>
                    <SelectContent className="bg-netflix-darkGray border-netflix-mediumGray">
                      <SelectItem value="basic">Basic</SelectItem>
                      <SelectItem value="standard">Standard</SelectItem>
                      <SelectItem value="premium">Premium</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="subscriptionStatus">Subscription Status</Label>
                  <Select
                    value={formData.subscriptionStatus}
                    onValueChange={(value) => handleSelectChange("subscriptionStatus", value)}
                  >
                    <SelectTrigger className="bg-netflix-mediumGray border-netflix-darkGray text-netflix-text">
                      <SelectValue placeholder="Select subscription status" />
                    </SelectTrigger>
                    <SelectContent className="bg-netflix-darkGray border-netflix-mediumGray">
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex justify-end space-x-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  className="border-netflix-lightGray text-netflix-text hover:bg-netflix-mediumGray"
                  onClick={() => navigate("/admin/users")}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-netflix-red hover:bg-netflix-red/90 text-white"
                >
                  Create User
                </Button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default AddUser;
