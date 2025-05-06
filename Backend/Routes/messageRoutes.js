const express = require('express');
const router = express.Router();
const { sendMessage, fetchMessage } = require('../controller/messageContoller');
const { protect } = require('../Middleware/authMiddleware');

// For the sending the msg
router.route('/').post(protect, sendMessage);
// To fetch msg from chat
router.route('/:chatId').get(protect, fetchMessage);

module.exports = router;