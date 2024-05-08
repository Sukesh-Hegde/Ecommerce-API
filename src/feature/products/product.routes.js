import express from "express";

import ProductController from "./product.controller.js";
import { authByUserRole } from "../../conflig/auth.js";
import jwtAuth from "../../conflig/jwtmiddleware.js";

const productRouter = express.Router();

const productController = new ProductController();

// POST Routes(ADMINS ONLY)


productRouter.post("/add",jwtAuth, authByUserRole, (req, res, next) => {
  productController.addNewProduct(req, res, next);
});

productRouter.put("/update/:id", jwtAuth, authByUserRole, (req, res, next) => {
  productController.updateProduct(req, res, next);
});

productRouter.delete("/:id", jwtAuth, authByUserRole, (req, res) => {
  productController.deleteProduct(req, res);
});


//get
productRouter.get("/",jwtAuth,(req, res) => {
  productController.getAllProducts(req, res);
});

productRouter.get("/details/:id", jwtAuth, (req, res) => {
  productController.getProductDetails(req, res);
});

productRouter.post("/addReview/:id", jwtAuth, (req, res) => {
  productController.addReview(req, res);
});

productRouter.delete("/review/delete", jwtAuth, (req, res) => {
  productController.deleteReview(req, res);
});

productRouter.get("/reviews/:id", jwtAuth, (req, res) => {
  productController.getAllReviewsOfAProduct(req, res);
});




export default productRouter;
