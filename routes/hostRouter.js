const express = require("express");
const multer = require("multer");
const hostRouter = express.Router();
const hostController = require("../controller/hostController");

const randomString = (length) => {
  let result = "";
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < length; i++)
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  return result;
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "houseRules") cb(null, "rules/");
    else cb(null, "uploads/");
  },
  filename: (req, file, cb) =>
    cb(null, randomString(10) + "-" + file.originalname),
});

const fileFilter = (req, file, cb) => {
  if (
    file.fieldname === "photo" &&
    ["image/png", "image/jpg", "image/jpeg"].includes(file.mimetype)
  )
    cb(null, true);
  else if (
    file.fieldname === "houseRules" &&
    file.mimetype === "application/pdf"
  )
    cb(null, true);
  else cb(null, false);
};

const upload = multer({ storage, fileFilter });

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

module.exports = hostRouter;
