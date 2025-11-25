import React, { useState, useEffect } from "react";
import { Package, Edit, Trash2, Search, Filter, Loader2, AlertCircle, Eye, DollarSign, Hash, Tag } from "lucide-react";
import { Link } from "react-router-dom";
import Pagination from "../components/Pagination";
import usePagination from "../hooks/usePagination";

export default function AdminViewProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [deletingId, setDeletingId] = useState(null);

  const token = localStorage.getItem("token");

  // PAGINATION HOOK
  const { currentPage, setCurrentPage, paginate, getTotalPages, resetPage } = usePagination(1, 10);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/admin/viewproducts", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to load products");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      setError("Could not load products. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    setDeletingId(id);
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/admin/products/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setProducts(prev => prev.filter(p => p.id !== id));
        alert("Product deleted successfully!");
      } else {
        alert("Failed to delete product");
      }
    } catch (err) {
      alert("Network error");
    } finally {
      setDeletingId(null);
    }
  };

  // FILTER LOGIC
  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         p.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === "all" || p.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ["all", ...new Set(products.map(p => p.category))];

  // PAGINATION
  const currentProducts = paginate(filteredProducts);
  const totalPages = getTotalPages(filteredProducts.length);

  // Reset page on search/filter change
  useEffect(() => {
    resetPage();
  }, [searchQuery, filterCategory]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl flex items-center gap-3">
          <AlertCircle className="w-6 h-6" />
          <span>{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-8 px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
          <Package className="w-9 h-9 text-blue-600" />
          Manage Products
        </h1>
        <p className="text-gray-600 mt-1">View, edit, or delete products from your store</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-5 mb-6 border border-gray-100">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all text-sm"
            />
          </div>

          <div className="flex gap-3 w-full lg:w-auto">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all text-sm"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat === "all" ? "All Categories" : cat}
                </option>
              ))}
            </select>

            <Link
              to="/admin/addProduct"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold flex items-center gap-2 transition-all shadow-md hover:shadow-lg"
            >
              <Package className="w-5 h-5" />
              Add Product
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <Package className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <p className="text-lg font-medium">No products found</p>
            <p className="text-sm mt-1">Try adjusting your search or filter</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Product</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Price</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Stock</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider pr-8">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {currentProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-5 whitespace-nowrap">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 bg-gray-100 rounded-xl overflow-hidden shrink-0">
                            {product.image ? (
                              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <Package className="w-7 h-7 text-gray-400" />
                              </div>
                            )}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-800 text-sm line-clamp-1">{product.name}</p>
                            <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{product.description}</p>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-5">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700">
                          <Tag className="w-3 h-3 mr-1" />
                          {product.category}
                        </span>
                      </td>

                      <td className="px-6 py-5">
                        <p className="font-semibold text-gray-800 flex items-center gap-1">
                          <DollarSign className="w-4 h-4 text-green-600" />
                          Rs {Number(product.price).toLocaleString()}
                        </p>
                      </td>

                      <td className="px-6 py-5">
                        <p className={`font-medium flex items-center gap-1 ${product.stock < 10 ? "text-red-600" : "text-gray-700"}`}>
                          <Hash className="w-4 h-4" />
                          {product.stock}
                          {product.stock < 10 && <span className="text-xs ml-1">(Low)</span>}
                        </p>
                      </td>

                      <td className="px-6 py-5">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          product.stock > 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                        }`}>
                          {product.stock > 0 ? "In Stock" : "Out of Stock"}
                        </span>
                      </td>

                      <td className="px-6 py-5 text-right pr-8">
                        <div className="flex items-center justify-end gap-2">
                          <Link to={`/admin/product/${product.id}`} className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-all" title="View">
                            <Eye className="w-5 h-5" />
                          </Link>
                          <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all" title="Edit">
                            <Edit className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => deleteProduct(product.id)}
                            disabled={deletingId === product.id}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all disabled:opacity-50"
                            title="Delete"
                          >
                            {deletingId === product.id ? <Loader2 className="w-5 h-5 animate-spin" /> : <Trash2 className="w-5 h-5" />}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* REUSABLE PAGINATION */}
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                totalItems={filteredProducts.length}
                itemsPerPage={10}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}


