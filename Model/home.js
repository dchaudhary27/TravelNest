const mongoose = require("mongoose");

const homeSchema = new mongoose.Schema({
  homeName: { type: String, required: true },
  rentPerDay: { type: Number, required: true },
  address: { type: String, required: true },
  rating: { type: Number, required: true },
  photo: { type: String },
  description: { type: String },
  houseRules: { type: String },
});

module.exports = mongoose.model("Home", homeSchema);
