import userModel from "../models/user.model.js";
import crypto from 'crypto';

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

        // send mail, mail pe verification token jayega
        
    } catch(err) {

    }
}

export { register };