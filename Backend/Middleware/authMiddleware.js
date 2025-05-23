const jwt = require("jsonwebtoken");
const User = require("../Models/userModel");
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async (req, res, next) => {
    let token;
    console.log(req.headers.authorization)
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            token = req.headers.authorization.split(" ")[1];
            //decodes token id   
const decoded = jwt.verify(token, "YourSecretJwtTokenIsHere");
            req.user = await User.findById(decoded.id).select("-password");
            console.log(req.user);
            next();
        } catch (error) {
            res.status(401);
            throw new Error("Not authorized, token failed");
        }
    }
    if (!token) {
        res.status(401);
        throw new Error("Not authorized, no token");
    }
});

module.exports = { protect };



