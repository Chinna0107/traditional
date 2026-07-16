import { create } from 'zustand';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api";

export const useStoreData = create((set) => ({
  products: [],
  categories: [],
  loading: true,
  fetchData: async () => {
    try {
      set({ loading: true });
      const [prodRes, catRes] = await Promise.all([
        fetch(`${BACKEND_URL}/general/products`),
        fetch(`${BACKEND_URL}/general/categories`)
      ]);
      const prodData = await prodRes.json();
      const catData = await catRes.json();
      
      set({ 
        products: prodData.products || [], 
        categories: catData.categories || [],
        loading: false 
      });
    } catch (err) {
      console.error("Failed to fetch store data:", err);
      set({ loading: false });
    }
  }
}));
