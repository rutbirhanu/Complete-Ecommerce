const orderSchema = require("../model/order")
const userSchema = require("../model/user")
const productSchema = require("../model/product")
const redis = require("../config/redisClientConfig")
const { createProducer, createConsumer, createKafkaClient } = require("../config/kafkaConfig")

require("dotenv").config()

const kafka = createKafkaClient("order")
const producer = createProducer(kafka)
const consumer = createConsumer(kafka, "order-id")


const userOrder = async (req, res) => {
  try {
    const { userId } = req.user
    const orders = await orderSchema.find({ userId: userId })
    res.status(200).json(orders)
  }
  catch (err) {
    res.status(500).json(err.message)
  }
}


const allOrders = async (req, res) => {
  try {
    const orders = await orderSchema.find({})
    res.status(200).json(orders)
  }
  catch (err) {
    res.status(500).json(err.message)
  }
}


const getOrders = async (req, res) => {
  const { page = 1, limit = 10, search = '', status, startDate, endDate } = req.query;

  const query = {};
  if (search) {
    query.items = {
      $elemMatch: {
        name: { $regex: search, $options: 'i' }
      }
    };
  }

  if (status) {
    query.status = status;
  }

  if (startDate && endDate) {
    query.createdAt = { $gte: new Date(startDate), $lte: new Date(endDate) };
  }

  try {
    const orders = await orderSchema.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const totalOrders = await orderSchema.countDocuments(query);
    res.status(200).json({
      orders,
      totalPages: Math.ceil(totalOrders / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving orders', error });
  }
};



const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

const createCheckOut = async (req, res) => {
  try {
    const { userId } = req.user;
    const { address, total, items } = req.body;

    const reservationId = uuidv4();
    const reserved = [];

    for (const item of items) {
      const stockKey = `product:${item._id}:stock`;

      const stock = await redis.decrby(stockKey, item.quantity);

      if (stock < 0) {
        await redis.incrby(stockKey, item.quantity);

        // rollback all reserved so far
        for (const r of reserved) {
          await redis.incrby(`product:${r._id}:stock`, r.quantity);
        }

        return res.status(400).json({ error: `${item.name} is out of stock` });
      }
      reserved.push(item);
    }

    const reservationKey = `reservation:${reservationId}`;
    await redis.set(reservationKey, JSON.stringify(reserved), "EX", 15 * 60);

    const order = await orderSchema.create({
      userId,
      address,
      items,
      total,
      date: Date.now(),
      payment: false,
      reservationId,
    });


    // Step 4: Stripe checkout
    const line_items = items.map((item) => ({
      price_message: {
        currency: "usd",
        product_data: { name: item.name },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `http://localhost:5173/verify?success=true&orderId=${order._id}&reservationId=${reservationId}`,
      cancel_url: `http://localhost:5173/verify?success=false&orderId=${order._id}&reservationId=${reservationId}`,
    });

    res.status(201).json({ success: true, id: session.id });

  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};



const verifyStripe = async (req, res) => {
  try {
    const { userId } = req.user;
    const { orderId, success, reservationId } = req.body;

    if (success === true) {
      producer.send("payment_success", {
        orderId: orderId,
        userId: userId,
        reservationId: reservationId
      })
      res.json({ success: true, message: "Order successful" });

    } else {
      producer.send("payment_failed", {
        orderId: orderId,
        reservationId: reservationId
      })

      // Payment failed or cancelled → restore stock

      res.json({ success: false, message: "Order not successful" });
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
};


consumer.subscribe("payment_success", async (message) => {
  const { orderId, reservationId, userId } = message.value

  const reservationKey = `reservation:${reservationId}`;
  const reserved = await redis.get(reservationKey);

  if (reserved) {
    const items = JSON.parse(reserved);

    for (const item of items) {
      await productSchema.findByIdAndUpdate(item._id, {
        $inc: { stock: -item.quantity },
      });
    }

    await redis.del(reservationKey);
  }

  //create order here
  await userSchema.findByIdAndUpdate(userId, { cartData: {} });

  await orderSchema.findByIdAndUpdate(orderId, { payment: true });
})



consumer.subscribe("payment_failed", async (message) => {
  const { orderId, reservationId } = message.value
  const reservationKey = `reservation:${reservationId}`;
  const reserved = await redis.get(reservationKey);

  if (reserved) {
    const items = JSON.parse(reserved);
    for (const item of items) {
      await redis.incrby(`product:${item._id}:stock`, item.quantity);
    }
    await redis.del(reservationKey);
  }
  await orderSchema.findByIdAndDelete(orderId);

})

module.exports = { createCheckOut, verifyStripe, userOrder, allOrders, getOrders }






// const createCheckOut = async (req, res) => {
//     try {
//         const { userId } = req.user
//         const { address, total, items } = req.body
//         const order = await orderSchema.create({ userId, address, items, total, date: Date.now(), payment: false })

//         await userSchema.findByIdAndUpdate(userId, { cartData: {} })
//         const line_items = items.map((item) => ({
//             price_message: {
//                 currency: 'usd',
//                 product_message: {
//                     name: item.name
//                 },
//                 unit_amount: item.price * 100
//             },
//             quantity: item.quantity
//         }))

//         const session = await stripe.checkout.sessions.create({
//             line_items,
//             mode: 'payment',
//             success_url: `http://localhost:5173/verify?success=true&orderId=${order._id}`,
//             cancel_url: `http://localhost:5173/verify?success=false&orderId=${order._id}`, // Optionally include a cancel URL
//         });

//         res.status(201).json({ success: true, id: session.id });
//     } catch (error) {
//         console.error('Error creating checkout session:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// }





// const verifyStripe = async (req, res) => {
//     try {
//         const { userId } = req.user
//         const { orderId, success } = req.body
//         if (success === true) {
//             await orderSchema.findByIdAndUpdate(orderId, { payment: true })
//             await userSchema.findByIdAndUpdate(userId, { cartData: {} })
//             res.json({ success: true, message: "order successful" })
//         }
//         else {
//             await orderSchema.findByIdAndDelete(orderId)
//             res.json({ success: false, message: "order not successful" })
//         }
//     }
//     catch (err) {
//         res.status(500).json(err.message)
//     }
// }