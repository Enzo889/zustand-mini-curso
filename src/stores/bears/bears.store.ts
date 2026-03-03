import { create } from "zustand";

interface Bear {
  id: number;
  name: string;
}

interface BearState {
  blackBears: number;
  polarBears: number;
  pandaBears: number;
  redBears: number;

  computed: {
    totalBears: number;
  };

  bears: Bear[];

  increaseBlackBears: (by: number) => void;
  increasePolarBears: (by: number) => void;
  increasePandaBears: (by: number) => void;
  increaseRedBears: (by: number) => void;

  doNothing: () => void;
  addBear: () => void;
  removeBear: () => void;
}

export const useBearStore = create<BearState>()((set, get) => ({
  blackBears: 5,
  polarBears: 10,
  pandaBears: 15,
  redBears: 20,
  bears: [
    { id: 1, name: "Oso 1" },
    { id: 2, name: "Oso 2" },
  ],

  computed: {
    get totalBears() {
      return (
        get().bears.length +
        get().blackBears +
        get().pandaBears +
        get().polarBears +
        get().redBears
      );
    },
  },
  doNothing() {
    set((state) => ({
      bears: [...state.bears],
    }));
  },

  increaseBlackBears: (by: number) => {
    set((state) => ({
      blackBears: state.blackBears + by,
    }));
  },
  increasePolarBears: (by: number) => {
    set((state) => ({
      polarBears: state.polarBears + by,
    }));
  },
  increasePandaBears: (by: number) => {
    set((state) => ({
      pandaBears: state.pandaBears + by,
    }));
  },
  increaseRedBears: (by: number) => {
    set((state) => ({
      redBears: state.redBears + by,
    }));
  },

  removeBear() {
    set(() => ({
      bears: [],
    }));
  },
  addBear() {
    set((state) => ({
      bears: [
        ...state.bears,
        { id: state.bears.length + 1, name: `Oso ${state.bears.length + 1}` },
      ],
    }));
  },
}));
