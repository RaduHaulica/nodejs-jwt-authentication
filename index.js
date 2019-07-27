const express = require('express');
const app = express();
const mongoose = require('mongoose');

const dotenv = require('dotenv');
dotenv.config();

// importing routes
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');

// connect to db
mongoose.connect(
    process.env.DB_CONNECT,
    { useNewUrlParser: true },
    () => {console.log('Connected to DB');}
);

// Middleware
app.use(express.json());

// Route Middleware
app.use('/api/user', authRoute);
app.use('/api/posts', postRoute);

app.listen(
    3000,
    () => { console.log("Server up and running.")}
);


// https://youtu.be/2jqok-WgelI?t=448