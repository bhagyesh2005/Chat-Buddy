const expressAsyncHandler = require("express-async-handler");
const Message = require('../Models/massegeModel');
const User = require("../Models/userModel");
const Chat = require("../Models/chatModel");

const sendMessage = expressAsyncHandler(async (req, res) => {

    // First thing: Chatid on which chat we are supposed to send the msg
    const { content, chatId } = req.body;
    if (!content || !chatId) {
        console.log("Invalid data passed into request.");
        return res.send(400);
    }
    console.log("This is The Problem: " + req.user);
    var newMessage = {
        sender: req.user._id,
        content: content,
        chat: chatId,
    };

    try {
        let message = await Message.create(newMessage);
        message = await message.populate("sender", "name pic");
        message = await message.populate("chat");
        message = await User.populate(message, {
            path: 'chat.users',
            select: "name pic email",
        });

        await Chat.findByIdAndUpdate(req.body.chatId, {
            latestMessage: message,
        });

        res.status(200).json(message);
    } catch (error) {
        throw new Error(error.message);
    }

    // Second thing: msg itself

    // Sender of the msg

});

const fetchMessage = expressAsyncHandler(async (req, res) => {
    try {
        const message = await Message.find({ chat: req.params.chatId }).populate(
            "sender",
            "name pic email",
        ).populate("chat");
        res.json(message);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
});
module.exports = { sendMessage, fetchMessage };

