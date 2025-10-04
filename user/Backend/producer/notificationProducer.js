const Kafka = require("kafkajs")

const kafka = new Kafka(
    {
        clientId: "notification-service",
        brokers:["localhost:9094"]
    }
)

const notificationProducer = kafka.producer()

const connectProducer = async() => {
   try {
        await notificationProducer.connect()
        console.log("order producer connected")
    }
    catch (err) {
        console.log(err)
    }
}
