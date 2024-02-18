import { create } from "zustand"
import { persist } from "zustand/middleware";

const repliesStore = create(persist((set) => ({
    selectedReply: "",
    replies: "",
    replyUserId: "",
    editSelectedReply: (st) => set(() => ({ selectedReply: st })),
    editReplyUserId: (st) => set(() => ({ replyUserId: st }))

}), {
    name: "selectedReply"
}))

export default repliesStore;