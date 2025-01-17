const multer = require("multer")
const { v2: cloudinary } = require('cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'uploads', // Specify folder in Cloudinary
        allowed_formats: ['jpg', 'png', 'jpeg', 'gif'], // Optional: Restrict file types
    },
});

const upload = multer({ storage })

module.exports = upload