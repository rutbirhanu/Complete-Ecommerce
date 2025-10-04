const Kafka = require("kafkajs")

const kafka = new Kafka(
    {
        clientId: "inventory-service",
        brokers:["localhost:9094"]
    }
)

const inventoryProducer = kafka.producer()

const connectProducer = async() => {
   try {
        inventoryProducer.connect()
        console.log("order producer connected")
    }
    catch (err) {
        console.log(err)
    }
}
