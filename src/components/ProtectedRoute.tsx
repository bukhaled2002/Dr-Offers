import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/context/useAuth";

export const ProtectedRoute = ({
  restrictTo,
}: {
  restrictTo?: "owner" | "visitor";
}) => {
  const { user, isAuthenticated, isLoadingUser, brands } = useAuth();
  const location = useLocation();
  const isPendingBrand = brands[0]?.status === "pending";
  console.log(isPendingBrand);
  if (isLoadingUser) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/login-required" state={{ from: location }} replace />;
  }

  // Role-based protection
  if (restrictTo === "owner" && user.role !== "owner") {
    return <Navigate to="/" replace />;
  }

  if (restrictTo === "visitor" && user.role !== "visitor") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
