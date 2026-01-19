import { useNavigate } from "react-router-dom";
import { Button } from "@/shadcn/ui/button";
import { useEffect } from "react";

export default function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (!loggedInUser) {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/login");
  };

  return (
        <div className="bg-white rounded-lg shadow-2xl p-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Dashboard
          </h1> 
          <p className="text-slate-600 mb-8">
            Welcome to EventTracker! You are now logged in.
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <h2 className="text-lg font-semibold text-blue-900 mb-2">
              Your Account
            </h2>
            <p className="text-blue-800">
              Email: {localStorage.getItem("loggedInUser")}
            </p>
          </div>

          <Button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            Logout
          </Button>
        </div>
  );
}
