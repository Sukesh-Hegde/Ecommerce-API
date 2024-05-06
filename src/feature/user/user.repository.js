import mongoose from "mongoose";
import userModel from "./user.schema.js";
import { ApplicationError } from "../../error-handler/applicationError.js";

export default class userRepository {
  async signUp(user) {
    try {
      // create instance of model.
      const newUser = new userModel(user);
      await newUser.save(); //save the document
      return newUser;
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }

  async findByEmail(email) {
    try {
      return await userModel.findOne({ email });
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }
}
