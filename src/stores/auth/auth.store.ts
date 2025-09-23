import { create, StateCreator } from "zustand";
import type { AuthStatus, User } from "../../interfaces";
import { AuthService } from "../../services/auth.service";
import { devtools, persist } from "zustand/middleware";

export interface AuthState {
  status: AuthStatus;
  token?: string;
  user?: User;

  loginUser: (email: string, password: string) => Promise<void>;
  checkAuthStatus: () => Promise<void>;
}

const storeApi: StateCreator<AuthState> = (set) => ({
  status: "pending",
  token: undefined,
  user: undefined,

  loginUser: async (email, password) => {
    try {
      const { token, ...user } = await AuthService.login(email, password);
      set({ status: "authorize", token, user });
    } catch (error) {
      set({ status: "unauthorized", token: undefined, user: undefined });
    }
  },

  checkAuthStatus: async () => {
    try {
      const { token, ...user } = await AuthService.checkStatus();
      set({ status: "authorize", token, user });
    } catch (error) {
      set({ status: "unauthorized", token: undefined, user: undefined });
    }
  },
});

export const useAuthStore = create<AuthState>()(
  persist(devtools(storeApi), { name: "auth-storage" })
);
