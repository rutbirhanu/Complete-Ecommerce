require("dotenv").config()
const userModel = require("../model/user")
const productModel = require("../model/product")


const addToCart = async (req, res) => {
  try {
    const { userId } = req.user

    const { itemId } = req.body
    const user = await userModel.findById(userId)
    let cartData = await user.cartData

    if (cartData[itemId]) {

      cartData[itemId] += 1
    }
    else {
      cartData[itemId] = 1
    }
    await userModel.findByIdAndUpdate(userId, { cartData })
    res.status(200).json("added to cart")
  }
  catch (err) {
    console.log(err)
    res.status(500).json(err.message)
  }
}

const updateCart = async (req, res) => {
  try {
    const { userId } = req.user;
    const { itemId, quantity } = req.body;

    // Get current stock from Redis (fast) or MongoDB (fallback)
    const stockKey = `product:${itemId}:stock`;
    let stock = await redis.get(stockKey);
    if (!stock) {
      const product = await productModel.findById(itemId);
      stock = product.stock;
      await redis.set(stockKey, stock); // cache for next time
    }
    stock = parseInt(stock);

    if (quantity > stock) {
      return res.status(400).json({
        message: `Only ${stock} items available`,
        maxAllowed: stock
      });
    }

    // Update cart
    const user = await userModel.findById(userId);
    let cartData = user.cartData || {};
    cartData[itemId] = quantity;

    if (cartData[itemId] <= 0) {
      delete cartData[itemId];
    }

    await userModel.findByIdAndUpdate(userId, { cartData });
    res.status(200).json({ message: "Cart updated successfully", cartData });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const getUserCart = async (req, res) => {
  try {
    const { userId } = req.user;

    const user = await userModel.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const cartData = user.cartData;
    const itemIds = Object.keys(cartData);

    if (itemIds.length === 0) {
      return res.status(200).json({ data: [], message: "Cart is empty" });
    }

    const products = await productModel.find({ _id: { $in: itemIds } });

    const detailedCart = products.map(product => ({
      _id: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: cartData[product._id],
    }));
    res.status(200).json({ data: detailedCart, message: "Cart data fetched successfully" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};



module.exports = { getUserCart, updateCart, addToCart }





// const increaseItemAmount = async(req, res) => {
//   try{
//     const { userId } = req.user
//     const { itemId } = req.body
//     const user = await userModel.findById(userId)
//     let cartData = user.cartData
//     if (cartData[itemId]) {
//       cartData[itemId]+=1
//     }
//     await userModel.findByIdAndUpdate(userId,{cartData})
//    res.status(200).json("item amount incremented")

//   }
//   catch(err){
//     res.status(500).json(err.message)
//   }
// }

// const decreaseItemAmount = async(req, res) => {
//   try{
//     const { userId } = req.user
//     const { itemId } = req.body
//     const user = await userModel.findById(userId)
//     let cartData = user.cartData
//     if (cartData[itemId]) {
//       cartData[itemId]-=1
//     }
//     await userModel.findByIdAndUpdate(userId,{cartData})
//    res.status(200).json("item amount incremented")

//   }
//   catch(err){
//     res.status(500).json(err.message)
//   }
// }



