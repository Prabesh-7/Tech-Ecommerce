import React from "react";
import { Link } from "react-router-dom";
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Youtube, 
  Mail, 
  Phone, 
  MapPin, 
  Shield, 
  Truck, 
  CreditCard, 
  Clock,
  ShoppingCart,
  ChevronUp
} from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-gray-300 mt-20">
     
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <ShoppingCart className="w-7 h-7 text-white" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                Ecommerce-by-two
              </h1>
            </div>
            <p className="text-gray-400 leading-relaxed mb-6">
              Nepal's most trusted online shopping destination. 
              Genuine products, fast delivery, and unbeatable prices — 
              all in one place.
            </p>
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-500" />
                <span>100% Genuine</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-5 h-5 text-blue-500" />
                <span>Free Delivery*</span>
              </div>
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-purple-500" />
                <span>Secure Payment</span>
              </div>
            </div>
          </div>

      
          <div>
            <h3 className="text-lg font-bold text-white mb-6">Quick Links</h3>
            <ul className="space-y-4">
              {[
                { to: "/", label: "Home" },
                { to: "/product", label: "All Products" },
                { to: "/product", label: "New Arrivals" },
                { to: "/product", label: "Best Sellers" },
                { to: "/cart", label: "My Cart" },
                { to: "/orders", label: "My Orders" }
              ].map((item) => (
                <li key={item.label}>
                  <Link 
                    to={item.to} 
                    className="hover:text-blue-400 transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition"></span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white mb-6">Customer Care</h3>
            <ul className="space-y-4">
              {[
                { label: "Help Center", to: "/contact" },
                { label: "Track Order", to: "/orders" },
                { label: "Returns & Refund", href: "#" },
                { label: "Shipping Info", href: "#" },
                { label: "Privacy Policy", href: "#" },
                { label: "Terms & Conditions", href: "#" }
              ].map((item) => (
                <li key={item.label}>
                  {item.to ? (
                    <Link to={item.to} className="hover:text-blue-400 transition-colors duration-200 flex items-center gap-2 group">
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition"></span>
                      {item.label}
                    </Link>
                  ) : (
                    <a href={item.href} className="hover:text-blue-400 transition-colors duration-200 flex items-center gap-2 group">
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition"></span>
                      {item.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white mb-6">Contact Us</h3>
            <div className="space-y-5">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-400 mt-1" />
                <div>
                  <p className="font-medium text-white">Visit Us</p>
                  <p className="text-sm text-gray-400">Pokhara, Kaski, Nepal</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-green-400" />
                <div>
                  <p className="font-medium text-white">Call Us</p>
                  <p className="text-sm text-gray-400">+977 9800000000</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-red-400" />
                <div>
                  <p className="font-medium text-white">Email Us</p>
                  <p className="text-sm text-gray-400">support@ecommercebytwo.com</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-purple-400" />
                <div>
                  <p className="font-medium text-white">Support Hours</p>
                  <p className="text-sm text-gray-400">10 AM - 6 PM (Sun - Fri)</p>
                </div>
              </div>
            </div>
          </div>
        </div>

     
        <div className="mt-16 pt-10 border-t border-gray-800">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
            <div>
              <p className="text-sm text-gray-500 mb-4">Stay connected with us</p>
              <div className="flex gap-4">
                <a href="#" className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-all duration-300 group">
                  <Facebook className="w-6 h-6 group-hover:scale-110 transition" />
                </a>
                <a href="#" className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-pink-600 transition-all duration-300 group">
                  <Instagram className="w-6 h-6 group-hover:scale-110 transition" />
                </a>
                <a href="#" className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-400 transition-all duration-300 group">
                  <Twitter className="w-6 h-6 group-hover:scale-110 transition" />
                </a>
                <a href="#" className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition-all duration-300 group">
                  <Youtube className="w-6 h-6 group-hover:scale-110 transition" />
                </a>
              </div>
            </div>

            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full font-medium hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 transform hover:scale-105"
            >
              <ChevronUp className="w-5 h-5" />
              Back to Top
            </button>
          </div>
        </div>
      </div>

    
    </footer>
  );
}