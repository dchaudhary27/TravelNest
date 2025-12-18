const mongoose = require("mongoose");
const Favourites = require("./favourites");

const homeSchema = new mongoose.Schema({
  homeName: { type: String, required: true },
  rentPerDay: { type: Number, required: true },
  address: { type: String, required: true },
  rating: { type: Number, required: true },
  photo: { type: String },
  description: { type: String },
});

homeSchema.pre(
  ["findOneAndDelete", "findByIdAndDelete"],
  { query: true },
  async function () {
    const filter = this.getFilter();
    if (!filter?._id) {
      return;
    }
    await Favourites.deleteMany({ homeId: filter._id });
  }
);

module.exports = mongoose.model("Home", homeSchema);
