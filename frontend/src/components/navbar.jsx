import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, User, Menu, X, LogOut, Package, Heart, Settings } from "lucide-react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      const total = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
      setCartCount(total);
    };

    updateCartCount();
    window.addEventListener("storage", updateCartCount);
    window.addEventListener("cartUpdated", updateCartCount);

    return () => {
      window.removeEventListener("storage", updateCartCount);
      window.removeEventListener("cartUpdated", updateCartCount);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("cart");
    navigate("/login");
    setIsUserMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">

     
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-4 group">
              <img
                src="/logo.jpg"
                alt="Ecommerce-by-two"
                className="h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextElementSibling.style.display = "block";
                }}
              />
              <span className="text-3xl font-bold gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent hidden lg:block">
                Ecommerce-by-two
              </span>
            </Link>
          </div>

      
          <div className="hidden lg:flex items-center space-x-10">
            <Link
              to="/"
              className="text-gray-700 hover:text-blue-600 font-medium text-lg transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-600 after:transition-all after:duration-300 hover:after:w-full"
            >
              Home
            </Link>
            <Link
              to="/product"
              className="text-gray-700 hover:text-blue-600 font-medium text-lg transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-600 after:transition-all after:duration-300 hover:after:w-full"
            >
              Products
            </Link>
            <Link
              to="/contact"
              className="text-gray-700 hover:text-blue-600 font-medium text-lg transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-600 after:transition-all after:duration-300 hover:after:w-full"
            >
              Contact
            </Link>
          </div>

          <div className="flex items-center space-x-6">

         
            <Link
              to="/cart"
              className="relative group p-3 rounded-full hover:bg-gray-100 transition-all duration-200"
            >
              <ShoppingCart className="w-7 h-7 text-gray-700 group-hover:text-blue-600 transition-colors" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center animate-pulse">
                  {cartCount}
                </span>
              )}
            </Link>

     
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="p-3 rounded-full hover:bg-gray-100 transition-all duration-200 group"
              >
                <User className="w-7 h-7 text-gray-700 group-hover:text-blue-600 transition-colors" />
              </button>

        
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden animate-fade-in">
                  <div className="p-5 border-b border-gray-100">
                    <p className="text-sm text-gray-600">Welcome back!</p>
                    <p className="font-bold text-gray-900 truncate">
                      {token ? (user.name || "User") : "Guest User"}
                    </p>
                  </div>

                  {token ? (
                    <>
                      <Link
                        to="/profile"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-3 px-5 py-4 hover:bg-gray-50 transition-colors"
                      >
                        <Settings className="w-5 h-5 text-gray-600" />
                        <span className="font-medium">My Profile</span>
                      </Link>
                      <Link
                        to="/orders"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-3 px-5 py-4 hover:bg-gray-50 transition-colors"
                      >
                        <Package className="w-5 h-5 text-gray-600" />
                        <span className="font-medium">My Orders</span>
                      </Link>
                      <Link
                        to="/wishlist"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-3 px-5 py-4 hover:bg-gray-50 transition-colors"
                      >
                        <Heart className="w-5 h-5 text-gray-600" />
                        <span className="font-medium">Wishlist</span>
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-5 py-4 hover:bg-red-50 text-red-600 transition-colors"
                      >
                        <LogOut className="w-5 h-5" />
                        <span className="font-medium">Logout</span>
                      </button>
                    </>
                  ) : (
                    <div className="p-5 space-y-3">
                      <Link
                        to="/login"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all"
                      >
                        Login
                      </Link>
                      <Link
                        to="/register"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="block w-full text-center border border-blue-600 text-blue-600 hover:bg-blue-50 font-bold py-3 rounded-xl transition-all"
                      >
                        Create Account
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>


            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-3 rounded-full hover:bg-gray-100 transition-all"
            >
              {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="lg:hidden border-t border-gray-200 py-4">
            <div className="space-y-3">
              <Link
                to="/"
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 text-lg font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Home
              </Link>
              <Link
                to="/Product"
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 text-lg font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Products
              </Link>
              <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 text-lg font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Contact
              </Link>
              <Link
                to="/cart"
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 text-lg font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cart ({cartCount})
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;