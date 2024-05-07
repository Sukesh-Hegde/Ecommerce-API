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

  async findUserForPasswordResetRepo(hashtoken) {
    return await userModel.findOne({
      resetPasswordToken: hashtoken,
      resetPasswordExpire: { $gt: Date.now() },
    });
  }

  async updateUserProfileRepo(_id, data) {
    return await userModel.findOneAndUpdate(_id, data, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
  }

  async findUserRepo(factor) {
    return await userModel.findOne(factor);
  }

  async getAllUsersRepo() {
    return userModel.find({});
  }
}
