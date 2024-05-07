import express from "express";

import ProductController from "./product.controller.js";
import { authByUserRole } from "../../conflig/auth.js";
import jwtAuth from "../../conflig/jwtmiddleware.js";

const productRouter = express.Router();

const productController = new ProductController();

// POST Routes
productRouter.post("/add",jwtAuth, authByUserRole, (req, res, next) => {
  productController.addNewProduct(req, res, next);
});

productRouter.put("/update/:id", jwtAuth, authByUserRole, (req, res, next) => {
  productController.updateProduct(req, res, next);
});


// // GET Routes


// productRouter.delete("/:id", (req, res) => {
//   productController.deleteProduct(req, res);
// });




// productRouter.get("/", (req, res) => {
//   productController.getAllProducts(req, res);
// });


export default productRouter;
