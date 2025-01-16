const express = require("express")
const cors = require("cors")
const admin = require("firebase-admin")
const userRoute = require("./route/userRoute")
const cartRoute = require("./route/cartRoute")
const productRoute = require("./route/productRoute")
const orderRoute = require("./route/orderRoute")
const connectDB = require("./config/dbConfig")
const cookieParser = require("cookie-parser")
const serviceAccount = require("./serviceAccountKey.json")

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})

const app = express()


const corsOptions = {
    origin: 'http://localhost:5173', // Set the specific origin of your frontend application
    methods: 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true // Allow credentials (cookies, authorization headers, etc.)
};

app.use(cors(corsOptions));
// app.use(cors())
app.use(cookieParser());
app.use(express.json())
app.use("/user", userRoute)
app.use("/cart", cartRoute)
app.use("/order", orderRoute)
app.use("/product", productRoute)






connectDB(process.env.MONGODB_CONNECTION)
app.listen(3500, () => {
    console.log("server has started")
})