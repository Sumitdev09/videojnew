
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";

const Index = () => {
  const { isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // If user is already authenticated, redirect to home
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen bg-black bg-opacity-75 bg-[url('https://source.unsplash.com/random/1920x1080?cinema')] bg-cover bg-blend-darken">
      <div className="container mx-auto px-4 h-screen flex flex-col justify-center items-center">
        <div className="text-center max-w-3xl">
          <h1 className="text-5xl md:text-7xl font-bold text-netflix-red mb-6">
            VideoJ
          </h1>
          <p className="text-2xl md:text-3xl text-white mb-8">
            Unlimited movies, TV shows, and more.
          </p>
          <p className="text-xl text-white mb-8">
            Watch anywhere. Cancel anytime.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
            <Button
              size="lg"
              className="text-lg bg-netflix-red hover:bg-netflix-red/90 text-white px-8"
              onClick={() => navigate("/register")}
            >
              Get Started
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg border-white text-white hover:bg-white/10 px-8"
              onClick={() => navigate("/login")}
            >
              Sign In
            </Button>
          </div>
          
          <p className="text-sm text-gray-400">
            Ready to watch? Create an account to start your streaming experience.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
