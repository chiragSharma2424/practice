import mongoose from "mongoose";

function connectDB() {
    mongoose.connect('mongodb://localhost:27017/register2').then(() => {
        console.log("database connected");
    }).catch((err) => {
        console.log(`error in database connection ${err}`);
    })
}

export default connectDB;