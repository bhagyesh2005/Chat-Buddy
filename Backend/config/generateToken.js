const jwt = require("jsonwebtoken");

const generateToken = (id) => {
return jwt.sign({ id }, "YourSecretJwtTokenIsHere", {
        expiresIn: "30d",
    });
};

module.exports = generateToken;