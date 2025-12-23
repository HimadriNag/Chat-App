import axios from "axios";
import {create} from "zustand";


export const useAuthStore=create((set)=>({
    authUser:null,
    isSigningUp:false,
    isLoggingIn:false,
    isCheckingAuth:true,

    checkAuth:async()=>{
    try {
        const {data} =await axios.get("/users/check");
        set({authUser:data});
        
    } catch (error) {
        console.log("error in checkAuth",error);
        set({authUser:null});
        
    }finally{
        set({isCheckingAuth:false});
    }
}

    
    
}));

