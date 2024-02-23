import express from "express";
import { connectUsingMongoose } from "./src/conflig/mongoose.js";
import productRouter from "./src/feature/products/product.routes.js";
import userRouter from "./src/feature/user/user.routes.js";

const server=express();
server.use(express.json());



server.use("/user/",userRouter);
server.use("/products/",productRouter);










server.listen(8000,()=>{
    console.log("Server is listening at 8000");
    connectUsingMongoose();
});