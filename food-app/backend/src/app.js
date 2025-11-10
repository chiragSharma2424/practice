// create server
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth.routes');
const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

// routes
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.send("hello world");
})

module.exports = app;