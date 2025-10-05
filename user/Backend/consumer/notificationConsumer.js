const Kafka = require("kafkajs")

const kafka = new Kafka(
    {
        clientId: "notification-service",
        brokers: ["localhost:9094"]
    }
)

const notificationConsumer = kafka.consumer({ groupId: "notify-service" })

const run = async () => {
    try {
        await notificationConsumer.connect()
        await notificationConsumer.subscribe({
            topic: "order-service",
            fromBeginning: true
        })

        await notificationConsumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                const value = message.value.toString()
                const {userId, cartData} = JSON.parse(value)
                
            }
        })
        console.log("order producer connected")
    }
    catch (err) {
        console.log(err)
    }
}
