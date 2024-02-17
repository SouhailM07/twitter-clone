import { create } from "zustand";

const postsStore = create((set) => ({
    posts: [],
    editPosts: (st) => set(() => ({ posts: st }))
}))

export default postsStore;