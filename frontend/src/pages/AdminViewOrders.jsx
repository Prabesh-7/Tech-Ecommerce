// src/pages/admin/AdminViewOrders.jsx
import React, { useState, useEffect } from "react";
import {
  Package, Search, Filter, Loader2, AlertCircle, Eye, DollarSign,
  Hash, Tag, Clock, CheckCircle, XCircle, Truck, User, Phone, MapPin, Calendar
} from "lucide-react";

export default function AdminViewOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/orders", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to load orders");
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      console.error(err);
      setError("Could not load orders. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };


  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.order_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.phone.includes(searchQuery);

    const matchesStatus = filterStatus === "all" || order.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case "paid":      return "bg-green-100 text-green-700";
      case "pending":   return "bg-yellow-100 text-yellow-700";
      case "shipped":   return "bg-blue-100 text-blue-700";
      case "delivered": return "bg-purple-100 text-purple-700";
      case "cancelled": return "bg-red-100 text-red-700";
      default:          return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "paid":      return <CheckCircle className="w-4 h-4" />;
      case "pending":   return <Clock className="w-4 h-4" />;
      case "shipped":   return <Truck className="w-4 h-4" />;
      case "delivered": return <Package className="w-4 h-4" />;
      case "cancelled": return <XCircle className="w-4 h-4" />;
      default:          return <Clock className="w-4 h-4" />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-red-50 border border-red-200 text-red-700 px-8 py-6 rounded-xl flex items-center gap-4">
          <AlertCircle className="w-8 h-8" />
          <div>
            <p className="font-bold text-lg">Error Loading Orders</p>
            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
  
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 flex items-center gap-4">
          <Package className="w-12 h-12 text-blue-600" />
          Manage Orders
        </h1>
        <p className="text-gray-600 mt-2 text-lg">Track and manage all customer orders in real-time</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-6 mb-8 border border-gray-100">
        <div className="flex flex-col lg:flex-row gap-5 items-center justify-between">
        
          <div className="relative flex-1 max-w-lg">
            <Search className="absolute left-4 top-4 w-6 h-6 text-gray-400" />
            <input
              type="text"
              placeholder="Search by Order ID, Name, Phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-6 py-4 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all text-base"
            />
          </div>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-6 py-4 gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl font-medium focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all"
          >
            <option value="all">All Orders</option>
            <option value="pending">Pending</option>
            <option value="paid">Paid</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
        {filteredOrders.length === 0 ? (
          <div className="text-center py-24">
            <Package className="w-20 h-20 mx-auto mb-6 text-gray-300" />
            <p className="text-2xl font-bold text-gray-500">No orders found</p>
            <p className="text-gray-400 mt-2">Try adjusting your search or filter</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="gradient-to-r  from-blue-600 to-purple-600 text-blue-600">
                <tr>
                  <th className="px-6 py-5 text-left text-sm font-bold uppercase tracking-wider">Order ID</th>
                  <th className="px-6 py-5 text-left text-sm font-bold uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-5 text-left text-sm font-bold uppercase tracking-wider">Items</th>
                  <th className="px-6 py-5 text-left text-sm font-bold uppercase tracking-wider">Total</th>
                  <th className="px-6 py-5 text-left text-sm font-bold uppercase tracking-wider">Payment</th>
                  <th className="px-6 py-5 text-left text-sm font-bold uppercase tracking-wider">Status</th>
                  <th className="px-6 py-5 text-left text-sm font-bold uppercase tracking-wider">Date</th>
                  <th className="px-6 py-5 text-center text-sm font-bold uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y  divide-gray-200">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 transition-all duration-200">
                
                    <td className="px-6 py-5">
                      <div>
                        <p className="font-bold text-blue-600 text-lg">#{order.order_id}</p>
                        <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(order.created_at).toLocaleDateString("en-NP")}
                        </p>
                      </div>
                    </td>

                  
                    <td className="px-6 py-5">
                      <div className="space-y-2">
                        <p className="flex items-center gap-2 font-semibold text-gray-800">
                          <User className="w-5 h-5 text-blue-600" />
                          {order.customer_name}
                        </p>
                        <p className="flex items-center gap-2 text-gray-600 text-sm">
                          <Phone className="w-4 h-4 text-green-600" />
                          {order.phone}
                        </p>
                        <p className="flex items-center gap-2 text-gray-500 text-xs">
                          <MapPin className="w-4 h-4 text-red-600" />
                          {order.address.length > 40 ? order.address.substring(0, 40) + "..." : order.address}
                        </p>
                      </div>
                    </td>

                    <td className="px-6 py-5">
                      <div className="text-sm">
                        <p className="font-bold text-gray-800 mb-1">{order.items.length} item(s)</p>
                        {order.items.slice(0, 2).map((item, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-gray-600">
                            <Hash className="w-3 h-3" />
                            <span>{item.quantity || 1}x {item.name}</span>
                          </div>
                        ))}
                        {order.items.length > 2 && (
                          <p className="text-xs text-gray-500 mt-1">+ {order.items.length - 2} more</p>
                        )}
                      </div>
                    </td>

                    <td className="px-6 py-5">
                      <p className="font-bold text-green-600 text-xl flex items-center gap-1">
                        <DollarSign className="w-5 h-5" />
                        Rs {parseFloat(order.total).toFixed(2)}
                      </p>
                    </td>

          
                    <td className="px-6 py-5">
                      <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-bold ${
                        order.payment_method === "esewa"
                          ? "gradient-to-r from-purple-100 to-pink-100 text-purple-700"
                          : "gradient-to-r from-green-100 to-emerald-100 text-green-700"
                      }`}>
                        {order.payment_method === "esewa" ? "eSewa Paid" : "Cash on Delivery"}
                      </span>
                    </td>

            
                    <td className="px-6 py-5">
                      <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold ${getStatusBadge(order.status)}`}>
                        {getStatusIcon(order.status)}
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </td>

                    <td className="px-6 py-5 text-gray-600">
                      {new Date(order.created_at).toLocaleString("en-NP", {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit"
                      })}
                    </td>

               
                    <td className="px-6 py-5 text-center">
                      <button className="p-3 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-xl transition-all shadow-md hover:shadow-lg transform hover:scale-110">
                        <Eye className="w-6 h-6" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>


      <div className="mt-8 text-center">
        <p className="text-lg text-gray-700">
          Showing <span className="font-bold text-2xl text-blue-600">{filteredOrders.length}</span> of{" "}
          <span className="font-bold text-2xl text-purple-600">{orders.length}</span> orders
        </p>
      </div>
    </div>
  );
}