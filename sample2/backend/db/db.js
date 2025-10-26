import mongoose from "mongoose";

function connectDB() {
    mongoose.connect('').then(() => {
        console.log("database connected");
    }).catch((err) => {
        console.log(`error in database connection ${err}`);
    })
}

export default connectDB;