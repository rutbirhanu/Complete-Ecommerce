const Kafka = require("kafkajs")

const kafka = new Kafka(
    {
        clientId: "kafka-service",
        brokers:["localhost:9094"]
    }
)

const kafkaAdmin = kafka.admin()
const run = async() => {
    await kafkaAdmin.connect()
    await kafkaAdmin.createTopic({
        topics: [
            {topic :"payment"},
            {topic :"order"},
            {topic :"inventory"},
            {topic :"notification"},
        ]
    })
}

module.exports = run