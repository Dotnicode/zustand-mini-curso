import { create } from "zustand";
import { devtools } from "zustand/middleware";
import {
  ConfirmationState,
  createConfirmationSlice,
} from "./confirmation.slice";
import { createDateSlice, DateSlice } from "./date.slice";
import { createGuestSlice, GuestSlice } from "./guest.slice";
import { createPersonSlice, PersonSlice } from "./person.slice";

type ShareState = PersonSlice & GuestSlice & DateSlice & ConfirmationState;

export const useWeddingBoundStore = create<ShareState>()(
  devtools((...a) => ({
    ...createPersonSlice(...a),
    ...createGuestSlice(...a),
    ...createDateSlice(...a),
    ...createConfirmationSlice(...a),
  }))
);
