// src/pages/AdminSettings.jsx
import React, { useState } from "react";
import { 
  Settings, 
  Store, 
  Mail, 
  Bell, 
  Shield, 
  Palette, 
  Globe, 
  Save, 
  Loader2,
  CheckCircle
} from "lucide-react";

export default function AdminSettings() {
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }, 1500);
  };

  return (
    <div className="max-w-6xl mx-auto">
  
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
          <Settings className="w-9 h-9 text-blue-600" />
          Store Settings
        </h1>
        <p className="text-gray-600 mt-1">Configure your ecommerce store preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 space-y-1">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Settings Menu</h3>
              
              <div className="space-y-1">
                <button className="w-full flex items-center gap-3 px-4 py-3 bg-blue-50 text-blue-700 rounded-xl font-medium">
                  <Store className="w-5 h-5" />
                  General
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl transition-all">
                  <Mail className="w-5 h-5" />
                  Notifications
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl transition-all">
                  <Shield className="w-5 h-5" />
                  Security
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl transition-all">
                  <Palette className="w-5 h-5" />
                  Appearance
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl transition-all">
                  <Globe className="w-5 h-5" />
                  Regional
                </button>
              </div>
            </div>
          </div>
        </div>

     
        <div className="lg:col-span-2 space-y-6">
       
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Store className="w-6 h-6 text-blue-600" />
              Store Information
            </h2>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Store Name
                </label>
                <input
                  type="text"
                  defaultValue="My Awesome Store"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Store Email
                </label>
                <input
                  type="email"
                  defaultValue="support@myawesomestore.com"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Support Phone
                </label>
                <input
                  type="text"
                  defaultValue="+977 9800000000"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Store Description
                </label>
                <textarea
                  rows={4}
                  defaultValue="Best online shopping destination in Nepal with premium quality products."
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all text-sm resize-none"
                />
              </div>
            </div>
          </div>

 
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Bell className="w-6 h-6 text-blue-600" />
              Notification Preferences
            </h2>

            <div className="space-y-4">
              {["New order notifications", "Customer registration alerts", "Low stock warnings", "Review notifications"].map((item, idx) => (
                <label key={idx} className="flex items-center justify-between cursor-pointer">
                  <span className="text-gray-700 font-medium">{item}</span>
                  <div className="relative">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-blue-600 transition-all"></div>
                    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all peer-checked:translate-x-5"></div>
                  </div>
                </label>
              ))}
            </div>
          </div>

   
          <div className="flex items-center justify-end gap-4">
            {saved && (
              <div className="flex items-center gap-2 text-green-600 font-medium">
                <CheckCircle className="w-5 h-5" />
                Settings saved successfully!
              </div>
            )}
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold flex items-center gap-2 transition-all shadow-md hover:shadow-lg disabled:opacity-70"
            >
              {saving ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}