import { create } from "zustand";

export const useSearchStore = create((set) => ({
  query: "", 

  setQuery: (newQuery) => set({ query: newQuery }), 
  clearQuery: () => set({ query: "" }), 
}));