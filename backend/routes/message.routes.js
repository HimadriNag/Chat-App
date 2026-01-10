import express from "express";

import { isAuthenticated } from "../middlewares/auth.middleware.js";
import {  getMessages, getUser, sendMessage } from "../controllers/message.controller.js";

const router=express.Router();
router.get("/users",isAuthenticated,getUser);
router.get("/:id",isAuthenticated,getMessages);
router.post("/send/:receiverId",isAuthenticated,getMessages,sendMessage);


export default router;