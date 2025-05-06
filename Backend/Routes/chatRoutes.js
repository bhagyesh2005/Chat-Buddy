const express = require("express");
const router = express.Router();
const { protect } = require('../Middleware/authMiddleware');
const { accessChat, fetchChats, createGroupChat, renameGroup, removeFromGroup, addToGroup, searchTheGroup } = require('../controller/chatController');

router.route("/access-chat").post(accessChat);  // For accessing the chat
router.route("/fetch-chats").get(fetchChats);   // For fetching user chat
router.route("/group").post(protect,createGroupChat); // For creating the group
router.route("/rename").put(protect,renameGroup); // For renaming the group
router.route("/groupremove").put(removeFromGroup);  // For removing user from the group
router.route("/groupadd").put(addToGroup);  // For adding memeber in the group
router.route("/searchGroup").get(protect,searchTheGroup);   // For searching the group

module.exports = router;

