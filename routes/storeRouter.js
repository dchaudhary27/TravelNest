// External Module
const express = require("express");
const storeRouter = express.Router();

const storeController = require("../controller/storeController");

storeRouter.get("/", storeController.getindex);
storeRouter.get("/home-list", storeController.getHomeList);
storeRouter.get("/bookings", storeController.getBookings);
storeRouter.get("/favourites", storeController.getFavouritesList);
storeRouter.post("/favourites", storeController.postAddToFavourites);
storeRouter.get("/homes/:homeId", storeController.getHomeDetails);

module.exports = storeRouter;
