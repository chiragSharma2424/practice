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
            host: process.env.MAILTRAP_HOST,
            port: process.env.MAILTRAP_PORT,
            secure: false,
            auth: {
                user: process.env.MAILTRAP_USERNAME,
                pass: process.env.MAILTRAP_PASSWORD
            },
        })

        // verification url
        const verificationUrl = `http://localhost:3000/api/v1/users/verify/${token}`;

        // email content
        const mailOptions = {
            from: `"Authentication app" < ${process.env.SENDERMAIL}`,
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