import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

// create transport
// mail options
// send mail

// 1. transport
const sentVerificationEmail = async (email, token) => {
    try {
        // create email transporter
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            secure: process.env.EMAIL_SECURE === 'true',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        })

        // verification url
        const verificationUrl = `http://localhost:3000/api/v1/users/verify/${token}`;

        // email content
        const mailOptions = {
            from: `"Authentication app" < ${process.env.SENDER_EMAIL}`,
            to: email,
            subject: "Please verify your email address",
            text: `
             thank you for registering! Please verify your email address
             to complete your registration.
             ${verificationUrl}
             this verification link will expire in 10 mins.
             if you did not create an account, Please ignore this
            `,
        };

        // send mail
        const info = await transporter.sendMail(mailOptions);
        console.log("Verification email sent: ", info.messageId);
        return true;
    } catch(err) {
        console.log(`error in send mail ${err}`);
    }
}

export default sentVerificationEmail;