
import {create} from "zustand";

interface User {
  id: string;
  email: string;
  token: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => void;
  logout: () => void;
  checkAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  error: null,

  login: (email, password) => {   
    set({ isLoading: true, error: null });
    try {
      const mockUser = { id: "1", email, password, token: "mock-token" };
      set({
        user: mockUser,
        isLoading: false,
      });
      localStorage.setItem("token", mockUser.token);
      console.log(mockUser) 
    } catch (err) {
      set({
        error: "Ошибка авторизации. Проверьте email и пароль.",
        isLoading: false,
      });
    }
  },

  logout: () => {
    set({ user: null });
    localStorage.removeItem("token"); 
    
  },

  checkAuth: () => {
    const token = localStorage.getItem("token");
    if (token) {
   
      set({ user: { id: "1", email: "user@example.com", token } });
    }
  },
}));
