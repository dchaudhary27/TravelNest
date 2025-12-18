const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const favouritesSchema = new mongoose.Schema({
  homeId: { type: ObjectId, ref: "Home", required: true, unique: true },
});

module.exports = mongoose.model("Favourites", favouritesSchema);
