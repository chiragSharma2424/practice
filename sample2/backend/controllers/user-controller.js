import userModel from "../models/user-model.js";
import jwt from 'jsonwebtoken';

const signup = async (req, res) => {
    const { name, email, password } = req.body;

    if(!name || !email || !password) {
        res.json({
            msg: "All fields are required"
        })
    };

    const existingUser = await userModel.findOne({ email });
    if(existingUser) {
        res.json({
            msg: "User already exists"
        })
    };

    const newUser = await userModel.create({
        name: name,
        email: email,
        password: password
    });

    const token = jwt.sign({id: newUser._id}, 'secret-key', { expiresIn: '1h' });

    res.cookie('token', token, {
      httpOnly: true, 
      secure: false, 
      sameSite: 'lax',
      maxAge: 3600000 
    })

    res.json({
        msg: "User signup successfully",
        token: token,
        user: {
            name: newUser.name,
            email: newUser.email
        }
    });
};


const signin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if(!email || !password) {
            res.json({
                msg: "Enter your credentials"
            });
        }

        const existingUser = await userModel.findOne({ email });
        
        if(!existingUser) {
            res.json({
                msg: "Signup first"
            })
        }

        const token = jwt.sign({id: existingUser._id}, "secret-key", { expiresIn: '1h' });

        res.cookie('token', token, {
             httpOnly: true, 
             secure: false, 
             sameSite: 'lax',
             maxAge: 3600000 
          });

        res.json({
            msg: "Signin successfully",
            token: token,
            user: {
                name: existingUser.name,
                email: existingUser.email,
            }
        });

    } catch(err) {
        console.log(`error in signin controller ${err}`);
        res.json({
            msg: "Internal server error"
        })
    }
}


export {
    signup,
    signin
}