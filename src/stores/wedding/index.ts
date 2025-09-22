import { create } from "zustand";
import { createPersonSlice, PersonSlice } from "./person.slice";

type ShareState = PersonSlice;

export const useWeddingBoundStore = create<ShareState>()((...a) => ({
  ...createPersonSlice(...a),
}));
