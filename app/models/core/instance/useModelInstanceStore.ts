"use client";

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface ModelInstanceState {
  inputs: Record<string, number>;
  setInputs: (inputs: Record<string, number>) => void;
  setInput: (key: string, value: number) => void;
}

export const useModelInstanceStore = create<ModelInstanceState>()(
  immer((set) => ({
    inputs: {},

    setInputs: (inputs) =>
      set((state) => {
        state.inputs = inputs;
      }),

    setInput: (key, value) =>
      set((state) => {
        state.inputs[key] = value;
      }),
  }))
);
