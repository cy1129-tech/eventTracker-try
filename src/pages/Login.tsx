import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/shadcn/ui/button";
import { Input } from "@/shadcn/ui/input";
import { Checkbox } from "@/shadcn/ui/checkbox";
import { Mail, Lock, Chrome } from "lucide-react";

// Mock user database (in production, this would be a backend API)
const USERS_DB = [
  { email: "user@example.com", password: "password123" },
  { email: "demo@test.com", password: "demo456" },
];

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const navigate = useNavigate();

  function handleRememberMeChange(checked: boolean) {
    setRememberMe(checked);
  }
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    // Validation
    if (!email) {
      newErrors.email = "Email is required";
    }
    if (!password) {
      newErrors.password = "Password is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Check credentials
    const user = USERS_DB.find((u) => u.email === email);

    if (!user) {
      alert("No email found, please register");
      navigate("/register");
      return;
    }

    if (user.password !== password) {
      alert("Password incorrect");
      setPassword("");
      return;
    }

    // If both correct, redirect to dashboard
    if (rememberMe) {
      localStorage.setItem("rememberMe", email);
    }
    localStorage.setItem("loggedInUser", email);
    navigate("/dashboard");
  };

  const handleGoogleLogin = () => {
    // In production, this would integrate with Google OAuth
    alert("Google login functionality will be implemented");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Card Container */}
        <div className="bg-white rounded-lg shadow-2xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              EventTracker
            </h1>
            <p className="text-slate-600">Sign in to your account</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) {
                      setErrors({ ...errors, email: "" });
                    }
                  }}
                  className="pl-10"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                  Password
                </label>
                <a
                  href="/forgot-password"
                  className="text-sm text-blue-600 hover:text-blue-800 transition"
                >
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) {
                      setErrors({ ...errors, password: "" });
                    }
                  }}
                  className="pl-10"
                />
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="rememberMe"
                checked={rememberMe}
                
              />
              <label htmlFor="rememberMe" className="text-sm text-slate-700 cursor-pointer">
                Remember me
              </label>
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 mt-6"
            >
              Sign In
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-slate-500">Or continue with</span>
            </div>
          </div>

          {/* Google Login Button */}
          <Button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 font-medium py-2 flex items-center justify-center gap-2"
          >
            <Chrome className="h-5 w-5" />
            Login with Google
          </Button>

          {/* Forgot Email Link */}
          <div className="text-center mt-4">
            <a
              href="/forgot-email"
              className="text-sm text-slate-600 hover:text-slate-800 transition"
            >
              Forgot your email?
            </a>
          </div>

          {/* Register Link */}
          <p className="text-center text-slate-600 text-sm mt-6">
            New User?{" "}
            <a
              href="/register"
              className="text-blue-600 hover:text-blue-800 font-semibold transition"
            >
              Register Here
            </a>
          </p>
        </div>

        {/* Footer */}
        <p className="text-center text-slate-400 text-xs mt-6">
          © 2026 EventTracker. All rights reserved.
        </p>
      </div>
    </div>
  );
}
