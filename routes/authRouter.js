const express = require("express");
const authRouter = express.Router();

const authController = require("../controller/authController");

authRouter.get("/login", authController.getLogin);

authRouter.post("/login", authController.postLogin);

authRouter.post("/logout", authController.postLogout);

<<<<<<< Updated upstream
=======
authRouter.get("/signup", authController.getSignup);

authRouter.post("/signup", authController.postSignup);

>>>>>>> Stashed changes
module.exports = authRouter;
