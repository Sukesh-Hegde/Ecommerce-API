// Manage routes/paths to ProductController

// 1. Import express.
import express from "express";

import ProductController from "./product.controller.js";


// 2. Initialize Express router.
const productRouter = express.Router();

const productController = new ProductController();

// All the paths to controller methods.
// localhost/products

// localhost:4100/api/products/filter?minPrice=10&maxPrice=20&category=Category1
productRouter.put("/:id", (req, res,next) => {
  productController.updateProduct(req, res,next);
});

productRouter.delete("/:id", (req, res) => {
  productController.deleteProduct(req, res);
});


productRouter.post("/create", (req, res, next) => {
  productController.addproduct(req, res, next);
});

productRouter.get("/", (req, res) => {
  productController.getAllProducts(req, res);
});


export default productRouter;
