import { create } from "zustand";
import { saveAuthToken, getAuthToken, removeAuthToken } from "../storage";

interface AuthState {
  authToken: string | null;
  userId: string | null;
  authenticate: ({ token, userId }: { token: string; userId: string }) => void;
  logout: () => void;
  getCredential: () => void;
}

export const useAuthStore = create<AuthState>()((set) => ({
  authToken: null,
  userId: null,
  authenticate: async ({ token, userId }) => {
    try {
      await saveAuthToken({ token, userId });
      set(() => ({ authToken: token, userId }));
    } catch (error) {
      console.error("Failed to store key", error);
    }
  },
  logout: async () => {
    try {
      await removeAuthToken();
      set(() => ({ authToken: null, userId: null }));
    } catch (error) {
      console.error("Failed to clear key", error);
    }
  },
  getCredential: async () => {
    try {
      const { token, userId } = await getAuthToken();
      if (token && userId) {
        set(() => ({ authToken: token, userId: userId }));
      } else {
        set(() => ({ authToken: null, userId: null }));
      }
    } catch (error) {
      console.error("Failed to get credentials from keychain", error);
    }
  },
}));

export const useAuthState = () =>
  useAuthStore((state) => ({ token: state.authToken, userId: state.userId }));
