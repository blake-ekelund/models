import { create } from "zustand";
import { DEFAULT_MODEL_INPUTS } from "@/app/models/defaultInputs";

interface ModelHistory<T> {
  past: T[];
  present: T;
  future: T[];
}

interface ModelInstanceState<T = any> {
  history: ModelHistory<T>;
  dirty: boolean;
  lastSavedAt: Date | null;

  setInputs: (next: T) => void;
  undo: () => void;
  redo: () => void;
  markSaved: () => void;
}

export const useModelInstanceStore = create<ModelInstanceState>((set, get) => ({
  history: {
    past: [],
    present: { ...DEFAULT_MODEL_INPUTS }, // ✅ never empty
    future: [],
  },
  dirty: false,
  lastSavedAt: null,

  setInputs: (next) => {
    const { history } = get();

    set({
      history: {
        past: [...history.past, history.present],
        present: next,
        future: [],
      },
      dirty: true,
    });
  },

  undo: () => {
    const { history } = get();
    if (history.past.length === 0) return;

    const previous = history.past[history.past.length - 1];
    const newPast = history.past.slice(0, -1);

    set({
      history: {
        past: newPast,
        present: previous,
        future: [history.present, ...history.future],
      },
      dirty: true,
    });
  },

  redo: () => {
    const { history } = get();
    if (history.future.length === 0) return;

    const next = history.future[0];
    const newFuture = history.future.slice(1);

    set({
      history: {
        past: [...history.past, history.present],
        present: next,
        future: newFuture,
      },
      dirty: true,
    });
  },

  markSaved: () => {
    set({
      dirty: false,
      lastSavedAt: new Date(),
    });
  },
}));
