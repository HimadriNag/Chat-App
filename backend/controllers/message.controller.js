import Message from "../models/message.model.js";
import User from "../models/user.model.js";
import { getReceiverSocketId, io } from "../lib/socket.js";
import cloudinary from "../lib/cloudinary.js";

//----for showing all people i messaged earlier---------

export const getUser = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const fillteredUsers = await User.find({ _id: { $ne: loggedInUserId }, }).select("-password");
        res.status(200).json(fillteredUsers)

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
        const { id: receiverId } = req.params;
        const messages = await Message.find({
            $or: [
                {
                    senderId: senderId, receiverId: receiverId

                },
                { senderId: receiverId, receiverId: senderId },
            ],
        });
        res.status(200).json(messages);

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
        const { text, image } = req.body;
        
        console.log("=== sendMessage called ===");
        console.log("Sender ID:", senderId);
        console.log("Receiver ID:", receiverId);
        console.log("Text:", text);
        console.log("Has image:", !!image);
        
        // Validate input
        if (!text?.trim() && !image) {
            return res.status(400).json({ error: "Message must contain text or image" });
        }
        
        if (!receiverId) {
            return res.status(400).json({ error: "Receiver ID is required" });
        }
        
        let imageUrl = null;
        if (image) {
            try {
                const result = await cloudinary.uploader.upload(image);
                imageUrl = result.secure_url;
                console.log("Image uploaded successfully:", imageUrl);
            } catch (uploadError) {
                console.error("Cloudinary upload error:", uploadError);
                return res.status(400).json({ error: "Failed to upload image" });
            }
        }
        
        const message = new Message({
            senderId, 
            receiverId, 
            text: text?.trim() || "",
            image: imageUrl,
        });
        
        await message.save();
        console.log("Message saved successfully:", message._id);
        
        const receiverSocketId = getReceiverSocketId(receiverId);
        console.log("Receiver socket ID:", receiverSocketId);

        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", message);
            console.log("Socket event emitted to receiver");
        }

        res.status(201).json(message);

    } catch (error) {
        console.error("=== Error in sendMessage ===");
        console.error("Error message:", error.message);
        console.error("Full error:", error.stack);
        res.status(500).json({ error: "Internal Server Error" });
    }
}