import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff, Mail, Phone, MapPin, Lock, User } from "lucide-react";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const password = watch("password");

  const onSubmit = async (data) => {
    setLoading(true);
    setServerError("");

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/register", {
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        mobile_number: data.mobile,
        address: data.address,
        password: data.password,
        confirm_password: data.confirmPassword,
      });

      alert(response.data.message || "Registration successful! Please login.");
      navigate("/login");
    } catch (error) {
      const msg = error.response?.data?.detail || "Registration failed. Try again.";
      setServerError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
       
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Ecommerce-by-two
          </h1>
          <p className="text-gray-600 mt-1 text-sm">Create your account to start shopping</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-7">
            Create Account
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="grid md:grid-cols-2 gap-5">
            
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-500" />
                  First Name
                </label>
                <div className="relative">
                  <input
                    className="w-full px-4 py-3 pl-11 text-sm bg-gray-50 border border-gray-300 rounded-md focus:bg-white focus:border-gray-400 focus:ring-2 focus:ring-gray-100 transition-all duration-200 outline-none"
                    placeholder="Ram"
                    {...register("firstName", {
                      required: "First name required",
                      pattern: { value: /^[A-Za-z]{3,}$/, message: "Min 3 letters" },
                    })}
                  />
                  <User className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                </div>
                {errors.firstName && (
                  <p className="text-red-500 text-xs mt-1.5">{errors.firstName.message}</p>
                )}
              </div>

         
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-500" />
                  Last Name
                </label>
                <div className="relative">
                  <input
                    className="w-full px-4 py-3 pl-11 text-sm bg-gray-50 border border-gray-300 rounded-md focus:bg-white focus:border-gray-400 focus:ring-2 focus:ring-gray-100 transition-all duration-200 outline-none"
                    placeholder="Bahadur"
                    {...register("lastName", {
                      required: "Last name required",
                      pattern: { value: /^[A-Za-z]{2,}$/, message: "Min 2 letters" },
                    })}
                  />
                  <User className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                </div>
                {errors.lastName && (
                  <p className="text-red-500 text-xs mt-1.5">{errors.lastName.message}</p>
                )}
              </div>

             
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-500" />
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    className="w-full px-4 py-3 pl-11 text-sm bg-gray-50 border border-gray-300 rounded-md focus:bg-white focus:border-gray-400 focus:ring-2 focus:ring-gray-100 transition-all duration-200 outline-none"
                    placeholder="ram@example.com"
                    {...register("email", {
                      required: "Email required",
                      pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email" },
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
                  <Phone className="w-4 h-4 text-gray-500" />
                  Mobile Number
                </label>
                <div className="relative">
                  <input
                    className="w-full px-4 py-3 pl-11 text-sm bg-gray-50 border border-gray-300 rounded-md focus:bg-white focus:border-gray-400 focus:ring-2 focus:ring-gray-100 transition-all duration-200 outline-none"
                    placeholder="98XXXXXXXX"
                    {...register("mobile", {
                      required: "Mobile required",
                      pattern: { value: /^[0-9]{10}$/, message: "10 digits only" },
                    })}
                  />
                  <Phone className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                </div>
                {errors.mobile && (
                  <p className="text-red-500 text-xs mt-1.5">{errors.mobile.message}</p>
                )}
              </div>

        
              <div className="md:col-span-2">
                <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  Address
                </label>
                <div className="relative">
                  <input
                    className="w-full px-4 py-3 pl-11 text-sm bg-gray-50 border border-gray-300 rounded-md focus:bg-white focus:border-gray-400 focus:ring-2 focus:ring-gray-100 transition-all duration-200 outline-none"
                    placeholder="Koteshwor, Kathmandu"
                    {...register("address", {
                      required: "Address required",
                      minLength: { value: 5, message: "Too short" },
                    })}
                  />
                  <MapPin className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                </div>
                {errors.address && (
                  <p className="text-red-500 text-xs mt-1.5">{errors.address.message}</p>
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
                    placeholder="Min 8 chars"
                    {...register("password", {
                      required: "Password required",
                      pattern: {
                        value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,72}$/,
                        message: "8-72 chars: letter, number, special char",
                      },
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
                <p className="text-xs text-gray-500 mt-1">Max 72 characters</p>
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1.5">{errors.password.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Lock className="w-4 h-4 text-gray-500" />
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    maxLength="72"
                    className="w-full px-4 py-3 pl-11 pr-12 text-sm bg-gray-50 border border-gray-300 rounded-md focus:bg-white focus:border-gray-400 focus:ring-2 focus:ring-gray-100 transition-all duration-200 outline-none"
                    placeholder="Re-enter password"
                    {...register("confirmPassword", {
                      required: "Confirm password",
                      validate: (value) => value === password || "Passwords do not match",
                    })}
                  />
                  <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1.5">{errors.confirmPassword.message}</p>
                )}
              </div>
            </div>

         
            {serverError && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm text-center">
                {serverError}
              </div>
            )}

            <div className="text-center mt-6">
              <button
                type="submit"
                disabled={loading}
                className={`w-full md:w-auto px-10 py-3.5 text-white font-medium rounded-md transition-all duration-200 transform active:scale-95 ${
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
                    Creating Account...
                  </span>
                ) : (
                  "Sign Up"
                )}
              </button>
            </div>
          </form>

   
          <p className="text-center mt-7 text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-gray-800 hover:text-gray-900 hover:underline"
            >
              Sign in here
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

export default Register;