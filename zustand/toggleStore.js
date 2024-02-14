import { create } from "zustand";

let toggleStore = create((set) => ({
  toggleLogin: false,
  toggleSignIn: false,
  toggleSignIn_f: (st) => set(() => ({ toggleSignIn: st })),
  toggleLogin_f: (st) => set(() => ({ toggleLogin: st })),
}));

export default toggleStore;
