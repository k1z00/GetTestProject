import { create } from "zustand";

interface FetchState {
  loading: boolean; 
  error: string | null; 
  title: string; 
  source: string; 
  isSuccess: boolean; 
  setTitle: (title: string) => void; 
  setSource: (source: string) => void; 
  setLoading: (loading: boolean) => void; 
  setError: (error: string | null) => void; 
  setIsSuccess: (isSuccess: boolean) => void; 
  resetForm: () => void; }

export const useFetchStore = create<FetchState>((set) => ({
  loading: false,
  error: null,
  title: "",
  source: "",
  isSuccess: false,
  setTitle: (title: string) => set({ title }),
  setSource: (source: string) => set({ source }),
  setLoading: (loading: boolean) => set({ loading }),
  setError: (error: string | null) => set({ error }),
  setIsSuccess: (isSuccess: boolean) => set({ isSuccess }),
  resetForm: () =>
    set({ title: "", source: "", error: null, isSuccess: false }),
}));
