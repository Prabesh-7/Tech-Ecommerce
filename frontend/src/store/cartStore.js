import { create } from "zustand";


const useCartStore = create((set, get) => ({
  cart: [],

 
  loadCart: () => {
    const saved = localStorage.getItem("cart");
    if (saved) {
      set({ cart: JSON.parse(saved) });
    }
  },

  addToCart: (product) =>
    set((state) => {
      const existing = state.cart.find((item) => item.id === product.id);
      let newCart;

      if (existing) {
        newCart = state.cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        newCart = [...state.cart, { ...product, quantity: 1 }];
      }

      localStorage.setItem("cart", JSON.stringify(newCart));
      return { cart: newCart };
    }),

  removeFromCart: (id) =>
    set((state) => {
      const newCart = state.cart.filter((item) => item.id !== id);
      localStorage.setItem("cart", JSON.stringify(newCart));
      return { cart: newCart };
    }),

  updateQuantity: (id, quantity) =>
    set((state) => {
      if (quantity < 1) {
        const newCart = state.cart.filter((item) => item.id !== id);
        localStorage.setItem("cart", JSON.stringify(newCart));
        return { cart: newCart };
      }
      const newCart = state.cart.map((item) =>
        item.id === id ? { ...item, quantity } : item
      );
      localStorage.setItem("cart", JSON.stringify(newCart));
      return { cart: newCart };
    }),

  clearCart: () =>
    set(() => {
      localStorage.removeItem("cart");
      return { cart: [] };
    }),

 
  getCartCount: () => {
    const state = get();
    return state.cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  },
}));


useCartStore.getState().loadCart();

export { useCartStore };