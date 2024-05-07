import ProductRepository from "./product.repository.js";
import { ApplicationError } from "../../error-handler/applicationError.js";

export default class ProductController {
  constructor() {
    this.productRepository = new ProductRepository();
  }

  async addNewProduct(req, res, next) {
    try {
      const product = await this.productRepository.addNewProductRepo({
        ...req.body,
        createdBy: req.userID,
      });
      if (product) {
        res.status(201).json({ success: true, product });
      } else {
        throw new ApplicationError(
          "Something went wrong while adding newproduct",
          500
        );
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send("Something went wrong");
    }
  }

  async updateProduct(req, res) {
    const id = req.params.id;
    const userID = req.userID; //requesting directly from token
    try {
      const product = await this.productRepository.get(id);
      if (product.createdBy == userID) {
        await product.updateOne({ $set: req.body });
        const updatedProduct = await this.productRepository.get(id);
        res.send({ data: updatedProduct, message: "updated successfully" });
        // res.status(200).json("product Updated");
      } else {
        res.status(403).json("Action forbidden");
      }
    } catch (err) {
      console.log(err);
      return res.status(200).send("Something went wrong while deleting post");
    }
  }

  async getAllProducts(req, res) {
    try {
      const products = await this.productRepository.getAll();
      res.status(200).send(products);
    } catch (err) {
      console.log(err);
      return res.status(200).send("Something went wrong");
    }
  }

  async deleteProduct(req, res) {
    const id = req.params.id;
    const userID = req.userID; //requesting directly from token
    try {
      const product = await this.productRepository.get(id);
      if (product.addedBy == userID) {
        await this.productRepository.delete(product);
        res.status(200).json("Product deleted ");
      } else {
        res.status(403).json("Action forbidden");
      }
    } catch (err) {
      console.log(err);
      return res.status(200).send("Something went wrong while deleting post");
    }
  }
}
