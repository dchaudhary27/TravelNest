const express = require("express");

const storeRouter = require("./routes/storeRouter");
const hostRouter = require("./routes/hostRouter");
const { mongoConnect } = require("./util/database");

const { error404 } = require("./controller/error");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.urlencoded({ extended: true }));
app.use("/", storeRouter);
app.use("/host", hostRouter);
app.use(express.static("public"));

app.use(error404);
const PORT = 3001;

mongoConnect(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
