import { create } from "zustand";

export const useCartStore = create((set) => ({
    items:[],

    addToCart: (product, quantity) => set((state) => {
        const existing = state.items.find((item) => item.id === product.id);

         // Agar product pehle se cart me hai, to bas quantity badhao
        if(existing){
            return{
                items: state.items.map((item) =>
                  item.id ===product.id ? { ...item, quantity:item.quantity+ quantity} :item
                ),
            };
        }

        // Warna naya item add karo
        return { items: [ ...state.items, { ...product, quantity}]};
    }),

    removeFromCart: (id) => set((state) => ({
        items: state.items.filter((item) => item.id !== id)
    })),

    increaseQty: (id) => set((state) => ({
            items: state.items.map((item) => 
            item.id === id ? { ...item, quantity: item.quantity + 1} : item
        ),
    })),

    decreaseQty: (id) => set((state) => ({
        items: state.items.map((item) =>
        item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1} : item),
    })), 
}))