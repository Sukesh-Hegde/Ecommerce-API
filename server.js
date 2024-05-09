import express from "express";
import { connectUsingMongoose } from "./src/conflig/mongoose.js";
import productRouter from "./src/feature/products/product.routes.js";
import userRouter from "./src/feature/user/user.routes.js";
import cookieParser from "cookie-parser";
import orderRouter from "./src/feature/order/orderRouter.js";

const server=express();
server.use(express.json());
server.use(cookieParser());

server.get("/", (req, res) => {
  res.send("Welcome to Ecommerce APIs");
});


server.use("/user/",userRouter);
server.use("/products/",productRouter);
server.use("/order", orderRouter);


server.listen(8000,()=>{
    console.log("Server is listening at 8000");
    connectUsingMongoose();
});