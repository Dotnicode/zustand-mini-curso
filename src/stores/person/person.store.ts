import { create, type StateCreator } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { firebaseStorage } from "../storages/firebase.storage";
import { logger } from "../middlewares/logger.middleware";

interface PersonState {
  firstName: string;
  lastName: string;
}
interface Actions {
  setFirstName: (firstName: string) => void;
  setLastName: (lastName: string) => void;
}

type PersonStore = PersonState & Actions;

const storeAPI: StateCreator<PersonStore, [["zustand/devtools", never]]> = (
  set
) => ({
  firstName: "",
  lastName: "",
  setFirstName: (value: string) =>
    set({ firstName: value }, false, "setFirstName"),
  setLastName: (value: string) =>
    set({ lastName: value }, false, "setLastName"),
});

export const usePersonStore = create<PersonStore>()(
  // logger(
  persist(devtools(storeAPI), {
    name: "person-store",
    // storage: firebaseStorage,
  })
  // )
);
