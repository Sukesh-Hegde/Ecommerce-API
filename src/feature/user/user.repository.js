import userModel from "./user.schema.js";
import { ApplicationError } from "../../error-handler/applicationError.js";
import { mongoose } from "mongoose";

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

  async deleteUserRepo(_id) {
    return await userModel.findByIdAndDelete(_id);
  }

async updateUserRoleAndProfileRepo  (_id, data) {
  try {
    // Ensure that the provided _id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res
        .status(400)
        .send("id is not valid");
    }

    // Find the user by _id and update the role and profile
    const updatedUser = await userModel.findByIdAndUpdate(
      _id,
      { $set: data },
      { new: true, runValidators: true, useFindAndModify: false }
    );

    if (!updatedUser) {
      throw new ApplicationError(
        "Something went wrong while updateUserRoleAndProfileRepo",
        500
      );
    }

    return updatedUser;
  } catch (error) {
    console.log(error);
    throw new ApplicationError(
      "Something went wrong while updateUserRoleAndProfileRepo",
      500
    );
  }
};
}
