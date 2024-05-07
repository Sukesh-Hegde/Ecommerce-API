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
    const { name, email, password } = req.body;
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
      return next(
        new ErrorHandler(500, error.message || "Internal Server Error")
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
}
