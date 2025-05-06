const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');
const User = require('../Models/userModel');
const generateToken = require('../config/generateToken');
const bcrypt = require('bcrypt');
const fs = require('fs');
const nodemailer = require('nodemailer');
let ChangeTheCourse = require('./changeValue.js');
const jwt = require('jsonwebtoken');

// ----------------------------------------------------------------------------------------------------------------------------------

let universalUser;
const { EMAIL, PASSWORD } = require('./env.js');
const { compareSync } = require('bcryptjs');
const getOTP = function () {
    let otp = `${Math.floor(1000 + Math.random() * 9000)}`;
    return otp;
}
let valOTP;

// Sending mail to the user for the email verification stuff 
const getVarified = async (req, res) => {
    const { emailID } = req.body;
    let otp = getOTP();

    let config = {
        service: 'gmail',
        auth: {
            user: EMAIL,
            pass: PASSWORD
        }
    }
    let transporter = nodemailer.createTransport(config);
    let message = {
        from: EMAIL,
        to: emailID,
        subject: "Verify your email",
        html: `<div style="max-width: 800px; margin: 0 auto; background-color: #fff; padding: 20px; text-align: center; box-shadow: 1px 1px 8px black;">
        <h1 style="color: #6674cc;">ChatBuddy</h1>
        <p>Enter ${otp} in the app to verify your email address and complete registration.</p>
    </div>
    `
    }

    try {
        valOTP = otp;
        await transporter.sendMail(message);

    } catch (error) {
        console.error(error);
        throw error;
    }
}
// -----------------------------------------------------------------------------------------------------------------------------------

// Checking for validation of the password.
const isPasswordValid = (password) => {

    if (password.length < 8) {
        return false;
    }
    const hasNumeric = /\d/.test(password);
    if (!hasNumeric) {
        return false;
    }

    const hasAscii = /^[\x20-\x7E]+$/.test(password);
    if (!hasAscii) {
        return false;
    }
    return true;
};

function isValidEmail(email) {
    return email === email.toLowerCase();
}

// Resistor stuff

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, pic, otp } = await req.body;

    // Checking for email validation.all word should be in lowercase.
    if (!isValidEmail(email)) {
        var file = fs.readFileSync('public/ErrorHandler/EmailPassValidation.html', 'utf-8');
        file = file.replace('"{{content}}"', "Entered email should be in lowercase.");
        res.send(file);
    }

    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Please Enter all Fields");
    }

    if (valOTP === otp) {
        if (isPasswordValid(password)) {
            const userExists = await User.findOne({ email });

            if (userExists) {
                res.status(400);
                throw new Error("User already exists");
            }
            const user = await User.create({
                name,
                email,
                password,
                pic,  
            });

            if (user) {
// const sendFile = fs.readFileSync('./public/ErrorHandler/verified.html', 'utf-8');
res.status(200).json({message:"Resistor successfull"});
            } else {
                res.status(400);
                throw new Error("Failed to Create the User")
            }
        } else {
// var file = fs.readFileSync('public/ErrorHandler/EmailPassValidation.html', 'utf-8');
// file = file.replace('"{{content}}"', "Entered password should be strong.");
            // res.send(file);
            throw new Error("Password is not strong");
        }
    } else {
        var file = fs.readFileSync('public/ErrorHandler/EmailPassValidation.html', 'utf-8');
        file = file.replace('"{{content}}"', "Enter the valid otp.");
        res.send(file);
        throw new Error("Otp is not valid.");
    }
});

// for rediracting the dashboard
const dashboard = asyncHandler(async (req, res) => {
    try {
        const token = req.query.token;
const decoded = await jwt.verify(token, "YourSecretJwtTokenIsHere");
        try {
var fileContent = fs.readFileSync('../CHATAPP/public/ChatPage.html', 'utf-8');
            res.status(200).send(fileContent);
        } catch (error) {
            res.status(404).send("File not found");
            return;
        }
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(401).send("Not authorized, token failed");
        return;
    }
});

// for getting web site landing page.

const getLandingPage = asyncHandler(async(req,res,next) => {
// let filePath = "../public/index.html";
try {
      const fileContent = fs.readFileSync('../public/index.html', 'utf-8');
                res.status(200).send(fileContent);
            } catch (error) {
                res.status(404).send("File not found");
                return;
            }
});

// For loging section
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    let userToken = generateToken(user._id);
console.log("User Token",userToken);

    if (user) {
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (isPasswordMatch) {
        
const filePath = '../CHATAPP/public/ChatPage.html';

            try {
const fileContent = fs.readFileSync(filePath, 'utf-8');
               
                // -----------------------------------------------------------------------------------------------------------------
                await User.findOneAndUpdate(
                    { _id: user._id },
                    { $set: { token: userToken } },
                    { new: true }
                )
                    .then(updatedUser => {
                        if (updatedUser) {
                            console.log('User token updated successfully:', updatedUser);
                        } else {
                            console.log('User not found');
                        }
                    })
                    .catch(err => {
                        console.error('Error updating user token:', err);
                    });

                universalUser = user._id;  // For getting the information about current user.(defining current user as universal user)
                ChangeTheCourse.EMAIL = email;

                // --------------------------------------------------------------------------------------------------------------
                res.status(200).send({ user, fileContent });
            } catch (err) {
                console.error('Error reading file:', err);
                res.status(500).send('Internal Server Error');
            }
        } else {
            var file = fs.readFileSync('public/ErrorHandler/EmailPassValidation.html', 'utf-8');
            file = file.replace('"{{content}}"', "Enter valid credentials for login.");
            res.send(file);
            throw new Error("Password is not valid");
        }

    } else {
        const file = fs.readFileSync('public/ErrorHandler/UsernotFound.html', 'utf-8');
        res.status(400).send(file);
        throw new Error("User not found");
    }
});

// For searching purpose
const allUser = asyncHandler(async (req, res) => {
    const keyword = req.query.search ? {
        $or: [
            { name: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } },
        ]
    }
        : {};
    /// Authorization mathi user id upadi chat ane search ne jodava

    const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
    //This means that the current user is not being searched.

    res.send(users);

});

// Setting the varification token api For localstorage
const SetToken = asyncHandler(async (req, res) => {
    const FindToken = await User.find({ _id: req.user._id });
    res.status(200).send(FindToken);
});

module.exports = { getLandingPage,registerUser, authUser, allUser, getVarified, universalUser, SetToken, dashboard };
