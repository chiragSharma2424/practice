import mongoose from "mongoose";
import dotnev from 'dotenv';
dotnev.config();

const connectDatabase = () => {
    mongoose.connect(process.env.MONGO_URL).then(() => {
        console.log("DB connected successfully")
    }).catch((err) => {
        console.log(`error in DB connection ${err}`);
    });
}

export default connectDatabase;