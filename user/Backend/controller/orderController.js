const orderSchema = require("../model/order")
const userSchema = require("../model/user")

require("dotenv").config()


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
    const { page = 1, limit = 2, search = '', status, startDate, endDate } = req.query;

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
        const { userId } = req.user
        const { address, total, items } = req.body
        const order = await orderSchema.create({ userId, address, items, total, date: Date.now(), payment: false })

        await userSchema.findByIdAndUpdate(userId, { cartData: {} })
        const line_items = items.map((item) => ({
            price_data: {
                currency: 'usd',
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100
            },
            quantity: item.quantity
        }))

        const session = await stripe.checkout.sessions.create({
            line_items,
            mode: 'payment',
            success_url: `http://localhost:5173/verify?success=true&orderId=${order._id}`,
            cancel_url: `http://localhost:5173/verify?success=false&orderId=${order._id}`, // Optionally include a cancel URL
        });

        res.status(201).json({ success: true, id: session.id });
    } catch (error) {
        console.error('Error creating checkout session:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


const verifyStripe = async (req, res) => {
    try {
        const { userId } = req.user
        const { orderId, success } = req.body
        if (success === true) {
            await orderSchema.findByIdAndUpdate(orderId, { payment: true })
            await userSchema.findByIdAndUpdate(userId, { cartData: {} })
            res.json({ success: true, message: "order successful" })
        }
        else {
            await orderSchema.findByIdAndDelete(orderId)
            res.json({ success: false, message: "order not successful" })
        }
    }
    catch (err) {
        res.status(500).json(err.message)
    }
}

module.exports = { createCheckOut, verifyStripe, userOrder, allOrders, getOrders }