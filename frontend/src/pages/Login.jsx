import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Eye, EyeOff, Mail, Lock, Package } from "lucide-react";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    setServerError("");

    try {
      const formData = new URLSearchParams();
      formData.append("username", data.email);
      formData.append("password", data.password);

      const response = await axios.post(
        "http://127.0.0.1:8000/api/login",
        formData,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          timeout: 10000
        }
      );

      const { access_token, user } = response.data;

      localStorage.setItem("token", access_token);
      localStorage.setItem("user", JSON.stringify(user));

      if (user.role === "admin") {
        navigate("/admin/viewProduct");
      } else {
        navigate("/");
      }

    } catch (error) {
      let msg = "Login failed.";
      if (error.response) {
        msg = error.response.data?.detail || "Invalid credentials";
      } else if (error.code === "ECONNABORTED") {
        msg = "Request timeout. Backend slow?";
      } else if (error.request) {
        msg = "No response from server. Is backend running?";
      } else {
        msg = error.message;
      }
      setServerError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-800 flex items-center justify-center gap-3">
            <Package className="w-12 h-12 sm:w-14 sm:h-14 text-blue-600" />
            Tech-Ecommerce
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mt-4">Welcome back! Please login to continue</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 sm:p-10 border border-gray-100">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-10">
            Sign In
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 sm:space-y-8">
            {/* Email */}
            <div>
              <label className="block text-sm sm:text-base font-bold text-gray-700 mb-3 flex items-center gap-2">
                <Mail className="w-5 h-5 text-blue-600" />
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  className="w-full px-5 sm:px-6 py-4 pl-14 sm:pl-16 bg-gray-50 border-2 border-gray-300 rounded-2xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all text-base sm:text-lg"
                  placeholder="you@example.com"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Please enter a valid email",
                    },
                  })}
                />
                <Mail className="absolute left-5 top-5 w-6 h-6 text-gray-400" />
              </div>
              {errors.email && (
                <p className="mt-2 text-sm text-red-600 font-medium">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm sm:text-base font-bold text-gray-700 mb-3 flex items-center gap-2">
                <Lock className="w-5 h-5 text-blue-600" />
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full px-5 sm:px-6 py-4 pl-14 sm:pl-16 pr-16 bg-gray-50 border-2 border-gray-300 rounded-2xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all text-base sm:text-lg"
                  placeholder="••••••••"
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 8, message: "Password must be at least 8 characters" },
                  })}
                />
                <Lock className="absolute left-5 top-5 w-6 h-6 text-gray-400" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-5 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-6 h-6" /> : <Eye className="w-6 h-6" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-2 text-sm text-red-600 font-medium">{errors.password.message}</p>
              )}
            </div>

            {/* Server Error */}
            {serverError && (
              <div className="bg-red-50 border-2 border-red-200 text-red-700 px-6 py-4 rounded-2xl text-center">
                <p className="font-bold text-base sm:text-lg">{serverError}</p>
              </div>
            )}

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                disabled={loading}
                className={`w-full px-12 sm:px-16 py-4 sm:py-5 text-white font-bold text-lg sm:text-xl rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl ${
                  loading
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                }`}
              >
                {loading ? "Logging in..." : "Sign In"}
              </button>
            </div>
          </form>

          {/* Register Link */}
          <p className="text-center mt-8 sm:mt-10 text-base sm:text-lg text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-bold text-blue-600 hover:text-blue-700 hover:underline"
            >
              Register here
            </Link>
          </p>
        </div>

        {/* Footer */}
        <p className="text-center mt-10 text-sm sm:text-base text-gray-500">
          © 2025 Tech-Ecommerce. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Login;