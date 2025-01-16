const mongoose = require("mongoose")
require("dotenv").config()


// const connectDB = () => {
//     try {
//         mongoose.connect(process.env.MONGODB_CONNECTION)
//         console.log("connected to db")
//     }
//     catch (err) {
//         console.log(err)
//     }
// }


const connectDB =  (dbURI) => {
    try {
        if (mongoose.connection.readyState === 1) {
            console.log('Database is already connected');
            return;
        }
         mongoose.connect(dbURI);
        console.log(`connected to db`);
    } catch (err) {
        console.error('error has occurred', err);
    }
};

module.exports = connectDB;