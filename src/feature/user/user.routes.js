// Manage routes/paths to ProductController

// 1. Import express.
import express from "express";

import userController from "./user.controller.js";

// 2. Initialize Express router.
const userRouter = express.Router();

const UserController = new userController();

// All the paths to controller methods.

userRouter.post("/signup", (req, res) => {
    UserController.registerUser(req, res);
  });
  
  userRouter.post('/signin', (req, res)=>{
    UserController.signIn(req, res)
  });

userRouter.post("/add", (req, res, next) => {
    UserController.adduser(req, res, next);
});


export default userRouter;
