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
        // Safety check for error response
        toast.error(error.response?.data?.message || "Failed to load users");
      } finally {
        set({ isUsersLoading: false });
      }
    },

    getMessages: async (userId) => {
      set({ isMessagesLoading: true });
      try {
        const res = await axiosInstance.get(`/messages/${userId}`);
        set({ messages: res.data });
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to load messages");
      } finally {
        set({ isMessagesLoading: false });
      }
    },

    sendMessage: async (messageData) => {
      const { selectedUser, messages } = get();
      // Guard clause to prevent sending if no user is selected
      if (!selectedUser?._id) return;

      try {
        const res = await axiosInstance.post(
          `/messages/send/${selectedUser._id}`,
          messageData
        );
        set({ messages: [...messages, res.data] });
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to send message");
      }
    },

    subscribeToMessages: () => {
      const { selectedUser } = get();
      if (!selectedUser) return;

      const socket = useAuthStore.getState().socket;
      if (!socket) return; // Ensure socket exists

      // Use .off first to prevent duplicate listeners
      socket.off("newMessage"); 

      socket.on("newMessage", (newMessage) => {
        const isMessageSentFromSelectedUser =
          newMessage.senderId === selectedUser._id;
        if (!isMessageSentFromSelectedUser) return;

        set({
          messages: [...get().messages, newMessage],
        });
      });
    },

    unsubscribeFromMessages: () => {
      const socket = useAuthStore.getState().socket;
      if (socket) socket.off("newMessage");
    },

    setSelectedUser: (selectedUser) => {
      set({ selectedUser });
    },
  };
});