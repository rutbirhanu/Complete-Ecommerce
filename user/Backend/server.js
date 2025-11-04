const express = require("express")
const cors = require("cors")
const admin = require("firebase-admin")
const userRoute = require("./route/userRoute")
const cartRoute = require("./route/cartRoute")
const productRoute = require("./route/productRoute")
const orderRoute = require("./route/orderRoute")
const connectDB = require("./config/dbConfig")
const cookieParser = require("cookie-parser")
// const serviceAccount = require("./serviceAccountKey.json")
const { Kafka } = require("kafkajs")
const { producer, consumer, runSubscription } = require("./controller/orderController")
const { elasticClient, checkConnection, createProductIndex } = require("./config/elasticsearchConfig")
const productSchema = require("./model/product")

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




const bulkIndexProducts = async () => {
  const products = await productSchema.find();
  
  const operations = products.flatMap((product) => [
    { index: { _index: "products", _id: product._id.toString() } },
    {
      name: product.name,
      description: product.description,
      category: product.category,
      brand: product.brand,
      price: product.price,
      stock: product.stock,
      suggest: {
        input: [
          product.name,
          product.brand,
          product.category,
          product.description,
        ].filter(Boolean),
      },
    },
  ]);

  await elasticClient.bulk({ refresh: true, body: operations });
  console.log("✅ Bulk indexed all products into Elasticsearch");
};



connectDB(process.env.MONGODB_CONNECTION)
app.listen(3500, async () => {
    await producer.connect()
    await consumer.connect()
    await runSubscription()
    await checkConnection()
    // await createProductIndex()
    // await bulkIndexProducts()
    console.log("server has started")
})