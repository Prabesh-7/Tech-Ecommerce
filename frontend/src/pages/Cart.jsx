import { ShoppingCart, Package, Trash2, Plus, Minus, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useCartStore } from "../store/cartStore";

export default function Cart() {
  const { cart, removeFromCart, clearCart, updateQuantity } = useCartStore();


  const subtotal = cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
  const tax = subtotal * 0.13; 
  const total = subtotal + tax;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-20 px-4">
        <div className="text-center max-w-md">
          <ShoppingCart className="w-20 h-20 mx-auto mb-6 text-gray-300" />
          <h2 className="text-2xl font-bold text-gray-700 mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-6">Add some products to get started!</p>
          <Link
            to="/Product"
            className="inline-flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all shadow-md hover:shadow-lg"
          >
            Continue Shopping
          </Link>
          
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
   
        <div className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 flex items-center justify-center gap-3">
            <ShoppingCart className="w-12 h-12 text-blue-600" />
            Shopping Cart
          </h1>
          <p className="text-lg text-gray-600 mt-3">Review and manage your selected items</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
     
          <div className="lg:col-span-2 space-y-6">
            {cart.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-md p-6 flex flex-col sm:flex-row items-start gap-6 border border-gray-100 hover:shadow-lg transition-all"
              >
             
                <div className="w-full sm:w-32 h-32 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/400x400?text=No+Image";
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Package className="w-12 h-12 text-gray-300" />
                    </div>
                  )}
                </div>

             
                <div className="flex-1 w-full">
                  <h3 className="text-xl font-bold text-gray-800 line-clamp-2">{item.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{item.category}</p>

                  <p className="text-2xl font-bold text-gray-800 mt-3">
                    Rs {item.price.toFixed(2)}
                  </p>

                  <div className="flex items-center gap-3 mt-4">
                    <span className="text-sm font-medium text-gray-700">Qty:</span>
                    <button
                      onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
                      className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all"
                      disabled={(item.quantity || 1) <= 1}
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <input
                      type="number"
                      value={item.quantity || 1}
                      onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                      className="w-16 text-center border border-gray-300 rounded-lg py-1.5 font-medium focus:outline-none focus:border-blue-500"
                      min="1"
                    />
                    <button
                      onClick={() => updateQuantity(item.id, (item_quantity || 1) + 1)}
                      className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="mt-4 flex items-center gap-2 text-red-600 hover:text-red-700 font-medium transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

  
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 sticky top-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Order Summary</h2>

                            <div className="space-y-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">Rs {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (13% VAT)</span>
                  <span className="font-semibold">Rs {tax.toFixed(2)}</span>
                </div>
                <div className="border-t pt-4 flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-blue-600">Rs {total.toFixed(2)}</span>
                </div>
              </div>

        
              <div className="mt-6">
                <Link
                  to="/checkout"
                  className="block w-full text-center py-4 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold transition-all transform active:scale-95 shadow-lg hover:shadow-xl"
                >
                  Proceed to Checkout
                </Link>
              </div>

              <button
                onClick={clearCart}
                className="w-full mt-3 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold transition-all"
              >
                Clear Cart
              </button>

               <Link
                            to="/Product"
                className="block text-center mt-4 text-blue-600 hover:text-blue-700 font-medium"
              >
                ← Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



