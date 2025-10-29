import express from 'express';
import dotnev from 'dotenv';
dotnev.config();
import cors from 'cors';
const app = express();
const port = process.env.PORT;

app.use(cors());

app.get('/', (req, res) => {
    return res.status(200).json({
        msg: "Hello chirag"
    });
});

// console.log(process.env.PORT);

app.listen(port, () => {
    console.log(`app is listening on port ${port}`);
});