import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff, Mail, Phone, MapPin, Lock, User, Package, CheckCircle } from "lucide-react";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState(false); // Success state
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
    setSuccess(false); // Reset success

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

      // // SUCCESS — Show both alert & UI message
      setSuccess(true);
      

      // Redirect after showing success
      setTimeout(() => {
        navigate("/login");
      }, 4000);

    } catch (error) {
      const msg = error.response?.data?.detail || "Registration failed. Try again.";
      setServerError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-4xl">

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-800 flex items-center justify-center gap-3">
            <Package className="w-12 h-12 sm:w-14 sm:h-14 text-blue-600" />
            Tech-Ecommerce
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mt-4">Create your account to start shopping</p>
        </div>

        {/* Register Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 sm:p-10 border border-gray-100">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-10">
            Create Account
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 sm:space-y-8">

            {/* SUCCESS MESSAGE — Shows above button */}
            {success && (
              <div className="mb-8 p-6 bg-green-50 border-2 border-green-200 rounded-2xl text-center animate-fade-in">
                <div className="flex items-center justify-center gap-3 text-green-800">
                  <CheckCircle className="w-12 h-12 text-green-600" />
                  <div>
                    <p className="text-2xl font-bold">Registration Successful!</p>
                    <p className="text-lg text-green-700 mt-2">
                      Your account has been created. Redirecting to login...
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Server Error */}
            {serverError && (
              <div className="bg-red-50 border-2 border-red-200 text-red-700 px-6 py-4 rounded-2xl text-center">
                <p className="font-bold text-lg">{serverError}</p>
              </div>
            )}

            {/* Form Fields - Same as before */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {/* First Name */}
              <div>
                <label className="block text-sm sm:text-base font-bold text-gray-700 mb-3 flex items-center gap-2">
                  <User className="w-5 h-5 text-blue-600" />
                  First Name
                </label>
                <div className="relative">
                  <input
                    className="w-full px-5 sm:px-6 py-4 pl-14 sm:pl-16 bg-gray-50 border-2 border-gray-300 rounded-2xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all text-base sm:text-lg"
                    placeholder="Ram"
                    {...register("firstName", {
                      required: "First name required",
                      pattern: { value: /^[A-Za-z]{3,}$/, message: "Min 3 letters" },
                    })}
                  />
                  <User className="absolute left-5 top-5 w-6 h-6 text-gray-400" />
                </div>
                {errors.firstName && (
                  <p className="mt-2 text-sm text-red-600 font-medium">{errors.firstName.message}</p>
                )}
              </div>

              {/* Last Name */}
              <div>
                <label className="block text-sm sm:text-base font-bold text-gray-700 mb-3 flex items-center gap-2">
                  <User className="w-5 h-5 text-blue-600" />
                  Last Name
                </label>
                <div className="relative">
                  <input
                    className="w-full px-5 sm:px-6 py-4 pl-14 sm:pl-16 bg-gray-50 border-2 border-gray-300 rounded-2xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all text-base sm:text-lg"
                    placeholder="Bahadur"
                    {...register("lastName", {
                      required: "Last name required",
                      pattern: { value: /^[A-Za-z]{2,}$/, message: "Min 2 letters" },
                    })}
                  />
                  <User className="absolute left-5 top-5 w-6 h-6 text-gray-400" />
                </div>
                {errors.lastName && (
                  <p className="mt-2 text-sm text-red-600 font-medium">{errors.lastName.message}</p>
                )}
              </div>

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
                      required: "Email required",
                      pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email" },
                    })}
                  />
                  <Mail className="absolute left-5 top-5 w-6 h-6 text-gray-400" />
                </div>
                {errors.email && (
                  <p className="mt-2 text-sm text-red-600 font-medium">{errors.email.message}</p>
                )}
              </div>

              {/* Mobile */}
              <div>
                <label className="block text-sm sm:text-base font-bold text-gray-700 mb-3 flex items-center gap-2">
                  <Phone className="w-5 h-5 text-blue-600" />
                  Mobile Number
                </label>
                <div className="relative">
                  <input
                    className="w-full px-5 sm:px-6 py-4 pl-14 sm:pl-16 bg-gray-50 border-2 border-gray-300 rounded-2xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all text-base sm:text-lg"
                    placeholder="98XXXXXXXX"
                    {...register("mobile", {
                      required: "Mobile required",
                      pattern: { value: /^[0-9]{10}$/, message: "10 digits only" },
                    })}
                  />
                  <Phone className="absolute left-5 top-5 w-6 h-6 text-gray-400" />
                </div>
                {errors.mobile && (
                  <p className="mt-2 text-sm text-red-600 font-medium">{errors.mobile.message}</p>
                )}
              </div>

              {/* Address */}
              <div className="md:col-span-2">
                <label className="block text-sm sm:text-base font-bold text-gray-700 mb-3 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  Delivery Address
                </label>
                <div className="relative">
                  <input
                    className="w-full px-5 sm:px-6 py-4 pl-14 sm:pl-16 bg-gray-50 border-2 border-gray-300 rounded-2xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all text-base sm:text-lg"
                    placeholder="Koteshwor, Kathmandu"
                    {...register("address", {
                      required: "Address required",
                      minLength: { value: 5, message: "Too short" },
                    })}
                  />
                  <MapPin className="absolute left-5 top-5 w-6 h-6 text-gray-400" />
                </div>
                {errors.address && (
                  <p className="mt-2 text-sm text-red-600 font-medium">{errors.address.message}</p>
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
                    placeholder="Min 8 characters"
                    {...register("password", {
                      required: "Password required",
                      pattern: {
                        value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,72}$/,
                        message: "8+ chars: letter, number, special char",
                      },
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

              {/* Confirm Password */}
              <div>
                <label className="block text-sm sm:text-base font-bold text-gray-700 mb-3 flex items-center gap-2">
                  <Lock className="w-5 h-5 text-blue-600" />
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    className="w-full px-5 sm:px-6 py-4 pl-14 sm:pl-16 pr-16 bg-gray-50 border-2 border-gray-300 rounded-2xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all text-base sm:text-lg"
                    placeholder="Re-enter password"
                    {...register("confirmPassword", {
                      required: "Confirm password",
                      validate: (value) => value === password || "Passwords do not match",
                    })}
                  />
                  <Lock className="absolute left-5 top-5 w-6 h-6 text-gray-400" />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-5 top-5 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff className="w-6 h-6" /> : <Eye className="w-6 h-6" />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="mt-2 text-sm text-red-600 font-medium">{errors.confirmPassword.message}</p>
                )}
              </div>
            </div>

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
                {loading ? "Creating Account..." : "Sign Up"}
              </button>
            </div>
          </form>

          {/* Login Link */}
          <p className="text-center mt-8 sm:mt-10 text-base sm:text-lg text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-bold text-blue-600 hover:text-blue-700 hover:underline"
            >
              Sign in here
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

export default Register;