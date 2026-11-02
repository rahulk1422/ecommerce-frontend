import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useWishlistStore = create(persist((set) => ({
    ids: [],

    toggleWishlist: (id) => set((state) => {
        // Pehle se wishlist me hai to hata do
        if(state.ids.includes(id)) {
            return {ids: state.ids.filter((itemId) => itemId !== id) };
        }
        // else add kar do
        return { ids: [...state.ids, id]};
    }),
}),
 {name: "wishlist-storage"}
));