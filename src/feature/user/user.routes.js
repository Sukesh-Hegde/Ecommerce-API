// Manage routes/paths to ProductController

// 1. Import express.
import express from "express";

import userController from "./user.controller.js";
import jwtAuth from "../../conflig/jwtmiddleware.js";
import { authByUserRole } from "../../conflig/auth.js";

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

userRouter.put("/password/reset/:token", jwtAuth, (req, res) => {
  UserController.resetUserPassword(req, res);
});


userRouter.get("/logout", jwtAuth, (req, res) => {
  UserController.logoutUser(req, res);
});

userRouter.put("/profile/update", jwtAuth, (req, res) => {
  UserController.updateUserProfile(req, res);
});

userRouter.get("/details", jwtAuth, (req, res) => {
  UserController.getUserDetails(req, res);
});

//Only Admin
userRouter.get(
  "/admin/allusers",
  jwtAuth,
  authByUserRole,
  (req, res) => {
    UserController.getAllUsers(req, res);
  }
);


export default userRouter;
