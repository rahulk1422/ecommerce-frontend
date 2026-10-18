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
    })
}))