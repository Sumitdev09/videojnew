
import { useAuth } from "@/context/auth-context";
import { Subscription } from "@/types";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SubscriptionPlanCardProps {
  plan: Subscription;
  onSelect: (planId: string) => void;
  isSelected: boolean;
}

const SubscriptionPlanCard = ({
  plan,
  onSelect,
  isSelected,
}: SubscriptionPlanCardProps) => {
  const { user } = useAuth();
  const isCurrentPlan = user?.subscriptionTier?.toLowerCase() === plan.name.toLowerCase();

  return (
    <div
      className={`relative border rounded-lg overflow-hidden transition-all duration-300 ${
        isSelected
          ? "border-netflix-red shadow-md scale-[1.02]"
          : "border-netflix-mediumGray hover:border-netflix-lightGray"
      } ${
        isCurrentPlan
          ? "border-green-500 bg-green-500/5"
          : ""
      }`}
    >
      {/* Current Plan Badge */}
      {isCurrentPlan && (
        <div className="absolute top-0 right-0 bg-green-500 text-white px-4 py-1 text-xs font-medium">
          Current Plan
        </div>
      )}

      <div className="p-6">
        <h3 className="text-xl font-bold text-netflix-text mb-2">{plan.name}</h3>
        <p className="text-2xl font-bold text-netflix-text mb-4">
          ${plan.price}
          <span className="text-sm font-normal text-netflix-lightGray">/month</span>
        </p>
        <p className="text-netflix-lightGray mb-6 text-sm">{plan.description}</p>

        <div className="space-y-3 mb-6">
          {plan.features.map((feature, index) => (
            <div key={index} className="flex items-start">
              <Check className="text-green-500 h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
              <span className="text-netflix-text text-sm">{feature}</span>
            </div>
          ))}
        </div>

        <Button
          onClick={() => onSelect(plan.id)}
          className={`w-full ${
            isSelected
              ? "bg-netflix-red hover:bg-netflix-red/90 text-white"
              : "bg-netflix-mediumGray hover:bg-netflix-mediumGray/90 text-netflix-text"
          } ${
            isCurrentPlan && !isSelected
              ? "bg-green-500 hover:bg-green-600 text-white"
              : ""
          }`}
          disabled={isCurrentPlan}
        >
          {isCurrentPlan ? "Current Plan" : isSelected ? "Selected" : "Choose Plan"}
        </Button>
      </div>
    </div>
  );
};

export default SubscriptionPlanCard;
