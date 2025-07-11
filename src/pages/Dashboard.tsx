
import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { RestaurantDashboard } from "@/components/dashboard/RestaurantDashboard";
import { CreatorDashboard } from "@/components/dashboard/CreatorDashboard";
import { Loader2 } from "lucide-react";

const Dashboard = () => {
  const { user, profile, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-coral" />
      </div>
    );
  }

  if (!user || !profile) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {profile.user_type === "restaurant" ? (
        <RestaurantDashboard />
      ) : (
        <CreatorDashboard />
      )}
    </div>
  );
};

export default Dashboard;
