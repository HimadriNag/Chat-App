import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.js";

////-------------Sign-Up--------------------------------

export const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required", success: false })
        }
        if (password.length < 5) {
            return res.status(400).json({ message: "Password must be at least 5 characters long", success: false })
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User Already exists", success: false })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = new User({
            name,
            email,
            password: hashedPassword
        })
        if (user) {
            generateToken(user._id, res);
            await user.save();
            res.status(201).json({
                _id: user._id,
                name: user.name,
                eamil: user.eamil,
                profilePic: user.profilePic,
                message: "User craeted successfully",
                success: true,
            })

        }
        else {
            res.status(500).json({ message: "Invalid user data" });
        }


    } catch (error) {

        console.log("error in signup", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

//----------------------Log-in--------------------------------------

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User Not found", success: false });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credential", success: false });
        }
        generateToken(user._id, res);
        res.status(201).json({
            _id: user._id,
            name: user.name,
            eamil: user.eamil,
            profilePic: user.profilePic,
            message: "User login successfully",
            success: true,
        });


    } catch (error) {
        console.log("error in login", error);
        res.status(500).json({ message: "Internal Server Error" });

    }
}

//------------------------log-out-----------------------------------------

export const logout = async (req, res) => {
    try {
        res.cookie("token", "", { maxage: 0 });
        res.status(200).json({ message: "User logout successfully", success: true });

    } catch (error) {
        console.log("error in logout", error);
        res.status(500).json({ message: "Internal Server Error" });

    }
}
//---------------------------Update-Profile----------------------------------

export const updateProfile = async (req, res) => {
    try {
        const { profilePic } = req.body;
        const userId = req.user._id;

        if (!profilePic) {
            return res.status(400).json({ message: "Profile picture is required", success: false });
        }
        const reasult = await cloudinary.uploader.upload(profilePic);
        const updateUser = await User.findByIdAndUpdate(userId, { profilePic: reasult.secure_url }, { new: true });
        res.status(200).json({
            updateUser,
            message: "Profile picture updated successfully",
            success: true,
        });

    } catch (error) {
        console.log("error in update profile", error);
        res.status(500).json({ message: "Internal Server Error" });

    }

};

//----------------------Checking User is loged in or not-----

export const isAuth = async (req, res) => {
    try {
        res.status(200).json(req.user);

    } catch (error) {
        console.log("error in update profile", error);
        res.status(500).json({ message: "Internal Server Error" });

    }
}