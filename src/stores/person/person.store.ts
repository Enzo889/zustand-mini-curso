import { create, type StateCreator } from "zustand";
import { devtools, persist } from "zustand/middleware";
// import { firebaseStorage } from "../storage/firebase.storage";
import { logger } from "../middleware/logger.middleware";
import { useWeddingBoundStore } from "../weeding";

interface PersonState {
  firstName: string;
  lastName: string;
}

interface Actions {
  setFirstName: (firstName: string) => void;
  setLastName: (lastName: string) => void;
}

const storeApi: StateCreator<
  PersonState & Actions,
  [["zustand/devtools", never], ["zustand/persist", unknown]]
> = (set) => ({
  firstName: " ",
  lastName: " ",

  setFirstName: (value: string) =>
    set({ firstName: value }, false, "setFirstName"),
  setLastName: (value: string) =>
    set({ lastName: value }, false, "setLastName"),
});

export const usePersonStore = create<PersonState & Actions>()(
  logger(
    devtools(
      persist(storeApi, {
        name: "person-storage",
        // storage: customSessionStorage,
        // storage: firebaseStorage,
      }),
    ),
  ),
);

// Sincronización con el store de la boda usando subscribe
usePersonStore.subscribe((newState /*prevState*/) => {
  const { firstName, lastName } = newState;

  useWeddingBoundStore.getState().setFirstName(firstName);
  useWeddingBoundStore.getState().setLastname(lastName);
});
