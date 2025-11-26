import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { 
  User, Mail, Phone, MapPin, Package, LogOut, 
  Edit3, Shield, Calendar, Loader2 
} from "lucide-react";

export default function UserProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (err) {
        setError("Session expired. Redirecting to login...");
        localStorage.clear();
        setTimeout(() => navigate("/login"), 2000);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <p className="text-xl font-medium text-gray-700">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="bg-red-50 border-2 border-red-200 text-red-700 px-8 py-6 rounded-2xl text-center max-w-md">
          <p className="text-lg font-bold">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-4">
            <Shield className="w-14 h-14 text-blue-600" />
            My Profile
          </h1>
          <p className="text-xl text-gray-600">Manage your account information and preferences</p>
        </div>

        {/* Main Profile Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200">

        
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-10 py-12 text-center">
            <div className="w-32 h-32 bg-white/20 backdrop-blur-sm rounded-full mx-auto mb-6 flex items-center justify-center border-4 border-white/30">
              <User className="w-20 h-20 text-white" />
            </div>
            <h2 className="text-4xl font-bold mb-2">
              {user.first_name} {user.last_name}
            </h2>
            <p className="text-blue-100 text-lg flex items-center justify-center gap-2 mt-3">
              <Calendar className="w-5 h-5" />
              Member since {new Date().getFullYear()}
            </p>
          </div>

          {/* Profile Details */}
          <div className="p-10">
            <div className="grid lg:grid-cols-2 gap-10">

              {/* Personal Info */}
              <div className="space-y-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <User className="w-8 h-8 text-blue-600" />
                  Personal Information
                </h3>

                <div className="space-y-6">
                  <div className="flex items-center gap-5 p-5 bg-gray-50 rounded-2xl border border-gray-200">
                    <div className="p-4 bg-blue-100 rounded-xl">
                      <Mail className="w-7 h-7 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-600">Email Address</p>
                      <p className="text-lg font-bold text-gray-900">{user.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-5 p-5 bg-gray-50 rounded-2xl border border-gray-200">
                    <div className="p-4 bg-green-100 rounded-xl">
                      <Phone className="w-7 h-7 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-600">Mobile Number</p>
                      <p className="text-lg font-bold text-gray-900">{user.mobile_number}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-5 p-5 bg-gray-50 rounded-2xl border border-gray-200">
                    <div className="p-4 bg-purple-100 rounded-xl">
                      <MapPin className="w-7 h-7 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-600">Delivery Address</p>
                      <p className="text-lg font-bold text-gray-900">
                        {user.address || "Not added yet"}
                      </p>
                      {user.address ? (
                        <p className="text-sm text-gray-500 mt-1">Default shipping address</p>
                      ) : (
                        <p className="text-sm text-gray-500 mt-1">Add address for faster checkout</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="space-y-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <Package className="w-8 h-8 text-blue-600" />
                  Account Actions
                </h3>

                <div className="space-y-4">
                  <button
                    onClick={() => navigate("/orders")}
                    className="w-full flex items-center justify-between p-6 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold text-lg rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    <span className="flex items-center gap-4">
                      <Package className="w-8 h-8" />
                      My Orders
                    </span>
                    <span>→</span>
                  </button>

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-between p-6 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold text-lg rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    <span className="flex items-center gap-4">
                      <LogOut className="w-8 h-8" />
                      Logout
                    </span>
                    <span>→</span>
                  </button>
                </div>

                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 mt-8">
                  <div className="flex items-center gap-4 text-gray-700">
                    <Shield className="w-10 h-10 text-blue-600" />
                    <div>
                      <p className="font-bold text-lg">Account Secure</p>
                      <p className="text-sm text-gray-600">Your data is protected with encryption</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-12">
          <p className="text-gray-500">
            Need help? Contact us at{" "}
            <a href="mailto:support@ecommerce-by-two.com" className="text-blue-600 font-medium hover:underline">
              support@ecommerce-by-two.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}