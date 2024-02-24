
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ApplicationError } from "../../error-handler/applicationError.js";
import userRepository from "./user.repository.js";

export default class userController {
    constructor() {
        this.UserRepository = new userRepository();
      }
      // Registering a new User
  registerUser = async (req, res, next) => {
    const { name, email, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 12);
    try {
      const newUser = {
        name,
        email,
        password: hashPassword,
      };

      await this.UserRepository.signUp(newUser);
      res.status(200).json(newUser);
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something went wrong ", 500);
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
              expiresIn: "1h",
            }
          );

          res
            .cookie("token", token, {
              maxAge: 1 * 60 * 60 * 1000,
              httpOnly: true,
            })
            .json({ success: true, msg: "user login successful", token });

          // 4. Send token.
        } else {
          return res.status(400).send("Incorrect password ");
        }
      }
    } catch (err) {
      console.log(err);
      return res.status(200).send("Something went wrong");
    }
  }

}