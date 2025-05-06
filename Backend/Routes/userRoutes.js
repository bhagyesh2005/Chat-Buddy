const express = require('express');
const {getLandingPage, registerUser, authUser, allUser, SetToken, dashboard } = require('../controller/userController');
const router = express.Router();
const bodyParser = require('body-parser');
const path = require('path');
const { protect } = require('../Middleware/authMiddleware');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(express.static('public'));
router.route("/resister").post(registerUser);
router.route("/login").post(authUser);
router.route("/ser").get(protect, allUser);
// router.route("/Settoken").get(protect,SetToken);
router.route("/Dashboard").get(dashboard);
router.route("/").get(getLandingPage);

module.exports = router;





