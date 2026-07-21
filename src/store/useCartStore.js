import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useToastStore } from './useToastStore';

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      deliveryCharge: 1,
      appliedCoupon: null,
      
      addToCart: (product, variant, qty = 1) => {
        set((state) => {
          const existingItemIndex = state.items.findIndex(
            (i) => i.product.id === product.id && i.variant === variant
          );

          if (existingItemIndex > -1) {
            const newItems = [...state.items];
            newItems[existingItemIndex].qty += qty;
            return { items: newItems };
          }
          
          return { items: [...state.items, { product, variant, qty }] };
        });
        useToastStore.getState().showToast(`Added ${product.name} to cart!`);
      },
      
      removeFromCart: (productId, variant) => set((state) => ({
        items: state.items.filter(item => !(item.product.id === productId && item.variant === variant))
      })),
      
      updateQuantity: (productId, variant, qty) => set((state) => {
        if (qty <= 0) {
          return {
            items: state.items.filter(item => !(item.product.id === productId && item.variant === variant))
          };
        }
        
        return {
          items: state.items.map(item => 
            (item.product.id === productId && item.variant === variant) 
              ? { ...item, qty } 
              : item
          )
        };
      }),

      clearCart: () => set({ items: [], appliedCoupon: null }),

      applyCoupon: (coupon) => set({ appliedCoupon: coupon }),
      removeCoupon: () => set({ appliedCoupon: null }),

      getSubtotal: () => {
        return get().items.reduce((sum, item) => {
          const price = item.variant?.price || item.product.price || 0;
          return sum + (price * item.qty);
        }, 0);
      },

      getTotalSavings: () => {
        return get().items.reduce((sum, item) => {
          const originalPrice = item.variant?.originalPrice || item.product.originalPrice;
          const currentPrice = item.variant?.price || item.product.price;
          if (originalPrice && originalPrice > currentPrice) {
            return sum + ((originalPrice - currentPrice) * item.qty);
          }
          return sum;
        }, 0);
      },

      getDiscount: () => {
        const subtotal = get().getSubtotal();
        const coupon = get().appliedCoupon;
        if (!coupon) return 0;
        
        let discount = 0;
        if (coupon.discount_type === 'percentage') {
          discount = subtotal * (coupon.discount_value / 100);
          // Assuming max_discount is not available or handled via business rules, just calculate percentage
          // if coupon.max_discount is available we could cap it:
          // if (coupon.max_discount) discount = Math.min(discount, coupon.max_discount);
        } else {
          discount = coupon.discount_value; // flat amount
        }
        return discount > subtotal ? subtotal : discount;
      },

      getTotal: () => {
        const subtotal = get().getSubtotal();
        const discount = get().getDiscount();
        return subtotal > 0 ? (subtotal - discount) + get().deliveryCharge : 0;
      }
    }),
    {
      name: 'pooja-cart-storage',
      merge: (persistedState, currentState) => ({
        ...currentState,
        ...persistedState,
        deliveryCharge: 1
      })
    }
  )
);
