import { create } from 'zustand'
import { persist } from 'zustand/middleware';

const userInfoStore = create(persist((set) => ({
    userInformation: "he",
    userInformation_f: (st) => set(() => ({ userInformation: st }))
}), { name: "userInfo" }))

export default userInfoStore;