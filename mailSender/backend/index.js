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
        const transporter = nodemailer.createTransport({
    
            port: 587,
            secure: false,
            host: 'smtp-relay.brevo.com',

            auth: {
                user: 'sharmachirag242004@gmail.com',
                pass: ''
            }
        })

        const mailOptions = {
            from: "yourgmail@gmail.com",
            to: email,
            subject: "Welcome to Our Service",
            text: `Hi ${reciverEmail},\n\n${message}\n\nRegards`
        };

        await transporter.sendMail(mailOptions);

        res.json({
            message: "Email sent successfully"
        });

    } catch(err) {
        console.log(`error in send mail ${err}`);
        return res.status(500).json({
            message: "Internal server error"
        })
    }
});


app.listen(port, () => {
    console.log(`server is listening on port ${port}`);
})