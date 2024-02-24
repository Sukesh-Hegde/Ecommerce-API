import productModel from "./product.schema.js";
import { ApplicationError } from "../../error-handler/applicationError.js";

export default class ProductRepository {
  async add(productData) {

    try {
      // 1. Adding Product
      const newProduct = new productModel(productData);
      return await newProduct.save();
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }

  async getAll() {
    try {
      return await productModel.find();
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }

  async get(id) {
    try {
      return await productModel.findById(id);
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }
  async delete(post) {
    try {
      return await post.deleteOne();
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }
}
