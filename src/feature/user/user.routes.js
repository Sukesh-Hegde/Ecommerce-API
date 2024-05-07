// Manage routes/paths to ProductController

// 1. Import express.
import express from "express";

import userController from "./user.controller.js";
import jwtAuth from "../../conflig/jwtmiddleware.js";

// 2. Initialize Express router.
const userRouter = express.Router();

const UserController = new userController();

// All the paths to controller methods.

userRouter.post("/signup", (req, res) => {
  UserController.registerUser(req, res);
});

userRouter.post("/signin", (req, res) => {
  UserController.signIn(req, res);
});

userRouter.post("/password/forget",jwtAuth, (req, res) => {
  UserController.forgetPassword(req, res);
});

userRouter.post("/password/reset/:token", jwtAuth, (req, res) => {
  UserController.forgetPassword(req, res);
});

userRouter.get("/protected", jwtAuth, (req, res) => {
  return res.status(200).send("entered protected page");
});

export default userRouter;
