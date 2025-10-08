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
const { Kafka } = require("kafkajs")
const { producer, consumer, runSubscription } = require("./controller/orderController")

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


// const kafka = new Kafka(
//     {
//         clientId: 'kafka-service',
//         brokers: ["localhost:9094"]
//     }
// )
// const kafkaAdmin = kafka.admin()
// const run = async () => {
//     try {
//         await kafkaAdmin.connect();
//         await kafkaAdmin.createTopics({
//             topics: [
//                 { topic: "payment" },
//                 { topic: "order" },
//                 { topic: "inventory" },
//                 { topic: "notification" },
//             ],
//         }).then(result => console.log("Created?", result))
//             .catch(err => console.error("Kafka error", err));

//         console.log("Kafka topics created successfully ✅");
//     } catch (err) {
//         console.error("Error creating Kafka topics ❌", err);
//     } finally {
//         await kafkaAdmin.disconnect();
//     }
// };



connectDB(process.env.MONGODB_CONNECTION)
app.listen(3500, async () => {
    await producer.connect()
    await consumer.connect()
    await runSubscription()
    console.log("server has started")
})