import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import * as SecureStore from 'expo-secure-store';

interface AuthState {
  isAuthenticated: boolean | undefined;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  logout: () => void;
}

const secureStorage = createJSONStorage(() => ({
  getItem: async (key: string) => {
    return await SecureStore.getItemAsync(key);
  },
  setItem: async (key: string, value: string) => {
    await SecureStore.setItemAsync(key, value);
  },
  removeItem: async (key: string) => {
    await SecureStore.deleteItemAsync(key);
  },
}));

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: undefined,
      setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
      logout: () => set({ isAuthenticated: false }),
    }),
    {
      name: 'auth-storage', 
      storage: secureStorage, 
    }
  )
);
