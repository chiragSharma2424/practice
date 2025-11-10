import userModel from "../models/user.model.js";
import sentVerificationEmail from "../utils/sendMail.js";
import crypto from 'crypto';
import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';

const register = async (req, res) => {
    // 1. get user data from body, req.body
    const { name, email, password } = req.body;

    // 2. validate data
    if(!name || !email || !password) {
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        })
    }

    // 3. password check
    if(password.length < 6) {
        return res.status(400).json({
            success: false,
            message: "Password is not valid"
        })
    }

    // 4. check user already exists or not
    try {
        const existingUser = await userModel.findOne({ email });
        if(existingUser) {
            return res.status(400).json({
                success: false,
                message: "user is already exists"
            })
        }

        // user verification token
        const token = crypto.randomBytes(32).toString("hex");
        const tokenExpiry = new Date.now() + 10 * 60 * 60 * 1000;

        // creating a new user
        const newUser = await userModel.create({
            name: name,
            email: email,
            password: password,
            verificationToken: token,
            verificationTokenExpiry: tokenExpiry
        });

        // checking user is created or not
        if(!newUser) {
            return res.status(400).json({
                success: false,
                message: "User not created"
            })
        }

        // send mail
        await sentVerificationEmail(email, token);

        // response to user
        return res.status(200).json({
            success: true,
            message: "User registered, now you have to verify your email",
            user: {
                name: newUser.name,
                email: newUser.email
            }
        });

    } catch(err) {
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}


// verify controller
// for verification we need a token
const verify = async (req, res) => {
    try {
        const token = req.params.token;

        // get user
        const user = await userModel.findOne({ 
            verificationToken: token,
            verificationTokenExpiry: {$gt: Date.now()}
         });

         // is user exist
         if(!user) {
            return res.status(200).json({
                success: false,
                message: "token invalid"
            })
         }

        user.isVerified = true; 
        user.verificationToken = undefined;
        user.verificationTokenExpiry = undefined;
        await user.save();

        return res.status(200).json({
            success: false,
            message: 'User account is verified'
        })
    } catch(err) {
        console.log(`error in verify ${err}`);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

const login = async (req, res) => {
    try {
        // 1. ge user data
        const { email, password } = req.body;

        // 2. validate
        if(!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        const user = await userModel.findOne({ email });
        if(!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        // 3. check if user verified
        if(!user.isVerified) {
             return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        // 4. check password
        const isPasswodMatch = await user.comparePassword(password);

        // 5. jwt token
        const jwtToken = jwt.sign({id: user._id}, process.env.JWT_SECRET, {
            expiresIn: '15m'
        });

        // set cookie
        const cookieOptions = {
            expires: new Date(Date.now() + 24 * 60*60*1000),
            httpOnly: true,

        }
        res.cookie("jwtToken", jwtToken, cookieOptions);

        return res.status(200).json({
            success: false,
            token: jwtToken,
            message: "Log successfully",
            user: {
                name: user.name,
                email: user.email
            }
        })
    } catch(err) {
        console.log(`error in login controller ${err}`);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

export { register, verify, login };