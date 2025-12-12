import { create } from "zustand";
import { SaaSCoreInputs } from "./types";

interface SaaSCoreStore {
  inputs: SaaSCoreInputs;

  setInput: <K extends keyof SaaSCoreInputs>(
    key: K,
    value: SaaSCoreInputs[K]
  ) => void;

  // ✅ ADD THIS
  setAllInputs: (inputs: SaaSCoreInputs) => void;
}

export const useSaaSCoreStore = create<SaaSCoreStore>((set) => ({
  inputs: {
    monthlyAdSpend: 50000,
    cac: 500,
    arpu: 120,
    grossMarginPct: 0.8,
    monthlyChurnPct: 0.03,
  },

  setInput: (key, value) =>
    set((state) => ({
      inputs: {
        ...state.inputs,
        [key]: value,
      },
    })),

  // ✅ IMPLEMENTATION
  setAllInputs: (inputs) =>
    set(() => ({
      inputs,
    })),
}));
