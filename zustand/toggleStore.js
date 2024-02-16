import { create } from "zustand";

let toggleStore = create(
  (set) => ({
    toggleLogin: false,
    toggleSignIn: false,
    userLoggedIn: false,
    toggleSignIn_f: (st) => set(() => ({ toggleSignIn: st })),
    toggleLogin_f: (st) => set(() => ({ toggleLogin: st })),
    toggleUserLoggedIn: (st) => set(() => ({ userLoggedIn: st }))
  })
)

export default toggleStore;
