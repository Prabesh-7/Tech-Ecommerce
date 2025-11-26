import React, { useState, useEffect } from "react";
import { Package, Truck, CheckCircle, Clock, ShoppingBag, User } from "lucide-react";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      setError("Please login to view your orders");
      setLoading(false);
      return;
    }

    const fetchOrders = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/my-orders", {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.detail || "Failed to load orders");
        }

        setOrders(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token]);

  const getStatusBadge = (status) => {
    const styles = {
      delivered: "bg-green-100 text-green-800 border-green-200",
      shipped: "bg-blue-100 text-blue-800 border-blue-200",
      processing: "bg-purple-100 text-purple-800 border-purple-200",
      pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
      cancelled: "bg-red-100 text-red-800 border-red-200",
    };
    const icons = {
      delivered: <CheckCircle className="w-5 h-5" />,
      shipped: <Truck className="w-5 h-5" />,
      processing: <ShoppingBag className="w-5 h-5" />,
      pending: <Clock className="w-5 h-5" />,
    };

    return (
      <span className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm border ${styles[status.toLowerCase()] || "bg-gray-100 text-gray-800"}`}>
        {icons[status.toLowerCase()] || <Clock className="w-5 h-5" />}
        {status}
      </span>
    );
  };

  if (!token) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-10 bg-white rounded-3xl shadow-xl">
          <User className="w-20 h-20 text-gray-300 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-gray-800">Login Required</h2>
          <p className="text-gray-600 mt-4">Please login to view your orders</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 flex items-center justify-center gap-4">
            <Package className="w-14 h-14 text-blue-600" />
            My Orders
          </h1>
          <p className="text-xl text-gray-600 mt-4">All your orders in one place</p>
        </div>

        {loading && (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent"></div>
            <p className="mt-6 text-xl text-gray-600">Loading your orders...</p>
          </div>
        )}

        {error && !loading && (
          <div className="bg-red-50 border border-red-200 rounded-3xl p-8 text-center">
            <p className="text-red-700 font-bold text-xl">{error}</p>
          </div>
        )}

        {!loading && orders.length === 0 && !error && (
          <div className="text-center py-20 bg-white rounded-3xl shadow-xl">
            <Package className="w-24 h-24 mx-auto text-gray-300 mb-6" />
            <h2 className="text-3xl font-bold text-gray-700">No Orders Yet</h2>
            <p className="text-gray-500 mt-3">Your ordered items will appear here</p>
          </div>
        )}

        {/* Orders List */}
        <div className="space-y-8">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 hover:shadow-3xl transition-all duration-300">
              <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <p className="text-sm opacity-90">Order ID</p>
                    <p className="text-2xl font-bold">{order.order_id}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm opacity-90">Placed On</p>
                    <p className="text-lg">{order.created_at}</p>
                  </div>
                </div>
              </div>

              <div className="p-8">
                <div className="grid md:grid-cols-3 gap-8 mb-8">
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">Delivery To</p>
                    <p className="font-bold text-lg">{order.customer_name}</p>
                    <p className="text-gray-600">{order.phone}</p>
                    <p className="text-gray-600 mt-2 text-sm">{order.address}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">Payment</p>
                    <p className="font-bold text-green-600 text-xl">{order.payment_method}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-500 mb-1">Total Amount</p>
                    <p className="text-4xl font-bold text-blue-600">
                      Rs {Number(order.total).toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-6">
                  {getStatusBadge(order.status)}
                  <span className="text-gray-500">{order.items.length} items</span>
                </div>

                <div className="mt-8 pt-8 border-t-2 border-dashed border-gray-200">
                  <h3 className="font-bold text-lg mb-4 text-gray-800">Ordered Items:</h3>
                  <div className="grid gap-4">
                    {order.items.map((item, i) => (
                      <div key={i} className="flex items-center justify-between bg-gray-50 rounded-2xl p-5 hover:bg-gray-100 transition">
                        <div className="flex items-center gap-4">
                          {item.image ? (
                            <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-xl" />
                          ) : (
                            <div className="w-16 h-16 bg-gray-200 rounded-xl flex items-center justify-center">
                              <Package className="w-8 h-8 text-gray-400" />
                            </div>
                          )}
                          <div>
                            <p className="font-semibold text-gray-800">{item.name}</p>
                            <p className="text-sm text-gray-500">Qty: {item.quantity} × Rs {item.price}</p>
                          </div>
                        </div>
                        <p className="font-bold text-lg text-gray-800">
                          Rs {(item.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}