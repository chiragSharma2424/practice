import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import userRouter from './routes/user-routes.js'
import connectDB from './db/db.js';
const app = express();
const port = 5000;

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());


// routes
app.use('/api/users', userRouter)

app.get('/', (req, res) => {
    console.log(`url is: ${req.url} headers is: ${req.headers}`)
    res.status(200).json({
        msg: "server is up and runnning"
    })
});

connectDB();

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});