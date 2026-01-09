import { axiosInstance } from "../lib/axios"
import { create } from "zustand";
import toast from "react-hot-toast";
// import { updateProfile } from "../../../backend/controllers/user.controller";

export const useAuthStore = create((set) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isCheckingAuth: true,
    isUpdatingProfile: false,
    onlineUsers:[],


    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/users/check");

            if (res.data) {
                set({ authUser: res.data });
            } else {
                set({ authUser: null });
            }
        } catch (error) {
            console.log("error in checkAuth:", error);
            // set({ authUser: null });
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

        } catch (error) {
            console.log("error in signup", error);
            toast.success(error.response.data.message)

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

        } catch (error) {
            console.log("error in login", error);
            toast.success(error.response.data.message)

        } finally {
            set({ isLoggingIn: false });
        }
    },
    logout: async () => {

        try {
            const res = await axiosInstance.post("/users/logout");
            set({ authUser: null });
            toast.success(res.data.message);

        } catch (error) {
            console.log("error in logout", error);
            toast.success(error.response.data.message)

        }
    },
    updateProfile: async (data) => {
        set({ isUpdatingProfile: true })
        try {
            const res = await axiosInstance.put("/users/update-profile", data);
            const updatedUser=res.data;
            set({ authUser: updatedUser });
            toast.success(res.data.message);



        } catch (error) {
            console.log("error in UpdateProfile", error);
            toast.success(error.response.data.message)

        }
        finally {
            set({ isUpdatingProfile: false })
        }

    },




}));

