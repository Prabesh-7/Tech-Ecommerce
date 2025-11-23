// src/pages/Home.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  ShoppingCart, ArrowRight, Package, Star, 
  Truck, Shield, CreditCard, RefreshCw 
} from "lucide-react";

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      category: "Laptops",
      title: "Latest Gaming & Office Laptops",
      subtitle: "Up to 40% OFF • Free Delivery",
      gradient: "from-purple-600 to-pink-600",
      image: "https://cdn.assets.prezly.com/cc1e3f98-2fc8-4410-8dde-76f813c9691c/Swift-Go-16-02.jpg",
      link: "/products?category=laptop"
    },
    {
      category: "Keyboards",
      title: "Mechanical & Wireless Keyboards",
      subtitle: "RGB • Hot-Swappable • Premium Build",
      gradient: "from-blue-600 to-cyan-600",
      image: "https://m.media-amazon.com/images/I/71+p3Hx03dL._AC_SL1500_.jpg",
      link: "/products?category=keyboard"
    },
    {
      category: "Mouse",
      title: "Gaming & Productivity Mouse",
      subtitle: "Ultra Light • 8K Polling • Pro Sensors",
      gradient: "from-green-600 to-emerald-600",
      image: "https://assetsio.gnwcdn.com/g502x_f9QuuM8.jpeg?width=1200&height=900&fit=crop&quality=100&format=png&enable=upscale&auto=webp",
      link: "/products?category=mouse"
    },
    {
      category: "Monitors",
      title: "4K • 144Hz • OLED Gaming Monitors",
      subtitle: "HDR • 1ms • FreeSync Premium",
      gradient: "from-orange-600 to-red-600",
      image: "https://image.benq.com/is/image/benqco/monitor-all-series-kv-3-m?$ResponsivePreset$&fmt=png-alpha",
      link: "/products?category=monitor"
    },
    {
      category: "Headphones",
      title: "Wireless ANC & Gaming Headsets",
      subtitle: "50+ Hour Battery • Hi-Res Audio",
      gradient: "from-indigo-600 to-purple-600",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGijQnltCMSQzDopr8skpcSl3DNpu7E_2A0A&s",
      link: "/products?category=headphone"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
    
      <div className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-5xl font-bold text-center text-gray-800 mb-16">
          Shop by Category
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {slides.map((cat, i) => (
            <Link
              key={i}
              to={cat.link}
              className="group relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-6"
            >
              <img
                src={cat.image}
                alt={cat.category}
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70" />
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <h3 className="text-3xl font-bold mb-2">{cat.category}</h3>
                <p className="text-lg opacity-90 flex items-center gap-2">
                  Shop Now <ArrowRight className="w-6 h-6 group-hover:translate-x-3 transition-transform" />
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

    </div>
  );
}