import { XCircle, AlertCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function PaymentFailure() {
  return (

    
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-20 px-4">
      <div className="max-w-md w-full text-center">
        <div className="bg-white rounded-2xl shadow-2xl p-10">
          <XCircle className="w-24 h-24 mx-auto mb-6 text-red-600" />
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Payment Failed</h1>
          <p className="text-xl text-gray-600 mb-8">We couldn't process your payment</p>

          <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8">
            <div className="flex items-center gap-3 text-red-700">
              <AlertCircle className="w-6 h-6" />
              <span className="font-semibold">Transaction Declined</span>
            </div>
            <p className="text-sm text-gray-600 mt-3">
              Please check your eSewa balance or try again later.
            </p>
          </div>

          <div className="space-y-4">
            <Link
              to="/checkout"
              className="w-full py-4 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl"
            >
              Try Again
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/products"
              className="block text-blue-600 hover:text-blue-700 font-medium"
            >
              ← Back to Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}