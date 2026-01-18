const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

// Single storage configuration for both images and PDFs
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    // Determine folder based on file type
    let folder;
    let allowedFormats;

    if (file.mimetype.startsWith("image/")) {
      folder = "travelnest/images";
      allowedFormats = ["jpg", "png", "jpeg", "webp"];
    } else if (file.mimetype === "application/pdf") {
      folder = "travelnest/rules";
      allowedFormats = ["pdf"];
    } else {
      folder = "travelnest/uploads";
      allowedFormats = null; // Allow all formats
    }

    return {
      folder: folder,
      allowed_formats: allowedFormats,
      // Generate unique public_id
      public_id: `${Date.now()}-${Math.round(Math.random() * 1e9)}`,
      // Optimize transformations for images
      transformation: file.mimetype.startsWith("image/")
        ? [
            { width: 800, height: 600, crop: "limit", quality: "auto" },
            { fetch_format: "auto" },
          ]
        : [],
    };
  },
});

// Helper function to delete files from Cloudinary
const deleteFromCloudinary = async (publicId) => {
  try {
    if (!publicId) return;

    // Extract public_id from URL if needed
    const extractedId = publicId.includes("res.cloudinary.com")
      ? publicId.split("/").slice(-2).join("/").split(".")[0]
      : publicId;

    const result = await cloudinary.uploader.destroy(extractedId);
    return result;
  } catch (error) {
    console.error("Error deleting from Cloudinary:", error);
    return null;
  }
};

// Helper function to extract public_id from Cloudinary URL
const extractPublicId = (url) => {
  if (!url) return null;

  try {
    // Extract public_id from Cloudinary URL
    const urlParts = url.split("/");
    const uploadIndex = urlParts.indexOf("upload");

    if (uploadIndex !== -1) {
      // Get everything after the version number
      const afterUpload = urlParts.slice(uploadIndex + 2).join("/");
      return afterUpload.split(".")[0]; // Remove file extension
    }

    return null;
  } catch (error) {
    console.error("Error extracting public_id:", error);
    return null;
  }
};

module.exports = {
  cloudinary,
  storage,
  deleteFromCloudinary,
  extractPublicId,
};
