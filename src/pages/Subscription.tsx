
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/auth-context";
import Layout from "@/components/layout/Layout";
import SubscriptionPlanCard from "@/components/subscription/SubscriptionPlanCard";
import { Button } from "@/components/ui/button";
import { subscriptionPlans } from "@/lib/data";
import { useToast } from "@/components/ui/use-toast";

const Subscription = () => {
  const { user } = useAuth();
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(
    user?.subscriptionTier ? 
      subscriptionPlans.find(plan => 
        plan.name.toLowerCase() === user.subscriptionTier?.toLowerCase()
      )?.id || null : 
      null
  );
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handlePlanSelect = (planId: string) => {
    setSelectedPlanId(planId);
  };

  const handleSubscribe = () => {
    if (!selectedPlanId) {
      toast({
        title: "Please select a plan",
        description: "You need to select a subscription plan to continue.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    // Simulate subscription processing
    setTimeout(() => {
      // In a real app, this would be handled by Stripe or another payment processor
      // For this demo, we'll just update local storage to simulate a successful subscription
      const selectedPlan = subscriptionPlans.find(plan => plan.id === selectedPlanId);
      
      if (user && selectedPlan) {
        // Update user subscription info
        const updatedUser = {
          ...user,
          subscriptionTier: selectedPlan.name.toLowerCase(),
          subscriptionStatus: "active",
        };
        
        // Update in localStorage
        localStorage.setItem("binge-buddy-user", JSON.stringify(updatedUser));
        
        toast({
          title: "Subscription successful!",
          description: `You are now subscribed to the ${selectedPlan.name} plan.`,
        });
        
        navigate("/");
      }
      
      setIsProcessing(false);
    }, 2000);
  };

  return (
    <Layout>
      
      <main className="container mx-auto px-4 py-16 pt-28">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Choose Your Plan</h1>
            <p className="text-lg text-netflix-lightGray">
              Flexible plans for every budget. No contracts, cancel anytime.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {subscriptionPlans.map((plan) => (
              <SubscriptionPlanCard
                key={plan.id}
                plan={plan}
                onSelect={handlePlanSelect}
                isSelected={selectedPlanId === plan.id}
              />
            ))}
          </div>
          
          <div className="mt-12 text-center space-y-6">
            <p className="text-netflix-lightGray">
              All prices include taxes and fees. Your subscription will automatically renew each month.
            </p>
            
            <Button
              onClick={handleSubscribe}
              className="bg-netflix-red hover:bg-netflix-red/90 text-white px-8 py-6 text-lg"
              disabled={!selectedPlanId || isProcessing}
            >
              {isProcessing ? "Processing..." : "Subscribe Now"}
            </Button>
            
            <p className="text-sm text-netflix-lightGray">
              By clicking "Subscribe Now" you agree to our Terms of Use and Privacy Policy.
            </p>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default Subscription;
