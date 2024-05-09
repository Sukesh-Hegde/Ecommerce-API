import { createNewOrderRepo } from "./order.repository.js";
import { ApplicationError } from "../../error-handler/applicationError.js";

export const createNewOrder = async (req, res, next) => {
  try {
    const orderData = req.body;
    const newOrder = await createNewOrderRepo({
      ...req.body,
      user: req.userID,
    });
    res.status(201).json({
      success: true,
      order: newOrder,
    });
  } catch (error) {
    console.log(error);
    throw new ApplicationError(
      "Something went wrong while creating Order",
      500
    );
  }
};
