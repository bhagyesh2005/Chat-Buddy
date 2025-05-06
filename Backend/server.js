const express = require('express');
const dotenv = require('dotenv');
const app = express();
const color = require('colors');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./Routes/userRoutes');
const chatRoutes = require('./Routes/chatRoutes');
const messageRoutes = require('./Routes/messageRoutes');
const appRoute = require('./Routes/route');
dotenv.config();
connectDB();
app.use(express.json());   // To accept json data

app.use(cors());
app.use('/api/user', userRoutes);    // For managing user 
app.use('/api/chat', chatRoutes);    // For managing chat 
app.use('/api', appRoute);      // For Sending varification mail to the user
app.use('/api/message', messageRoutes);  // For Sending the msg

const port = process.env.PORT || 5500;


// For statring the server
app.listen(port, console.log(`Server Started on PORT ${port}`.white.bold));

