
import mongoose from "mongoose";

export const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log("connected to db")
    }catch(error){
        console.log("error in db connection",error)
    }
}