const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const imageStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "travelnest/images",
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

const pdfStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "travelnest/rules",
    allowed_formats: ["pdf"],
  },
});

module.exports = { imageStorage, pdfStorage };
