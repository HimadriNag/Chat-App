import Message from "../models/message.model.js";
import User from "../models/user.model.js";
import cloudinary from "../lib/cloudinary.js";

//----for showing all people i messaged earlier---------

export const getUser = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const fillteredUsers = await User.find({ _id: { $ne: loggedInUserId }, }).select("-password");
        res.status(200).json({ fillteredUsers, successL: true })

    } catch (error) {
        console.log("Error in getUsers", error.message);
        res.status(500).json({ error: "Internal Server Error" });

    }
}

//-------------------for showing the actual meassage---------------

//-----------------------------------For Getting Message---------------------

export const getMessages = async (req, res) => {
    try {
        const senderId = req.user._id;
        const { receiverId } = req.params;
        const meassage = await Message.find({
            $or: [
                {
                    senderId: senderId, receiverId: receiverId

                },
                { senderId: receiverId, receiverId: senderId },
            ],
        });
        res.status(200).json({ message, success: true });

    } catch (error) {
        console.log("Error in get message", error.message);
        res.status(500).json({ error: "Internal Server Error" });


    }
}
//-----------------------------------For Sending Message---------------------

export const sendMessage = async (req, res) => {
    try {
        const senderId = req.user._id;
        const { receiverId } = req.params;
        const {text,image}=req.body;
        let imageUrl;
        if(image){
            const reasult=await cloudinary.uploader.upload(image);
            let imageUrl=result.secure_url;
        }
        const message=new Message({
            senderId,receiverId,text,
            image:imageUrl,
        })
        await message.save();
        res.status(201).json({success:true,message})




    } catch (error) {
        console.log("Error in sendMessage", error.message);
        res.status(500).json({ error: "Internal Server Error" });

    }
}