import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Package2,
  ShoppingCart,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  UserCircle,
  Bell,
  Search,
} from "lucide-react";

const AdminPanel = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const menuItems = [

    { icon: Package2, label: "Add Product", path: "/admin/addProduct" },
    { icon: Package2, label: "View Products", path: "/admin/viewProduct" },
    { icon: ShoppingCart, label: "Orders", path: "/admin/viewOrders" },
    { icon: Users, label: "Users", path: "/admin/viewUsers" },
    { icon: Settings, label: "Settings", path: "/admin/settings" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <aside
        className={`fixed left-0 top-0 z-50 h-full bg-gray-900 text-white flex flex-col transition-all duration-300 ease-in-out border-r border-gray-800 ${
          sidebarOpen ? "w-64" : "w-20"
        }`}
      >
   
        <div className="flex items-center justify-between p-5 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2.5 rounded-xl shadow-lg">
              <Package2 className="w-7 h-7" />
            </div>
            {sidebarOpen && (
              <h1 className="text-xl font-bold tracking-tight">Ecommerce-by-two</h1>
            )}
          </div>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-gray-400 hover:text-white p-1"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 overflow-y-auto">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group relative ${
                    isActive(item.path)
                      ? "bg-blue-600 text-white shadow-lg"
                      : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {sidebarOpen && <span className="font-medium text-base">{item.label}</span>}
                  {!sidebarOpen && (
                    <span className="absolute left-24 bg-gray-800 text-white px-3 py-2 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity shadow-lg z-50">
                      {item.label}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="p-4 border-t border-gray-800">
          <button
            onClick={handleLogout}
            className="flex items-center gap-4 px-4 py-3 rounded-xl text-gray-300 hover:bg-gray-800 hover:text-white transition-all w-full"
          >
            <LogOut className="w-5 h-5" />
            {sidebarOpen && <span className="font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      <header
        className={`fixed top-0 bg-white shadow-sm border-b border-gray-200 z-40 transition-all duration-300 ${
          sidebarOpen ? "left-64 right-0" : "left-20 right-0"
        }`}
      >
        <div className="px-4 md:px-8 py-5 flex items-center justify-between">
        
          <div className="flex-1 max-w-md">
            <h2 className="text-2xl font-bold text-gray-800">
      Welcome,{" "}
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
        Admin
      </span>
    </h2>
   

          </div>
          <div className="flex items-center gap-4 ml-6">
            <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-all">
              <Bell className="w-6 h-6" />
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
            </button>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-800">
                  {user?.first_name || "Admin"} {user?.last_name || ""}
                </p>
                <p className="text-xs text-gray-500">Administrator</p>
              </div>
              <div className="relative">
                <UserCircle className="w-10 h-10 text-gray-600" />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default AdminPanel;