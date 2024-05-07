import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { ApplicationError } from "../../error-handler/applicationError.js";
import userRepository from "./user.repository.js";
import { sendWelcomeEmail } from "../../emails/welcomeMail.js";
import { sendPasswordResetEmail } from "../../emails/passwordReset.js";

export default class userController {
  constructor() {
    this.UserRepository = new userRepository();
  }
  // Registering a new User
  registerUser = async (req, res, next) => {
    const { name, email, password,role } = req.body;
    const hashPassword = await bcrypt.hash(password, 12);
    try {
      const existingUser = await this.UserRepository.findByEmail(email);

      if (existingUser) {
        // If a user with the provided email already exists, return an error response
        return res.status(400).json({ error: "Email already registered." });
      }

      const newUser = {
        name,
        email,
        password: hashPassword,
        role,
      };

      const user = await this.UserRepository.signUp(newUser);
      await sendWelcomeEmail(newUser);
      res.status(200).json({ user });
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong with database", 500);
    }
  };

  async signIn(req, res, next) {
    try {
      //1.find user by email
      //check user is there by checking the email
      const user = await this.UserRepository.findByEmail(req.body.email);
      if (!user) {
        return res.status(400).send("Incorrect email");
      } else {
        //2.compare password with hashed password
        const result = await bcrypt.compare(req.body.password, user.password);

        if (result) {
          // 3. Create token.
          const token = jwt.sign(
            {
              userID: user._id,
              email: user.email,
            },
            "AIb6d35fvJM4O9pXqXQNla2jBCH9kuLz",
            {
              expiresIn: "1d",
            }
          );
          const cookieOptions = {
            expires: new Date(
              Date.now() + process.env.COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
            ),
            httpOnly: true,
          };

          res
            .cookie("token", token, cookieOptions)
            .json({ success: true, msg: "user login successful", token });

          // 4. Send token.
        } else {
          return res.status(400).send("Incorrect password ");
        }
      }
    } catch (err) {
      console.log(err);
      return res.status(200).send("Something went wrong while loggIn");
    }
  }

  forgetPassword = async (req, res, next) => {
    const { email } = req.body;
    try {
      const user = await this.UserRepository.findByEmail(email);
      if (!user) {
        return res.status(400).send("User not found with the provided email ");
      }

      const resetToken = await user.getResetPasswordToken();
      await user.save();

      const resetUrl = `Your reset token is ${resetToken}`;
      console.log(resetUrl);

      await sendPasswordResetEmail(user, resetUrl);

      res.status(200).json({ user });
    } catch (err) {
      console.log(err);
      throw new ApplicationError(
        "Something went wrong with forgot password",
        500
      );
    }
  };

  resetUserPassword = async (req, res, next) => {
    const resetToken = req.params.token;
    const { newPassword, confirmPassword } = req.body;

    try {
      //hashing the reset password so that it will match with data present in the database
      const hashed = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");
      // Find the user by the reset token
      console.log(hashed);
      const user = await this.UserRepository.findUserForPasswordResetRepo(
        hashed
      );

      // Check if the user exists and the token is valid
      if (!user) {
        throw new ApplicationError(
          "Something went wrong with reset password (user is not found)",
          500
        );
      }

      // Update the user's password
      user.password = await bcrypt.hash(newPassword, 12);

      await user.save();

      // Send a success response
      res
        .status(200)
        .cookie("token", null, {
          expires: new Date(Date.now()),
          httpOnly: true,
        })
        .json({ success: true, message: "Password reset successfully" });
    } catch (error) {
      throw new ApplicationError(
        "Something went wrong with reset password",
        500
      );
    }
  };

  logoutUser = async (req, res, next) => {
    res
      .status(200)
      //removing token from the cookies
      .cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
      })
      .json({ success: true, msg: "logout successful" });
  };

  updateUserProfile = async (req, res, next) => {
    const { name, email } = req.body;
    const userID = req.userID;
    try {
      const updatedUserDetails =
        await this.UserRepository.updateUserProfileRepo({_id:userID}, {
          name,
          email,
        });
      res.status(201).json({ success: true, updatedUserDetails });
    } catch (error) {
      console.log(error);
      throw new ApplicationError(
        "Something went wrong while updateUserProfile",
        500
      );
    }
  };

getUserDetails = async (req, res, next) => {
    const userID = req.userID;
  try {
    const userDetails = await this.UserRepository.findUserRepo({
      _id: userID,
    });
    res.status(200).json({ success: true, userDetails });
  } catch (error) {
    throw new ApplicationError(
      "Something went wrong while getUserDetails",
      500
    );
  }
};

getAllUsers = async (req, res, next) => {
  try {
    const allUsers = await this.UserRepository.getAllUsersRepo();
    res.status(200).json({ success: true, allUsers });
  } catch (error) {
    console.log(error);
    throw new ApplicationError("Something went wrong while getAllUsers", 500);
  }
};

deleteUser = async (req, res, next) => {
  try {
    const deletedUser = await this.UserRepository.deleteUserRepo(req.params.id);
    if (!deletedUser) {
      return res
        .status(400)
        .json({ success: false, msg: "no user found with provided id" });
    }

    res
      .status(200)
      .json({ success: true, msg: "user deleted successfully", deletedUser });
  } catch (error) {
    console.log(error);
    throw new ApplicationError("Something went wrong while deleteUser", 500);
  }
};

export const updateUserProfileAndRole = async (req, res, next) => {
  const { userId, newRole, newData } = req.body;

  try {
    // Ensure that the admin has provided the necessary parameters
    if (!req.user._id || !newRole || !newData) {
      return next(new ErrorHandler(400, "Please provide userId, newRole, and newData"));
    }

    // Update the user's role and profile
    const updatedUser = await updateUserRoleAndProfileRepo(userId, {
      role: newRole,
      ...newData,
    });

    res.status(200).json({ success: true, updatedUser });
  } catch (error) {
    return next(new ErrorHandler(400, error));
  }
};
}
