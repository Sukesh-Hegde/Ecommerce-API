import bcrypt from "bcrypt";
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

          res.json({ success: true, msg: "user login successful", token });

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
      throw new ApplicationError("Something went wrong with forgot password", 500);
    }
  };
}
