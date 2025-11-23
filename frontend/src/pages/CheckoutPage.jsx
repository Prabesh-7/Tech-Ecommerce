import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, Package, CreditCard, MapPin, Phone, Loader2, CheckCircle } from "lucide-react";
import { useCartStore } from "../store/cartStore";

export default function CheckoutPage() {
  const { cart, clearCart } = useCartStore();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const subtotal = cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
  const tax = subtotal * 0.13;
  const total = subtotal + tax;

  const onSubmit = async (data) => {
  setLoading(true);

  const orderPayload = {
    name: data.name,
    phone: data.phone,
    address: data.address,
    city: data.city || "Kathmandu",
    province: data.province || "Bagmati",
    items: cart.map(item => ({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity || 1,
      image: item.image || null
    })),
    subtotal: subtotal,
    tax: tax,
    total: total,
    payment: data.payment
  };

  try {
    const response = await fetch("http://127.0.0.1:8000/api/place-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderPayload)
    });

    const result = await response.json();

    if (!response.ok) {
      console.error("Backend Error:", result);
      throw new Error(result.detail || "Order failed");
    }

    setOrderId(result.order_id);
    clearCart();

    if (data.payment === "esewa") {
      navigate("/payment", { state: { total: total.toFixed(2), orderId: result.order_id } });
    } else {
      setStep(2);
    }

  } catch (err) {
    console.error("Frontend Error:", err);
    alert("Order failed: " + err.message);
  } finally {
    setLoading(false);
  }
};



  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-20">
        <div className="text-center">
          <ShoppingCart className="w-20 h-20 mx-auto mb-5 text-gray-300" />
          <p className="text-xl font-semibold text-gray-600">Your cart is empty</p>
          <button
            onClick={() => navigate("/products")}
            className="mt-6 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  if (step === 2) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-20 px-4">
        <div className="max-w-md w-full text-center">
          <div className="bg-white rounded-2xl shadow-2xl p-10 border border-gray-100">
            <CheckCircle className="w-24 h-24 mx-auto mb-6 text-green-600" />
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Order Confirmed!</h1>
            <p className="text-xl text-gray-600 mb-4">Thank you for your purchase</p>
            <p className="text-3xl font-bold text-blue-600 mb-8">#{orderId}</p>

            <div className="gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 mb-8 text-left text-sm font-medium">
              <p><strong>Payment Method:</strong> Cash on Delivery</p>
              <p><strong>Total Amount:</strong> Rs {total.toFixed(2)}</p>
              <p><strong>Items:</strong> {cart.length} product(s)</p>
              <p><strong>Estimated Delivery:</strong> 3-5 business days</p>
            </div>

            <button
              onClick={() => navigate("/products")}
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 flex items-center justify-center gap-3">
            <CreditCard className="w-12 h-12 text-blue-600" />
            Checkout
          </h1>
          <p className="text-lg text-gray-600 mt-3">Complete your order securely</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
       
              <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
                <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <MapPin className="w-6 h-6 text-blue-600" />
                  Shipping Address
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all text-sm"
                      {...register("name", { required: "Name is required" })}
                    />
                    {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                      <input
                        type="tel"
                        placeholder="98XXXXXXXX"
                        className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all text-sm"
                        {...register("phone", {
                          required: "Phone is required",
                          pattern: { value: /^\d{10}$/, message: "Enter 10 digits" },
                        })}
                      />
                    </div>
                    {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone.message}</p>}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Street Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="House no., Street, Area"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all text-sm"
                      {...register("address", { required: "Address is required" })}
                    />
                    {errors.address && <p className="mt-1 text-xs text-red-600">{errors.address.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">City</label>
                    <input
                      type="text"
                      placeholder="Kathmandu"
                      defaultValue="Kathmandu"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all text-sm"
                      {...register("city")}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Province</label>
                    <select
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all text-sm"
                      {...register("province")}
                    >
                      <option>Bagmati</option>
                      <option>Province 1</option>
                      <option>Gandaki</option>
                      <option>Lumbini</option>
                    </select>
                  </div>
                </div>
              </div>

         
              <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
                <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <CreditCard className="w-6 h-6 text-blue-600" />
                  Payment Method
                </h2>

                <div className="space-y-4">
                  <label className="flex items-center p-4 bg-gray-50 rounded-xl border-2 border-gray-200 cursor-pointer hover:border-blue-500 transition-all">
                    <input type="radio" value="cod" {...register("payment", { required: true })} className="mr-4 w-5 h-5" defaultChecked />
                    <div>
                      <p className="font-bold text-gray-800">Cash on Delivery (COD)</p>
                      <p className="text-sm text-gray-600">Pay when you receive your order</p>
                    </div>
                  </label>

                  <label className="flex items-center p-4 bg-gray-50 rounded-xl border-2 border-gray-200 cursor-pointer hover:border-blue-500 transition-all">
                    <input type="radio" value="esewa" {...register("payment", { required: true })} className="mr-4 w-5 h-5" />
                    <div>
                      <p className="font-bold text-gray-800">eSewa</p>
                      <p className="text-sm text-gray-600">Pay securely with eSewa wallet</p>
                    </div>
                  </label>
                </div>
              </div>

           
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => navigate("/cart")}
                  className="flex-1 py-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-bold transition-all"
                >
                  Back to Cart
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className={`flex-1 py-4 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${
                    loading ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin w-5 h-5" />
                      Processing Order...
                    </>
                  ) : (
                    <>
                      <Package className="w-5 h-5" />
                      Place Order
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 sticky top-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Order Summary</h2>

              <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 pb-4 border-b last:border-0">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                      {item.image ? (
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      ) : (
                        <Package className="w-10 h-10 text-gray-300 m-auto" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-800 line-clamp-1">{item.name}</p>
                      <p className="text-xs text-gray-500">Qty: {item.quantity || 1}</p>
                    </div>
                    <p className="font-semibold text-gray-800 whitespace-nowrap">
                      Rs {(item.price * (item.quantity || 1)).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t mt-6 pt-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">Rs {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax (13% VAT)</span>
                  <span className="font-semibold">Rs {tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-4 border-t">
                  <span>Total</span>
                  <span className="text-green-600">Rs {total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
