import { create } from "zustand";
import { apiClient } from "../lib/api-client";
import { User } from "../../types/models/test";

interface AuthState {
  user: User | null;
  isLoading: boolean;
  premisson: string[];
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, verificationCode: string, name: string ) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
}


const getInitialState = () => {
  const token = localStorage.getItem("token");
  return {
    user: null,
    isLoading: false,
    error: null,
    premisson: [],
    token: token || null,
  };
};

export const useAuthStore = create<AuthState>((set) => ({
  ...getInitialState(),

  login: async (email, password) => {
    set({ isLoading: true, error: null });

    try {
      const response = await apiClient.SignInUser(email, password);
      const user: User = {
        id: response.user.id,
        name: response.user.name,
        createdAt: response.user.createdAt,
        updatedAt: response.user.updatedAt,
      };

      const premisson = await apiClient.FetchUserPermissions(user.id.toString());
      localStorage.setItem("token", response.token);
     

      
      set({ premisson, user, isLoading: false });
    } catch (err) {
      set({
        error: "Ошибка авторизации. Проверьте email и пароль.",
        isLoading: false,
      });
      console.error("Ошибка при авторизации:", err);
    }
  },

  logout: () => {
    set({ user: null, premisson: [] });
    localStorage.removeItem("token");
  },



  checkAuth: async () => {
    const token = localStorage.getItem("token");
   

    if (token) {
      set({ isLoading: true, error: null });

      try {
        const { token: newToken, user } = await apiClient.FetchAuthUser();
        localStorage.setItem("token", newToken); // Обновляем токен

        set({
          user: {
            id: user.id,
            name: user.name,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
          },
          isLoading: false,
        });
      } catch (err) {
        if (err) {
          console.log("Токен недействителен или истек. Удаляем токен.");
          localStorage.removeItem("token");
        }
        set({ user: null, isLoading: false });
        console.error("Ошибка при проверке авторизации:", err);
      }
    } else {
      set({ isLoading: false });
    }
  },
  
  signUp: async (email: string, verificationCode: string, password: string, name: string) => {
    set({ isLoading: true, error: null });

    try {
      const { token, user } = await apiClient.SignUpUser(email, verificationCode, password, name);

     
      localStorage.setItem("token", token);

     
      set({
        user: {
          id: user.id,
          name: user.name,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
        isLoading: false,
      });
    } catch (err) {
      set({ error: 'oj', isLoading: false });
      console.error("Ошибка при регистрации:", err);
    }
  },



}));

