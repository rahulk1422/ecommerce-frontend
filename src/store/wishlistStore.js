import { create } from "zustand";

export const useWishlistStore = create((set) => ({
    ids: [],

    toggleWishlist: (id) => set((state) => {
        // Pehle se wishlist me hai to hata do
        if(state.ids.includes(id)) {
            return {ids: state.ids.filter((itemId) => itemId !== id) };
        }
        // else add kar do
        return { ids: [...state.ids, id]};
    }),
}));