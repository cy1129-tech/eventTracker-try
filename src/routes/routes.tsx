import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Dashboard from "@/pages/Dashboard";
import ForgotPassword from "@/pages/ForgotPassword";
import ForgotEmail from "@/pages/ForgotEmail";
import CustomSidebar from "@/components/CustomSidebar";
import { SidebarProvider } from "@/shadcn/ui/sidebar";

export const router = createBrowserRouter([
  {
    path: "/*",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/dashboard",
    element: (
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <CustomSidebar />
          <main className="flex-1 overflow-auto">
            <Dashboard/>
          </main>

        </div>
      </SidebarProvider>

    ),
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/forgot-email",
    element: <ForgotEmail />,
  },
]);
