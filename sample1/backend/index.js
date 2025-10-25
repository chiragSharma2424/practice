const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const app = express();
const port = 5000;
app.use(express.json());
app.use(cors());

const userSchema= new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}
});

const userModel = mongoose.model('user', userSchema);

const dbConnection = () => {
    mongoose.connect('mongodb://localhost:27017/register').then(() => {
        console.log("database connected");
    }).catch((err) => {
        console.log(`error in db connection ${err}`)
    })
};


app.get('/', (req, res) => {
    return res.json({
        msg: "hi there"
    })
});

app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    if(!name || !email || !password) {
        res.json({
            msg: "All fields are required"
        })
    };

    const userAlreadyExists = await userModel.findOne({ email });
    if(userAlreadyExists) {
        res.json({
            msg: "user already exists"
        })
    };

    const newUser = await userModel.create({
        name: name,
        email: email,
        password: password
    });

    const token = jwt.sign({id: newUser._id}, "secret-key", { expiresIn: '1h' });

    res.json({
        msg: "user register successfully",
        token: token
    })
});

dbConnection();

app.listen(port, () => {
    console.log(`server started on port ${port}`);
})