import toast from "react-hot-toast";
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { io } from "socket.io-client";
const BASE_URL = "http://localhost:5000";
export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isCheckingAuth: true,
  isUpdatingProfile: false,
  onlineUsers: [],
  socket: null,
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/users/check");
      set({ authUser: res.data });
      get().connectSocket();
    } catch (error) {
      console.log("error in checkAuth", error);
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/users/signup", data);

      set({ authUser: res.data });
      toast.success(res.data.message);
      get().connectSocket();
    } catch (error) {
      console.log("error in signup", error);
      toast.success(error.response.data.message);
    } finally {
      set({ isSigningUp: false });
    }
  },
  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/users/login", data);

      set({ authUser: res.data });
      toast.success(res.data.message);
      get().connectSocket();
    } catch (error) {
      console.log("error in login", error);
      toast.success(error.response.data.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      const res = await axiosInstance.post("/users/logout");

      set({ authUser: null });
      toast.success(res.data.message);
      get().disconnectSocket();
    } catch (error) {
      console.log("error in logout", error);
      toast.success(error.response.data.message);
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/users/update-profile", data);
      const updatedUser = res.data;
      set({ authUser: updatedUser });
      toast.success(res.data.message);
    } catch (error) {
      console.log("error in updateProfile", error);
      toast.success(error.response.data.message);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;

    const socket = io(BASE_URL, {
      query: {
        userId: authUser._id,
      },
    });

    socket.connect();
    set({ socket: socket });

    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },

  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },
}));

