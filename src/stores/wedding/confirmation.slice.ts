import { StateCreator } from "zustand";

export interface ConfirmationState {
  isConfirmed: boolean;
  setIsConfirmed: (value: boolean) => void;
}

export const createConfirmationSlice: StateCreator<ConfirmationState> = (
  set
) => ({
  isConfirmed: false,
  setIsConfirmed: (value: boolean) => set({ isConfirmed: value }),
});
