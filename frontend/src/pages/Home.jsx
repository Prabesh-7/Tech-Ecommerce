import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  Truck, Shield, RefreshCw, CreditCard,
  Loader2, Package, ShoppingCart, Tag, Sparkles, TrendingUp 
} from "lucide-react";
import { useCartStore } from "../store/cartStore";

export default function Home() {
  const [newArrivals, setNewArrivals] = useState([]);
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [loadingNew, setLoadingNew] = useState(true);
  const [loadingTrending, setLoadingTrending] = useState(true);


  const categories = [
    { name: "Laptops",     image: "https://cdn.assets.prezly.com/cc1e3f98-2fc8-4410-8dde-76f813c9691c/Swift-Go-16-02.jpg", category: "laptop" },
    { name: "Keyboards",   image: "https://t3.ftcdn.net/jpg/04/04/98/42/360_F_404984263_XUzwxRhfgcPqAkBtFCrCw93A6ngfy1aM.jpg", category: "keyboard" },
    { name: "Mouse",       image: "https://havitsmart.com/cdn/shop/files/havit-gaming-mouse-ms961-rgb-programmablehavit-business-529706.jpg?v=1749802330", category: "mouse" },
    { name: "Monitors",    image: "https://image.benq.com/is/image/benqco/monitor-all-series-kv-3-m?$ResponsivePreset$&fmt=png-alpha", category: "monitor" },
    { name: "Headphones",  image: "https://media.istockphoto.com/id/1422851316/vector/3d-white-realistic-headphones-isolated-on-white-background-vector-illustration.jpg?s=612x612&w=0&k=20&c=MVbeXLM9X6jh4P9C3DYmA4FP-Ctqjpl4U7tqvEgv7rg=", category: "headphone" }
  ];

  useEffect(() => {
    fetchNewArrivals();
    fetchTrendingProducts();
  }, []);

  const fetchNewArrivals = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/admin/new-arrivals");
      if (!res.ok) throw new Error();
      const data = await res.json();
      setNewArrivals(Array.isArray(data) ? data.slice(0, 5) : []);
    } catch (err) { console.error(err); }
    finally { setLoadingNew(false); }
  };

  const fetchTrendingProducts = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/trending-products");
      if (!res.ok) throw new Error();
      const data = await res.json();
      setTrendingProducts(Array.isArray(data) ? data : []);
    } catch (err) { console.error(err); }
    finally { setLoadingTrending(false); }
  };

    const addToCart = useCartStore((state) => state.addToCart);
  useEffect(() => {
    useCartStore.getState().loadCart();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">

    
      <section className="px-4 py-10 bg-white">
        <div className="max-w-7xl mx-auto rounded-3xl overflow-hidden shadow-2xl">
          <img
            src="/hero.png"
            alt="Tech Store Nepal"
            className="w-full h-auto object-cover"
            style={{ aspectRatio: "21/9", maxHeight: "600px" }}
            onError={(e) => e.target.src = "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=2100&h=900&fit=crop"}
          />
        </div>
      </section>

  
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-5xl font-bold text-gray-800 mb-4">Shop by Category</h2>
          <p className="text-xl text-gray-600 mb-12">Best gear for work & play</p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {categories.map((cat) => (
              <Link 
                key={cat.name} 
                to='/product' 
                className="group block"
              >
                <div className="aspect-square rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 relative">
                  <img 
                    src={cat.image} 
                    alt={cat.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-6 left-0 right-0 text-white text-center">
                    <h3 className="text-2xl text-black font-bold">{cat.name}</h3>
                   
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

     
      <section className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-800 flex items-center justify-center gap-4">
              <Sparkles className="w-12 h-12 text-yellow-500" />
              New Arrivals
              <Sparkles className="w-12 h-12 text-yellow-500" />
            </h2>
            <p className="text-xl text-gray-600 mt-4">Fresh stock just landed!</p>
          </div>

          {loadingNew ? (
            <div className="flex justify-center py-20">
              <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
            </div>
          ) : newArrivals.length === 0 ? (
            <div className="text-center py-20">
              <Package className="w-20 h-20 mx-auto text-gray-300 mb-4" />
              <p className="text-xl text-gray-600">No new products yet</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
              {newArrivals.map((product) => (
                <div key={product.id} className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100">
                  <Link to={`/product/${product.id}`} className="block relative">
                    <div className="h-56 bg-gray-100">
                      <img
                        src={product.image || "https://via.placeholder.com/400x400?text=No+Image"}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="absolute top-3 left-3 bg-red-600 text-white px-3 py-1.5 rounded-full text-xs font-bold">
                      NEW
                    </div>
                   
                    <div className="absolute top-3 right-3 bg-purple-600 text-white px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1">
                      <Tag className="w-3 h-3" />
                      {product.category || "Electronics"}
                    </div>
                  </Link>

                  <div className="p-4">
                    <Link to={`/product/${product.id}`}>
                      <h3 className="font-semibold text-gray-800 hover:text-blue-600 transition-colors line-clamp-2 text-sm">
                        {product.name}
                      </h3>
                    </Link>
                    <div className="flex items-center justify-between mt-3">
                      <p className="text-xl font-bold text-gray-800">
                        Rs {Number(product.price || 0).toLocaleString()}
                      </p>
                      <button
                        onClick={(e) => { e.preventDefault(); addToCart(product); }}
                        className="p-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all shadow-md"
                      >
                        <ShoppingCart className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

    
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-800 flex items-center justify-center gap-4">
              <TrendingUp className="w-12 h-12 text-orange-500 animate-pulse" />
              Trending Products
              <TrendingUp className="w-12 h-12 text-orange-500 animate-pulse" />
            </h2>
            <p className="text-xl text-gray-600 mt-4">Most loved by customers right now!</p>
          </div>

          {loadingTrending ? (
            <div className="flex justify-center py-20">
              <Loader2 className="w-12 h-12 animate-spin text-orange-600" />
            </div>
          ) : trendingProducts.length === 0 ? (
            <div className="text-center py-20">
              <Package className="w-20 h-20 mx-auto text-gray-300 mb-4" />
              <p className="text-xl text-gray-600">No orders yet. Be the first!</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
              {trendingProducts.map((product, index) => (
                <div key={product.id || index} className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 relative">
                  <Link to={`/product/${product.id}`} className="block relative">
                    <div className="h-56 bg-gray-100">
                      <img
                        src={product.image || "https://via.placeholder.com/400x400?text=Hot+Item"}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    <div className="absolute top-3 left-3 gradient-to-r from-orange-500 to-red-600 text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
                      <TrendingUp className="w-4 h-4" />
                      #{product.rank || index + 1}
                    </div>

                  
                    <div className="absolute top-3 right-3 bg-purple-600 text-white px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1">
                      <Tag className="w-3 h-3" />
                      {product.category && product.category !== "Uncategorized" ? product.category : "Electronics"}
                    </div>
                  </Link>

                  <div className="p-4">
                    <Link to={`/product/${product.id}`}>
                      <h3 className="font-semibold text-gray-800 hover:text-blue-600 transition-colors line-clamp-2 text-sm">
                        {product.name}
                      </h3>
                    </Link>
                    <div className="flex items-center justify-between mt-3">
                      <p className="text-xl font-bold text-gray-800">
                        Rs {Number(product.price || 0).toLocaleString()}
                      </p>
                      <button
                        onClick={(e) => { e.preventDefault(); addToCart(product); }}
                        className="p-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all shadow-md"
                      >
                        <ShoppingCart className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

    
      <section className="py-16 bg-white border-t">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { icon: Truck, title: "Free Delivery", desc: "Above Rs 19999" },
              { icon: Shield, title: "100% Genuine", desc: "Original Products" },
              { icon: RefreshCw, title: "Easy Returns", desc: "7 Days Policy" },
              { icon: CreditCard, title: "Secure Payment", desc: "eSewa" }
            ].map((item, i) => (
              <div key={i} className="group">
                <div className="w-20 h-20 mx-auto mb-4 bg-blue-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300">
                  <item.icon className="w-10 h-10 text-white" />
                </div>
                <h4 className="font-bold text-gray-800">{item.title}</h4>
                <p className="text-sm text-gray-600 mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}




