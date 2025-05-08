
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(email, password);
      toast({
        title: "Login successful",
        description: "Welcome back to VideoJ!",
      });
      navigate("/");
    } catch (error) {
      toast({
        title: "Login failed",
        description: error instanceof Error ? error.message : "Please check your credentials and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black bg-opacity-75 bg-[url('https://source.unsplash.com/random/1920x1080?cinema')] bg-cover bg-blend-darken">
      <div className="w-full max-w-md p-8 space-y-8 bg-netflix-black bg-opacity-90 rounded-lg shadow-xl">
        <div className="text-center">
          <h1 className="text-netflix-red font-bold text-4xl">VideoJ</h1>
          <h2 className="mt-6 text-3xl font-bold text-white">Sign in</h2>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-white">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="bg-netflix-mediumGray border-netflix-darkGray text-white"
                autoComplete="email"
                required
              />
            </div>

            <div>
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-white">Password</Label>
                <a href="#" className="text-sm text-netflix-red hover:underline">
                  Forgot password?
                </a>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="bg-netflix-mediumGray border-netflix-darkGray text-white"
                autoComplete="current-password"
                required
              />
              <p className="text-xs text-gray-400 mt-1">Use any password for demo accounts</p>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-netflix-red hover:bg-netflix-red/90 text-white py-2 rounded-md"
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </Button>

          <div className="text-center mt-4">
            <p className="text-gray-400">
              New to VideoJ?{" "}
              <Link to="/register" className="text-white hover:underline">
                Sign up now
              </Link>
            </p>
          </div>
          
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-400">
              Demo accounts:
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Admin: admin@videoj.com / any password
            </p>
            <p className="text-xs text-gray-500">
              User: user@example.com / any password
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
