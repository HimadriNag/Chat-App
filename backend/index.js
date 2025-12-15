import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db.js";

import dotenv from "dotenv";

dotenv.config();

const app=express();

const PORT=process.env.PORT || 5000
//db connection
connectDB();

//--Middlewares

app.use(express.json({limit:"10mb"}));
app.use(cors());
app.use(cookieParser());

//API ENDPOINTS

app.get("/",(req,res)=>{
    res.send("Hello from server")
})
app.listen(PORT,()=>{
    console.log(`server is running on PORT ${PORT}`)
})