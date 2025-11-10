// create server
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send("hello world");
})

module.exports = app;