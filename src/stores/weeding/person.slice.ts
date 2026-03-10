import { StateCreator } from "zustand";

export interface PersonSlice {
  firstName: string;
  lastName: string;

  setFirstName: (firstName: string) => void;
  setLastname: (lastName: string) => void;
}

export const createPersonSlice: StateCreator<PersonSlice> = (set) => ({
  firstName: "",
  lastName: "",
  setFirstName: (firstName: string) =>
    set({
      firstName,
    }),
  setLastname: (lastName: string) => set({ lastName }),
});
