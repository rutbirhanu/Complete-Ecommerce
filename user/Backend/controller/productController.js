const productSchema = require("../model/product")
const { getMessaging } = require("firebase-admin/messaging")
const admin = require("firebase-admin")
const cloudinary = require('cloudinary').v2;
const redis = require("../config/redisClientConfig")


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Your Cloudinary cloud name
    api_key: process.env.CLOUDINARY_API_KEY,       // Your Cloudinary API key
    api_secret: process.env.CLOUDINARY_API_SECRET, // Your Cloudinary API secret
});


const sendNotification = async (req, res) => {
    try {
        const receivedToken = "eTwzPVpZaG5t_-c50-60Qx:APA91bF691zqdZj6ZnsKr5TGiFJVoRtXNFWxASJH5QgwF-99Za7U-O9e3bNW0uur2_AQLIhC0J0KBAtPdg4nedhp-NMVmzK2VsV2N27OggG1dIo6f0VtUhfSik2ZOQDuBjTC2YzVCO7Y"
        const message = {
            notification: {
                title: "Product added",
                body: "A new product has been added"
            },
            token: receivedToken
        }

        getMessaging()
            .send(message)
            .then(response => {
                // res.status(200).json({message})
                console.log(message)
            })
            .catch(err => {
                res.status(500).json(err)
                console.log(err)
            })
    }
    catch (err) {
        res.status(500).json(err.message)
    }
}


const allProducts = async (req, res) => {
    try {
        let {
            page = 1,
            limit = 10,
            category,
            brand,
            priceMin,
            priceMax,
        } = req.query;

        page = parseInt(page);
        limit = parseInt(limit);

        // Build query object
        const query = {};

        if (category) query.category = category;
        if (brand) query.brand = brand;
        if (priceMin || priceMax) {
            query.price = {};
            if (priceMin) query.price.$gte = parseFloat(priceMin);
            if (priceMax) query.price.$lte = parseFloat(priceMax);
        }


        // 🔹 Create cache key based on query params
        const cacheKey = `products:${JSON.stringify({
            page,
            limit,
            category,
            brand,
            priceMin,
            priceMax,
        })}`;

        // 🔹 Check Redis cache
        const cachedData = await redis.get(cacheKey);
        if (cachedData) {
            console.log("✅ Fetched from Redis cache");
            return res.status(200).json(JSON.parse(cachedData));
        }

        // 🔹 MongoDB query
        const products = await productModel
            .find(query)
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit);

        const totalProducts = await productModel.countDocuments(query);

        const response = {
            products,
            totalPages: Math.ceil(totalProducts / limit),
            currentPage: page,
            totalProducts,
        };

        // 🔹 Save in Redis (set TTL of 5 min = 300s)
        await redis.set(cacheKey, JSON.stringify(response), "EX", 300);

        res.status(200).json(response);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};



const fetchSingleProduct = async (req, res) => {
    try {
        const { productId } = req.params

        const product = await productSchema.findById(productId);

        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.status(200).json(product)
    }
    catch (err) {
        console.log(err)
        res.status(500).json("error while fetching prduct ")
    }
}

// admin apis

const addProduct = async (req, res) => {
    try {
        const { name, category, brand, price, description, stock } = req.body
        const image = req.file
        if (!image) {
            return res.status(404).json("images not found")
        }
        const imageUrl = req.file.path;
        console.log(imageUrl)
        const product = await productSchema.create({ name, category, brand, price, description, image: imageUrl, stock })
        // await sendNotification(req, res)
        await redis.set(`product:${product._id}:stock`, product.stock);
        console.log("product created")
        res.status(201).json("product created")
    }
    catch (err) {
        return res.status(500).json("not successful")
    }
}

const updateProduct = async (req, res) => {
    try {
        const { productId } = req.params
        const { name, category, brand, price, description, image } = req.body

        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'uploads',
            });
            image = result.secure_url;
        }

        const updatedProduct = await productSchema.findByIdAndUpdate(
            productId,
            { name, category, brand, price, description, image },
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json("Updated successfully");

    }
    catch (err) {
        res.status(500).json(err)
    }
}


const deleteProduct = async (req, res) => {
    try {
        const { productId } = req.params
        const deletedProduct = await productSchema.findByIdAndDelete(productId);

        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json("Deleted successfully");

    }
    catch (err) {
        res.status(500).json(err)
    }
}


module.exports = { addProduct, sendNotification, allProducts, deleteProduct, updateProduct, fetchSingleProduct }




// GET /products?page=1&limit=20&category=Shoes&brand=Nike&priceMin=50&priceMax=200&sort=price:asc



// const allProducts = async (req, res) => {
//     try {
//         const { page = 1, limit = 10, search = "", category } = req.query
//         let query = {}

//         if (search) {
//             query.name = { $regex: search, $options: "i" }
//         }

//         if (category) {
//             query.category = category;
//         }

//         const cachedProducts = await redis.get("products");
//         if (cachedProducts) {
//             console.log("Fetching from Redis cache ✅");
//             return res.json(JSON.parse(cachedProducts));
//         }

//         const products = await productSchema.find(query)
//             .limit(limit * 1)
//             .skip((page - 1) * limit)
//             .sort({ createdAt: -1 })

//         await redis.set("products", JSON.stringify(products), "EX", 1000);

//         const totalProducts = await productSchema.countDocuments(query)

//         res.status(200).json({
//             products,
//             totalPages: Math.ceil(totalProducts / limit),
//             currentPage: page
//         })

//     }
//     catch (err) {
//         res.status(500).json(err)
//     }
// }