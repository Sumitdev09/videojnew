
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/auth-context";

interface ProtectedRouteProps {
  children: ReactNode;
  requireAdmin?: boolean;
  requireSubscription?: boolean;
}

const ProtectedRoute = ({
  children,
  requireAdmin = false,
  requireSubscription = false,
}: ProtectedRouteProps) => {
  const { isAuthenticated, isAdmin, hasSubscription } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requireAdmin && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  if (requireSubscription && !hasSubscription) {
    return <Navigate to="/subscription" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
