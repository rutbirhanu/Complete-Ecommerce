const {Kafka} = require("kafkajs")

exports.createKafkaClient = (service) => {
   return new Kafka(
        {
            clientId: service,
            brokers: ["localhost:9092"]
        }
    )
}


exports.createProducer = (kafka) => {
    const producer = kafka.producer()

    const connect = async () => {
        await producer.connect()
    }

    const send = async (topic, message) => {
        await producer.send({
            topic,
            messages: [{ value: JSON.stringify(message) }]
        })
    }

    const disconnect = async () => {
        await producer.disconnect()
    }

    return { connect, send, disconnect }
}



exports.createConsumer = (kafka, groupId) => {
    const consumer = kafka.consumer({ groupId })

    const connect = async () => {
        await consumer.connect()
    }

    const subscribe = async (topic, handler) => {
        await consumer.subscribe({
            topic,
            fromBeginning: true,
        })

        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                try {
                    const value = message.value.toString
                    if (value) {
                        handler(JSON.parse(value))
                    }
                }
                catch (err) {
                    console.log("consumer run error")
                    console.log(err)
                }
            }
        })
    }

    const disconnect = async () => {
        await consumer.disconnect()
    }

    return { connect, subscribe, disconnect }
}


