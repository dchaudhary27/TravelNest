const express = require("express");
const multer = require("multer");
const hostController = require("../controller/hostController");
const { storage } = require("../util/cloudinary");

const hostRouter = express.Router();

// Single upload configuration for multiple file types
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    // Accept images and PDFs
    if (
      file.mimetype.startsWith("image/") ||
      file.mimetype === "application/pdf"
    ) {
      cb(null, true);
    } else {
      cb(new Error("Only images and PDF files are allowed!"), false);
    }
  },
});

// Use fields for multiple file uploads
hostRouter.get("/add-home", hostController.getAddHome);

hostRouter.post(
  "/add-home",
  upload.fields([
    { name: "photo", maxCount: 1 },
    { name: "houseRules", maxCount: 1 },
  ]),
  hostController.postAddHome
);

hostRouter.get("/host-home-list", hostController.gethosthomeList);
hostRouter.get("/edit-home/:homeId", hostController.getEditHome);

hostRouter.post(
  "/edit-home",
  upload.fields([
    { name: "photo", maxCount: 1 },
    { name: "houseRules", maxCount: 1 },
  ]),
  hostController.postEditHome
);

hostRouter.post("/delete-home/:homeId", hostController.postDeleteHome);

// Error handling middleware for file upload errors
hostRouter.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === "LIMIT_FILE_SIZE") {
      return res.status(400).send("File size too large. Maximum size is 10MB.");
    }
    return res.status(400).send("File upload error: " + error.message);
  }
  if (error) {
    return res.status(400).send(error.message);
  }
  next();
});

module.exports = hostRouter;
