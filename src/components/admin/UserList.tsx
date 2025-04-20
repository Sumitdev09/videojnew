
import { useState } from "react";
import { User } from "@/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Check, Edit, Search, Trash, User as UserIcon } from "lucide-react";

interface UserListProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (userId: string) => void;
}

const UserList = ({ users, onEdit, onDelete }: UserListProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = users.filter(
    (user) =>
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getSubscriptionBadge = (status: string | undefined) => {
    if (!status) return null;
    
    const color = {
      active: "bg-green-500",
      inactive: "bg-red-500",
      pending: "bg-yellow-500"
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs text-white ${color[status as keyof typeof color] || "bg-gray-500"}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-netflix-text">Users</h2>
        
        <div className="relative w-64">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8 bg-netflix-mediumGray border-netflix-darkGray text-netflix-text"
          />
        </div>
      </div>
      
      <div className="border rounded-md border-netflix-mediumGray overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-netflix-mediumGray hover:bg-netflix-mediumGray/90">
              <TableHead className="text-netflix-text">User</TableHead>
              <TableHead className="text-netflix-text">Role</TableHead>
              <TableHead className="text-netflix-text">Subscription</TableHead>
              <TableHead className="text-netflix-text">Status</TableHead>
              <TableHead className="text-netflix-text">Joined</TableHead>
              <TableHead className="text-netflix-text text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center h-24 text-netflix-lightGray">
                  No users found
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers.map((user) => (
                <TableRow key={user.id} className="border-b border-netflix-mediumGray hover:bg-netflix-darkGray/50">
                  <TableCell className="flex items-center space-x-3">
                    <div className="bg-netflix-mediumGray p-2 rounded-full">
                      <UserIcon className="h-4 w-4 text-netflix-text" />
                    </div>
                    <div>
                      <p className="font-medium text-netflix-text">{user.name || "No Name"}</p>
                      <p className="text-sm text-netflix-lightGray">{user.email}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={user.role === "admin" ? "destructive" : "outline"}>
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {user.subscriptionTier ? (
                      <Badge variant="outline" className="text-netflix-text border-netflix-lightGray">
                        {user.subscriptionTier}
                      </Badge>
                    ) : (
                      <span className="text-netflix-lightGray text-sm">None</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {getSubscriptionBadge(user.subscriptionStatus)}
                  </TableCell>
                  <TableCell className="text-netflix-lightGray">
                    {formatDate(user.createdAt)}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-netflix-lightGray hover:text-netflix-text">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-netflix-darkGray border-netflix-mediumGray">
                        <DropdownMenuItem 
                          onClick={() => onEdit(user)}
                          className="cursor-pointer text-netflix-text hover:bg-netflix-mediumGray"
                        >
                          <Edit className="h-4 w-4 mr-2" /> Edit User
                        </DropdownMenuItem>
                        {user.role !== "admin" && (
                          <DropdownMenuItem 
                            onClick={() => onEdit({ ...user, role: "admin" })}
                            className="cursor-pointer text-netflix-text hover:bg-netflix-mediumGray"
                          >
                            <Check className="h-4 w-4 mr-2" /> Make Admin
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem 
                          onClick={() => onDelete(user.id)}
                          className="cursor-pointer text-red-500 hover:bg-netflix-mediumGray"
                        >
                          <Trash className="h-4 w-4 mr-2" /> Delete User
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default UserList;
