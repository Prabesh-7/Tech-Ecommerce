import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Mail, Phone, MapPin, User, LogOut, Loader2 } from "lucide-react";

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
        setError("Session expired. Please login again.");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setTimeout(() => navigate("/login"), 2000);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);



  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200 text-center">
          <Loader2 className="w-10 h-10 animate-spin text-gray-600 mx-auto mb-4" />
          <p className="text-gray-700">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-red-50 border border-red-200 text-red-600 px-6 py-4 rounded-md text-center">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
    

    
        <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-7">
            My Profile
          </h2>

          <div className="space-y-6">
          
            <div className="text-center pb-6 border-b border-gray-200">
              <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-3 flex items-center justify-center">
                <User className="w-10 h-10 text-gray-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800">
                {user.first_name} {user.last_name}
              </h3>
              <p className="text-sm text-gray-500">Member since registration</p>
            </div>

          
            <div className="grid md:grid-cols-2 gap-6">
           
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-500" />
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={user.email}
                    disabled
                    className="w-full px-4 py-3 pl-11 text-sm bg-gray-100 border border-gray-300 rounded-md cursor-not-allowed"
                  />
                  <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                </div>
              </div>

           
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-500" />
                  Mobile Number
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={user.mobile_number}
                    disabled
                    className="w-full px-4 py-3 pl-11 text-sm bg-gray-100 border border-gray-300 rounded-md cursor-not-allowed"
                  />
                  <Phone className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                </div>
              </div>

              
              <div className="md:col-span-2">
                <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  Delivery Address
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={user.address || "Not provided"}
                    disabled
                    className="w-full px-4 py-3 pl-11 text-sm bg-gray-100 border border-gray-300 rounded-md cursor-not-allowed"
                  />
                  <MapPin className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                </div>
              </div>
            </div>

          

              <button
                onClick={() => navigate("/orders")}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-gray-800 text-white font-medium rounded-md hover:bg-gray-900 transition-all duration-200 transform active:scale-95 shadow-md hover:shadow-lg"
              >
                View Orders
              </button>
        
          </div>
        </div>

       
      </div>
    </div>
  );
}