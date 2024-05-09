import OrderModel from "./order.schema.js";
import { ApplicationError } from "../../error-handler/applicationError.js";

export const createNewOrderRepo = async (data) => {
 try {
  const newOrder = await OrderModel.create(data);
  return newOrder;
} catch (error) {
  console.log(error);
  throw new ApplicationError("Something went wrong while creating Order", 500);
}};
