import { create } from "zustand";

let toggleStore = create(
  (set) => ({
    toggleLogin: false,
    toggleSignIn: false,
    userLoggedIn: false,
    toggleEditPanel:false,
    toggleSignIn_f: (st) => set(() => ({ toggleSignIn: st })),
    toggleLogin_f: (st) => set(() => ({ toggleLogin: st })),
    toggleUserLoggedIn: (st) => set(() => ({ userLoggedIn: st })),
    toggleEditPanel_f:(st)=>set(()=>({toggleEditPanel:st}))

  })
)

export default toggleStore;
