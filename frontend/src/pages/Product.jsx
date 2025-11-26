
// import React, { useState, useEffect } from "react";
// import { ShoppingCart, Package, Star, Loader2, AlertCircle, Tag, DollarSign } from "lucide-react";
// import { Link } from "react-router-dom";


// import usePagination from "../hooks/usePagination";    
// import Pagination from "../components/Pagination";       

// export default function Products() {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");


//   const {
//     currentPage,
//     setCurrentPage,
//     paginate,
//     getTotalPages,
//     itemsPerPage = 12
//   } = usePagination(1, 12);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const res = await fetch("http://127.0.0.1:8000/api/admin/viewproducts");
//         if (!res.ok) throw new Error("Failed to load products");
//         const data = await res.json();
//         setProducts(data);
//       } catch (err) {
//         setError("Could not load products. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProducts();
//   }, []);

//   const addToCart = (product) => {
//     const cart = JSON.parse(localStorage.getItem("cart") || "[]");
//     const existing = cart.find(item => item.id === product.id);

//     if (existing) {
//       existing.quantity += 1;
//     } else {
//       cart.push({ ...product, quantity: 1 });
//     }

//     localStorage.setItem("cart", JSON.stringify(cart));
//     alert(`${product.name} added to cart!`);
//   };


//   const paginatedProducts = paginate(products);
//   const totalPages = getTotalPages(products.length);

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gray-50">
//         <div className="text-center">
//           <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto" />
//           <p className="text-gray-600 mt-4 font-medium">Loading products...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gray-50">
//         <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl flex items-center gap-3">
//           <AlertCircle className="w-6 h-6" />
//           <span className="font-medium">{error}</span>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto mb-12 text-center">
//         <h1 className="text-4xl md:text-5xl font-bold text-gray-800 flex items-center justify-center gap-3">
//           <Package className="w-12 h-12 text-blue-600" />
//           Our Products
//         </h1>
//         <p className="text-lg text-gray-600 mt-3">Shop the best deals, delivered fast</p>
//       </div>

//       <div className="max-w-7xl mx-auto">
//         {products.length === 0 ? (
//           <div className="text-center py-20">
//             <Package className="w-20 h-20 mx-auto mb-5 text-gray-300" />
//             <p className="text-xl font-semibold text-gray-600">No products available</p>
//             <p className="text-gray-500 mt-2">New items coming soon!</p>
//           </div>
//         ) : (
//           <>
         
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
//               {paginatedProducts.map((product) => (
//                 <div
//                   key={product.id}
//                   className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden group flex flex-col h-full border border-gray-100"
//                 >
//                   <Link to={`/product/${product.id}`} className="block relative overflow-hidden">
//                     <div className="h-64 bg-gray-100">
//                       {product.image ? (
//                         <img
//                           src={product.image}
//                           alt={product.name}
//                           className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
//                           onError={(e) => {
//                             e.target.src = "https://via.placeholder.com/600x600?text=No+Image";
//                           }}
//                         />
//                       ) : (
//                         <div className="w-full h-full flex items-center justify-center">
//                           <Package className="w-16 h-16 text-gray-300" />
//                         </div>
//                       )}
//                     </div>

//                     <div className="absolute top-3 right-3 bg-purple-600 text-white px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1">
//                       <Tag className="w-3 h-3" />
//                       {product.category}
//                     </div>
//                   </Link>

//                   <div className="p-5 flex flex-col flex-grow">
//                     <Link to={`/product/${product.id}`}>
//                       <h3 className="font-bold text-lg text-gray-800 hover:text-blue-600 transition-colors line-clamp-2">
//                         {product.name}
//                       </h3>
//                     </Link>

//                     <p className="text-sm text-gray-600 mt-2 line-clamp-3 flex-grow">
//                       {product.description}
//                     </p>

//                     <div className="flex items-center gap-1 mt-3">
//                       {[...Array(5)].map((_, i) => (
//                         <Star
//                           key={i}
//                           className={`w-4 h-4 ${i < 4 ? "text-yellow-400 fill-current" : "text-gray-300"}`}
//                         />
//                       ))}
//                       <span className="text-xs text-gray-500 ml-1">(4.0)</span>
//                     </div>

//                     <div className="flex items-center justify-between mt-4">
//                       <div>
//                         <p className="text-2xl font-bold text-gray-800 flex items-center gap-1">
//                           <DollarSign className="w-5 h-5 text-green-600" />
//                           Rs {product.price.toFixed(2)}
//                         </p>
//                       </div>

