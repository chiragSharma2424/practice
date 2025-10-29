import express from 'express'
import dotnev from 'dotenv'
dotnev.config();
import cors from 'cors';
import connectDatabase from './utils/db.js';
const app = express();
const port = process.env.PORT

app.use(cors({
    origin: "http://localhost:5173",
    methods: ['GET', 'POST', 'DELETE', 'PUT', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    return res.status(200).json({
        msg: "Hello chirag"
    });
});

// taking name in body only for testing 
app.post('/', (req, res) => {
    const name = req.body.name;

    if(!name) {
        return res.status(404).json({
            msg: "Enter name please"
        });
    }
    return res.status(201).json({
        msg: `name is ${name}`
    });
})

// console.log(process.env.PORT);

connectDatabase();

app.listen(port, () => {
    console.log(`app is listening on port ${port}`);
});