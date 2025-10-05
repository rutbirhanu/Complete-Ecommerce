const Kafka = require("kafkajs")

const kafka = new Kafka(
    {
        clientId: "payment-service",
        brokers:["localhost:9094"]
    }
)

const paymentProducer = kafka.producer()

const connectProducer = async() => {
   try {
       await paymentProducer.connect()
       console.log("order producer connected")
       const paymentStatus = "success"
       
       await paymentProducer.send({
           topic: "order",
           message: [{value:JSON.stringify(paymentStatus)}]
       })
    }
    catch (err) {
        console.log(err)
    }
}
