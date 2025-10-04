const Kafka = require("kafkajs")

const kafka = new Kafka(
    {
        clientId: "order-service",
        brokers: ["localhost:9094"]
    }
)

const orderProducer = kafka.producer()

const connectProducer = async () => {
    try {
        await orderProducer.connect()
        console.log("order producer connected")
    }
    catch (err) {
        console.log(err)
    }
}
