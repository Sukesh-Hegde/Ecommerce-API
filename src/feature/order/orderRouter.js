import express from "express";
import { createNewOrder } from "./order.controller.js";
import jwtAuth from "../../conflig/jwtmiddleware.js";

const orderRouter = express.Router();


orderRouter.post("/new", jwtAuth, (req, res) => {
  createNewOrder(req, res);
});

export default orderRouter;