//                       <button
//                         onClick={() => addToCart(product)}
//                         className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all duration-200 transform active:scale-95 shadow-lg hover:shadow-xl"
//                       >
//                         <ShoppingCart className="w-5 h-5" />
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             <div className="mt-12">
//               <Pagination
//                 currentPage={currentPage}
//                 totalPages={totalPages}
//                 onPageChange={handlePageChange}
//                 totalItems={products.length}
//                 itemsPerPage={itemsPerPage}
//                 showSummary={true}
//               />
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }


import React, { useState, useEffect } from "react";
import { ShoppingCart, Package, Star, Loader2, AlertCircle, Tag, DollarSign, Filter } from "lucide-react";
import { Link } from "react-router-dom";

import usePagination from "../hooks/usePagination";    
import Pagination from "../components/Pagination";       

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All"); 

  const {
    currentPage,
    setCurrentPage,
    paginate,
    getTotalPages,
    itemsPerPage = 12
  } = usePagination(1, 12);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/admin/viewproducts");
        if (!res.ok) throw new Error("Failed to load products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        setError("Could not load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existing = cart.find(item => item.id === product.id);

    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.name} added to cart!`);
  };

  const categories = ["All", ...new Set(products.map(p => p.category).filter(Boolean))];


  const filteredProducts = selectedCategory === "All" 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const paginatedProducts = paginate(filteredProducts);
  const totalPages = getTotalPages(filteredProducts.length);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto" />
          <p className="text-gray-600 mt-4 font-medium">Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl flex items-center gap-3">
          <AlertCircle className="w-6 h-6" />
          <span className="font-medium">{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 flex items-center justify-center gap-3">
          <Package className="w-12 h-12 text-blue-600" />
          Our Products
        </h1>
        <p className="text-lg text-gray-600 mt-3">Shop the best deals, delivered fast</p>
      </div>

      <div className="max-w-7xl mx-auto mb-12">
        <div className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <Filter className="w-7 h-7 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-800">Shop by Category</h2>
            <span className="text-sm text-gray-500 ml-auto">
              {filteredProducts.length} products
            </span>
          </div>

          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  setCurrentPage(1); 
                }}
                className={`px-8 py-4 rounded-2xl font-semibold text-sm transition-all duration-300 transform hover:scale-105 shadow-md ${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-blue-500/50"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category === "All" ? "All Products" : category}
                {selectedCategory === category && (
                  <span className="ml-2 text-xs">✔</span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <Package className="w-20 h-20 mx-auto mb-5 text-gray-300" />
            <p className="text-xl font-semibold text-gray-600">No products in this category</p>
            <p className="text-gray-500 mt-2">Try selecting another category!</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
              {paginatedProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden group flex flex-col h-full border border-gray-100"
                >
                  <Link to={`/product/${product.id}`} className="block relative overflow-hidden">
                    <div className="h-64 bg-gray-100">
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            e.target.src = "https://via.placeholder.com/600x600?text=No+Image";
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Package className="w-16 h-16 text-gray-300" />
                        </div>
                      )}
                    </div>

                    <div className="absolute top-3 right-3 bg-purple-600 text-white px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1">
                      <Tag className="w-3 h-3" />
                      {product.category}
                    </div>
                  </Link>

                  <div className="p-5 flex flex-col flex-grow">
                    <Link to={`/product/${product.id}`}>
                      <h3 className="font-bold text-lg text-gray-800 hover:text-blue-600 transition-colors line-clamp-2">
                        {product.name}
                      </h3>
                    </Link>

                    <p className="text-sm text-gray-600 mt-2 line-clamp-3 flex-grow">
                      {product.description}
                    </p>

                    <div className="flex items-center gap-1 mt-3">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < 4 ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                        />
                      ))}
                      <span className="text-xs text-gray-500 ml-1">(4.0)</span>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <div>
                        <p className="text-2xl font-bold text-gray-800 flex items-center gap-1">
                          <DollarSign className="w-5 h-5 text-green-600" />
                          Rs {product.price.toFixed(2)}
                        </p>
                      </div>

                      <button
                        onClick={() => addToCart(product)}
                        className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all duration-200 transform active:scale-95 shadow-lg hover:shadow-xl"
                      >
                        <ShoppingCart className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                totalItems={filteredProducts.length}
                itemsPerPage={itemsPerPage}
                showSummary={true}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}











