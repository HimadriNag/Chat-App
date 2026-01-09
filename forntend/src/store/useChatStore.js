import toast from "react-hot-toast";
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";
export const useChatStore = create((set, get) => {
  return {
    users: [],
    messages: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,

    getUsers: async () => {
      set({ isUsersLoading: true });
      try {
        const res = await axiosInstance.get("/messages/users");
        set({ users: res.data });
      } catch (error) {
        toast.error(error.response.data.message);
      } finally {
        set({ isUsersLoading: false });
      }
    },
    getMessages: async (userId) => {
      set({ isMessagesLoading: true });
      try {
        const res = await axiosInstance.get(`/messages/${userId}`);
        console.log("res", res);

        set({ messages: res.data });
      } catch (error) {
        toast.error(error.response.data.message);
      } finally {
        set({ isMessagesLoading: false });
      }
    },

    sendMessage: async (messageData) => {
      const { selectedUser, messages } = get();
      try {
        const res = await axiosInstance.post(
          `/messages/send/${selectedUser._id}`,
          messageData
        );
        set({ messages: [...messages, res.data] });
      } catch (error) {
        toast.error(error.response.data.message);
      }
    },

    subscribeToMessages: () => {
      const { selectedUser } = get();
      if (!selectedUser) return;
      const socket = useAuthStore.getState().socket;
      socket.on("message", (message) => {
        const isMessageSentFromSelectedUser =
          message.senderId === selectedUser._id;
        if (!isMessageSentFromSelectedUser) return;
        set({ messages: [...get().messages, message] });
      });
    },

    unsubscribeFromMessages: () => {
      const socket = useAuthStore.getState().socket;
      socket.off("message");
    },

    setSelectedUser: (selectedUser) => {
      set({ selectedUser });
    },
  };
});