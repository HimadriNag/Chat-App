import express from "express";
import { isAuth, login, logout, signup, updateProfile } from "../controllers/user.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.put("/update-profile", isAuthenticated, updateProfile);
router.get("/check", isAuthenticated, isAuth);





export default router;