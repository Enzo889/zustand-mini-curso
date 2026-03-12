import { create, StateCreator } from "zustand";
import type { User, AuthStatus } from "../../interface";
import { AuthService } from "../../service/auth.service";
import { devtools, persist } from "zustand/middleware";

export interface AuthStore {
  status: AuthStatus;
  token?: string;
  user?: User;

  loginUser: (email: string, password: string) => Promise<void>;
  checkAuthStatus: () => Promise<void>;
  logOutUser: () => void;
}

const storeApi: StateCreator<AuthStore> = (set) => ({
  status: "checking",
  token: undefined,
  user: undefined,

  loginUser: async (email: string, password: string) => {
    try {
      const { token, ...user } = await AuthService.login(email, password);
      set({ status: "authenticated", token, user });
    } catch (error) {
      set({ status: "unauthenticated", token: undefined, user: undefined });
      throw "Login failed";
    }
  },
  checkAuthStatus: async () => {
    try {
      const { token, ...user } = await AuthService.checkStatus();
      set({ status: "authenticated", token, user });
    } catch (error) {
      set({ status: "unauthenticated", token: undefined, user: undefined });
    }
  },
  logOutUser: () => {
    set({ status: "unauthenticated", token: undefined, user: undefined });
  },
});

export const useAuthStore = create<AuthStore>()(
  devtools(persist(storeApi, { name: "auth-storage" })),
);
