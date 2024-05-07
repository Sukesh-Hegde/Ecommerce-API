import userModel from "../feature/user/user.schema.js";

export const authByUserRole = async (req, res, next) => {
  const userID = req.userID;

  try {
    const user = await userModel.findById(userID);
    if (user.role == "admin") {
      next();
    } else {
      return res.status(403).send("Only Admin can access");
    }
  } catch (error) {
    console.log(error);
    throw new ApplicationError("Something went wrong while cheking role", 500);
  }
};

