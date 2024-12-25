import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import * as SecureStore from 'expo-secure-store';
import literals from '@/constants/literals';

interface ExpoPushState {
  expoPushToken: string | undefined;
  setExpoPushToken: (expoPushToken: string | undefined) => void;
  getExpoPushToken: () => Promise<string | undefined>;
  removeExpoPushToken: () => Promise<void>;
}

const secureStorage = createJSONStorage(() => ({
  getItem: async (key: string) => {
    return await SecureStore.getItemAsync(key);
  },
  setItem: async (key: string, value: string) => {
    if (value) {
      await SecureStore.setItemAsync(key, value);
    }
  },
  removeItem: async (key: string) => {
    await SecureStore.deleteItemAsync(key);
  },
}));

export const useExpoPushStore = create<ExpoPushState>()(
  persist(
    (set, get) => ({
      expoPushToken: undefined,
      setExpoPushToken: (expoPushToken: string | undefined) => {
        set({ expoPushToken });
        if (expoPushToken) {
          SecureStore.setItemAsync(
            literals.SecureStorageKeys.EXPO_PUSH_TOKEN,
            expoPushToken
          );
        }
      },
      getExpoPushToken: async () => {
        const token = await SecureStore.getItemAsync(
          literals.SecureStorageKeys.EXPO_PUSH_TOKEN
        );
        return token!;
      },
      removeExpoPushToken: async () => {
        set({ expoPushToken: undefined });
        await SecureStore.deleteItemAsync(
          literals.SecureStorageKeys.EXPO_PUSH_TOKEN
        );
      },
    }),
    {
      name: 'expo-push-storage',
      storage: secureStorage,
    }
  )
);
