require("dotenv").config();
const express = require("express");
const storeRouter = require("./routes/storeRouter");
const hostRouter = require("./routes/hostRouter");
const mongoose = require("mongoose");

const PORT = process.env.PORT;
const MONGO_URL = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@travelnest.rx3cffk.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;

const { error404 } = require("./controller/error");
const authRouter = require("./routes/authRouter");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.urlencoded({ extended: true }));

app.use("/", storeRouter);
app.use("/host", hostRouter);
app.use(express.static("public"));
app.use(authRouter);

app.use(error404);

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB:", err);
  });
