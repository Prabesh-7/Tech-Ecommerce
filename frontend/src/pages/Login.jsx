import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";


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
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
        timeout: 10000  
      }
    );

    const { access_token, user } = response.data;

    localStorage.setItem("token", access_token);
    localStorage.setItem("user", JSON.stringify(user));

    console.log("Login successful:", response.data);
    console.log("User Role:", user.role);

    if (user.role === "admin") {
      navigate("/admin/viewProduct");
    } else {
      navigate("/");
    }

  } catch (error) {
    console.error("FULL ERROR:", error);  

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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
       
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Ecommerce-by-two
          </h1>
          <p className="text-gray-600 mt-1 text-sm">Welcome back! Please login to continue</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-7">
            Sign In
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
           
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Mail className="w-4 h-4 text-gray-500" />
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  className="w-full px-4 py-3 pl-11 text-sm bg-gray-50 border border-gray-300 rounded-md focus:bg-white focus:border-gray-400 focus:ring-2 focus:ring-gray-100 transition-all duration-200 outline-none"
                  placeholder="you@example.com"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Please enter a valid email",
                    },
                  })}
                />
                <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs mt-1.5">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Lock className="w-4 h-4 text-gray-500" />
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  maxLength="72"
                  className="w-full px-4 py-3 pl-11 pr-12 text-sm bg-gray-50 border border-gray-300 rounded-md focus:bg-white focus:border-gray-400 focus:ring-2 focus:ring-gray-100 transition-all duration-200 outline-none"
                  placeholder="••••••••"
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 8, message: "Password must be at least 8 characters" },
                  })}
                />
                <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1.5">{errors.password.message}</p>
              )}
            </div>

        
            {serverError && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm text-center">
                {serverError}
              </div>
            )}

      
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3.5 mt-3 text-white font-medium rounded-md transition-all duration-200 transform active:scale-95 ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gray-800 hover:bg-gray-900 shadow-md hover:shadow-lg"
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Logging in...
                </span>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <p className="text-center mt-7 text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-medium text-gray-800 hover:text-gray-900 hover:underline"
            >
              Register here
            </Link>
          </p>
        </div>

        <p className="text-center mt-8 text-xs text-gray-500">
          © 2025 ecommerce-by-two. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Login;
