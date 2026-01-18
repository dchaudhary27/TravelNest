const express = require("express");
const multer = require("multer");
const hostController = require("../controller/hostController");
const { imageStorage, pdfStorage } = require("../util/cloudinary");

const hostRouter = express.Router();

const uploadImage = multer({ storage: imageStorage });
const uploadPdf = multer({ storage: pdfStorage });

hostRouter.get("/add-home", hostController.getAddHome);

hostRouter.post(
  "/add-home",
  uploadImage.single("photo"),
  uploadPdf.single("houseRules"),
  hostController.postAddHome
);

hostRouter.get("/host-home-list", hostController.gethosthomeList);
hostRouter.get("/edit-home/:homeId", hostController.getEditHome);

hostRouter.post(
  "/edit-home",
  uploadImage.single("photo"),
  uploadPdf.single("houseRules"),
  hostController.postEditHome
);

hostRouter.post("/delete-home/:homeId", hostController.postDeleteHome);

module.exports = hostRouter;
