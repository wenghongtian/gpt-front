import { getInitialState } from "@/main";
import { create } from "zustand";

type ThenAns<T = unknown> = T extends Promise<infer U> ? U : T;

type State = ThenAns<ReturnType<typeof getInitialState>>;

interface GlobalData {
  initialState?: State;
  setInitialState: (action: State | ((state: State) => State)) => void;
}

export const useGlobalDataStore = create<GlobalData>((set) => ({
  initialState: null as any,
  setInitialState: (action: State | ((state: State) => State)) => {
    set((state) => {
      const payload =
        typeof action === "function" ? action(state.initialState!) : action;
      const initialState = payload;
      return {
        initialState,
      };
    });
  },
}));
