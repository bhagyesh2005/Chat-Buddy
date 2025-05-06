const mongoose = require('mongoose');

const connectDB = async () => {
    try {
const conn = await mongoose.connect("mongodb://localhost:27017/ChatApp",
            {
                serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds
                socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
            }
        );
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log("Some error has occured called " + error);
        process.exit();
    }
}

module.exports = connectDB;