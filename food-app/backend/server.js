// start server
const app = require('./src/app');
const connectDB = require('./src/db/db');

// db connection function call
connectDB()

app.listen(3000, () => {
    console.log(`server running on port 3000`)
});