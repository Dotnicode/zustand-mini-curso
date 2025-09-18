import { createJSONStorage, StateStorage } from "zustand/middleware";

const firebaseUrl =
  "https://zustand-storage-7f185-default-rtdb.firebaseio.com/zustand";

const firebaseAPI: StateStorage = {
  getItem: async function (name: string): Promise<string | null> {
    try {
      const data = await fetch(`${firebaseUrl}/${name}.json`).then((res) =>
        res.json()
      );
      return JSON.stringify(data);
    } catch (error) {
      return null;
    }
  },
  setItem: async function (name: string, value: string): Promise<void> {
    await fetch(`${firebaseUrl}/${name}.json`, {
      method: "PUT",
      body: value,
    }).then((res) => res.json());
  },
  removeItem: function (name: string): unknown {
    return null;
  },
};

export const firebaseStorage = createJSONStorage(() => firebaseAPI);
