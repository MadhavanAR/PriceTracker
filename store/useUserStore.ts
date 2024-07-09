import { create } from "zustand";

interface UserState {
  username: string;
  setUsername: (name: string) => void;
}

export const useUserState = create<UserState>(() => ({
  username: localStorage.getItem("username") || "loading",
  setUsername: (name: string) => {
    localStorage.setItem("username", name);
  },
}));
