import { 
  CheckCircle2, 
  Package, 
  Truck, 
  Shield, 
  ArrowRight, 
  Download, 
  Home,
  ShoppingBag
} from "lucide-react";
import { Link } from "react-router-dom";

export default function PaymentSuccess() {
  const orderId = "ORD-" + Math.floor(100000 + Math.random() * 900000);
  const estimatedDelivery = "Nov 24 - Nov 27, 2025";

  return (
    <div className="min-h-screen gradient-to-br from-green-50 via-blue-50 to-purple-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-2xl w-full">
      
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
       
          <div className="gradient-to-r from-green-500 to-emerald-600 px-8 py-12 text-center">
            <div className="inline-flex items-center justify-center w-28 h-28 bg-white/20 backdrop-blur-sm rounded-full mb-6">
              <CheckCircle2 className="w-16 h-16 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3">
              Payment Successful!
            </h1>
            <p className="text-xl text-green-50 font-medium">
              Thank you for shopping with us
            </p>
          </div>

      
          <div className="px-8 py-10">
          
            <div className="gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 mb-8 border border-blue-100">
              <div className="text-center mb-8">
                <p className="text-sm text-gray-600 uppercase tracking-wider font-semibold">Order ID</p>
                <p className="text-2xl font-bold text-gray-800 mt-2">{orderId}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                  <Package className="w-10 h-10 text-blue-600 mx-auto mb-3" />
                  <p className="text-sm text-gray-600">Order Confirmed</p>
                  <p className="font-bold text-gray-800 mt-1">Processing</p>
                </div>
                <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                  <Truck className="w-10 h-10 text-orange-600 mx-auto mb-3" />
                  <p className="text-sm text-gray-600">Estimated Delivery</p>
                  <p className="font-bold text-gray-800 mt-1">{estimatedDelivery}</p>
                </div>
                <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                  <Shield className="w-10 h-10 text-green-600 mx-auto mb-3" />
                  <p className="text-sm text-gray-600">Payment</p>
                  <p className="font-bold text-green-600 mt-1">Secured & Verified</p>
                </div>
              </div>
            </div>

        
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold text-gray-800 mb-3">
                Your order is confirmed!
              </h2>
              <p className="text-lg text-gray-600">
                We've sent a confirmation email with your order details to your inbox.
              </p>
            </div>

       
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link
                to="/product"
                className="flex items-center justify-center gap-3 px-8 py-4 gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <ShoppingBag className="w-6 h-6" />
                Continue Shopping
                <ArrowRight className="w-5 h-5" />
              </Link>

              <Link
                to="/"
                className="flex items-center justify-center gap-3 px-8 py-4 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Home className="w-6 h-6" />
                Back to Home
              </Link>
            </div>

          
            <div className="mt-8 text-center">
              <button className="inline-flex items-center gap-3 px-6 py-3 bg-white border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-medium rounded-xl transition-all duration-200 hover:shadow-md">
                <Download className="w-5 h-5" />
                Download Invoice
              </button>
            </div>
          </div>
        </div>

        <div className="mt-10 text-center">
          <div className="inline-flex items-center gap-8 bg-white/80 backdrop-blur-sm rounded-2xl px-8 py-6 shadow-lg border border-gray-100">
            <div className="text-center">
              <Shield className="w-10 h-10 text-green-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-700">100% Secure</p>
            </div>
            <div className="text-center">
              <Truck className="w-10 h-10 text-blue-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-700">Fast Delivery</p>
            </div>
            <div className="text-center">
              <Package className="w-10 h-10 text-purple-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-700">Easy Returns</p>
            </div>
          </div>
        </div>

    
      </div>
    </div>
  );
}