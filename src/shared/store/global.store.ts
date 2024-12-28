import { create } from "zustand";

interface AuthModalStore {
    isAuthModalVisible: boolean;
    showAuthModal: () => void;
    hideAuthModal: () => void;
}

export const useAuthModalStore = create<AuthModalStore>((set) => ({
    isAuthModalVisible: false,
    showAuthModal: () => set({ isAuthModalVisible: true }),
    hideAuthModal: () => set({ isAuthModalVisible: false }),
}));