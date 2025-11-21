import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    return res.status(200).json({
        message: "this is home route"
    })
});

app.post('/send-mail', async (req, res) => {
    try {
        const {reciverEmail, message} = req.body;

        if(!reciverEmail) {
            return res.status(404).json({
                msg: "Reciver email is required"
            })
        }
        const transporter = nodemailer.createTransport({
            port: 587,
            secure: false,
            host: 'smtp-relay.brevo.com',
            auth: {
                user: process.env.BREVO_USERNAME,
                pass: process.env.BREVO_PASSWORD
            }
        })

        const mailOptions = {
            from: "sharmachirag242004@gmail.com",
            to: reciverEmail,
            subject: "Welcome to Our Service",
            text: `Hi ${reciverEmail},\n\n${message}\n\nRegards`
        };

        await transporter.sendMail(mailOptions);

        res.json({
            msg: `Email sent successfully to ${reciverEmail}`
        });

    } catch(err) {
        console.log(`error in send mail ${err}`);
        return res.status(500).json({
            msg: "Internal server error"
        })
    }
});


app.listen(port, () => {
    console.log(`server is listening on port ${port}`);
})