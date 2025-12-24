import {axiosInstance} from "../lib/axios"
import { create } from "zustand";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isCheckingAuth: true,

  
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
            set({ authUser: null }); 
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
    }



}));

