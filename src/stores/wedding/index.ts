import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { createGuestSlice, GuestSlice } from "./guest.slice";
import { createPersonSlice, PersonSlice } from "./person.slice";

type ShareState = PersonSlice & GuestSlice;

export const useWeddingBoundStore = create<ShareState>()(
  devtools((...a) => ({
    ...createPersonSlice(...a),
    ...createGuestSlice(...a),
  }))
);
