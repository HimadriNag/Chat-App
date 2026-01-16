import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db.js";
import userRoutes from "./routes/user.routes.js";
import messageRoutes from "./routes/message.routes.js";
import { app, server } from "./lib/socket.js";

import dotenv from "dotenv";

dotenv.config();



const PORT=process.env.PORT || 5000

connectDB();



app.use(express.json({limit:"10mb"}));
app.use(cors({
  origin: function(origin, callback) {
    
    
    if(!origin || 
       origin.includes("localhost") || 
       origin.includes("127.0.0.1") ||
       origin.includes("192.168") ||
       origin.includes("10.") ||
       origin.includes("172.")) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));
app.use(cookieParser());



app.get("/",(req,res)=>{
    res.send("Hello from server")
})
app.use("/api/users",userRoutes)
app.use("/api/messages",messageRoutes);
server.listen(PORT, "0.0.0.0", () => {
    console.log(`server is running on PORT ${PORT}`)
})