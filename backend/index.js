import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db.js";
import userRoutes from "./routes/user.routes.js";
import messageRoutes from "./routes/message.routes.js";
import { app, server } from "./lib/socket.js";

import dotenv from "dotenv";

dotenv.config();

// const app=express();

const PORT=process.env.PORT || 5000
//db connection
connectDB();

//--Middlewares

app.use(express.json({limit:"10mb"}));
app.use(cors({origin:"http://localhost:5173",credentials:true}));
app.use(cookieParser());

//API ENDPOINTS

app.get("/",(req,res)=>{
    res.send("Hello from server")
})
app.use("/api/users",userRoutes)
app.use("/api/messages",messageRoutes);
server.listen(PORT,()=>{
    console.log(`server is running on PORT ${PORT}`)
})