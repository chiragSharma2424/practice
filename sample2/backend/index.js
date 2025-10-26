import express from 'express';
import cors from 'cors';
import userRouter from './routes/user-routes.js'
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());


// routes
app.use('/api/users', userRouter)

app.get('/', (req, res) => {
    res.status(200).json({
        msg: "server is up and runnning"
    })
});

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});