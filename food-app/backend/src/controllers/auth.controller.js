const userModel = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function registerUser(req, res) {
    const { fullName, email, password } = req.body;

    if(!fullName || !email || !password) {
        res.json({
            msg: "Enter all fields"
        })
    }

    const isUserAlreadyExists = await userModel.findOne({ email });
    if(isUserAlreadyExists) {
        return res.status(400).json({
            msg: "User already exists"
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        fullName: fullName,
        email: email,
        password: hashedPassword
    });

    // creating token for user
    const token = jwt.sign({
        id: user._id
    }, "secret-key");


    // saving token in cookie
    res.cookie('token', token);

    res.status(201).json({
        msg: "User registered successfully",
        user: {
            id: user._id,
            email: user.email,
            fullName: user.fullName
        }
    })
}


async function loginUser(req, res) {
    try {
        const {email, password} = req.body;

        if(!email || !password) {
            res.status(400).json({
                msg: "All fields are required"
            })
        }

        const isUserAlreadyExists = await userModel.findOne({ email });
        if(!isUserAlreadyExists) {
            res.status(400).json({
                msg: "user not found in database register first"
            })
        } else {
            const token = jwt.sign({id: isUserAlreadyExists._id}, "secret-key");
            res.cookie("token", token);
            res.status(200).json({
                msg: "User login successfully",
                user: {
                    name: isUserAlreadyExists.fullName,
                    email: isUserAlreadyExists.email
                }
            })
        }
    } catch(err) {
        console.log(`error in login controller ${err}`);
        return res.status(500).json({
            msg: "Internal server error"
        })
    }
}

module.exports= {
    registerUser,
    loginUser
}