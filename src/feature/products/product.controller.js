import ProductRepository from "./product.repository.js";
import { ApplicationError } from "../../error-handler/applicationError.js";
import userRepository from "../user/user.repository.js";

export default class ProductController {
  constructor() {
    this.productRepository = new ProductRepository();
    this.UserRepository = new userRepository();
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
    try {
      const product = await this.productRepository.get(id);
      await product.updateOne({ $set: req.body });
      const updatedProduct = await this.productRepository.get(id);
      res.send({ data: updatedProduct, message: "updated successfully" });
      // res.status(200).json("product Updated");
    } catch (err) {
      console.log(err);
      return res.status(500).send("Something went wrong while deleting post");
    }
  }

  async getAllProducts(req, res) {
    try {
      const products = await this.productRepository.getAll();
      res.status(200).send(products);
    } catch (err) {
      console.log(err);
      return res.status(500).send("Something went wrong");
    }
  }

  async deleteProduct(req, res) {
    const id = req.params.id;
    try {
      const product = await this.productRepository.get(id);
      await this.productRepository.delete(product);
      res.status(200).json("Product deleted ");
    } catch (err) {
      console.log(err);
      return res.status(500).send("Something went wrong while deleting post");
    }
  }

  async addReview(req, res) {
    const productId = req.params.id;
    try {
      const { rating, comment } = req.body;
      const user_id = req.userID;
      const user = await this.UserRepository.findUser(user_id);
      
      const name = user.name;
      const review = {
        user,
        name,
        rating: Number(rating),
        comment,
      };
      if (!rating) {
        return res
          .status(404)
          .json({ success: false, message: "Rating can't be empty" });
      }
      const product = await this.productRepository.get(productId);
      
      if (!product) {
        return res
          .status(404)
          .json({ success: false, message: "Product not found" });
      }
      const findRevieweIndex = product.reviews.findIndex((rev) => {
        return rev.user.toString() === user_id.toString(); //checks user alrady revieved, if true return index, if false then return -1
      });
      console.log(findRevieweIndex);
      if (findRevieweIndex >= 0) {
        product.reviews.splice(findRevieweIndex, 1, review);
      } else {
        product.reviews.push(review);
        
      }
      await product.save();
      res
        .status(201)
        .json({ success: true, msg: "thx for rating the product", product });
    } catch (error) {
      console.log(error);
      return res.status(500).send("Something went wrong while adding review");
    }
  }

  async getProductDetails (req, res, next){
  try {
    const productDetails = await this.productRepository.get(
      req.params.id
    );
    if (productDetails) {
      res.status(200).json({ success: true, productDetails });
    } else {
      return res
        .status(404)
        .json({ success: true, msg: "cannot find the product" });
    }
  } catch (error) {
    console.log(error);
     throw new ApplicationError(
      "Something went wrong while adding newproduct",
      500
    );
  }
};

async deleteReview (req, res, next)  {
  try {
    const { productId, reviewId } = req.query;
    if (!productId || !reviewId) {
      return res
          .status(404)
          .json({ success: false, message: "productId and reviewId can't be empty" });
    }
    const product = await this.productRepository.get(productId);
    if (!product) {
      return res
          .status(404)
          .json({ success: false, message: "product not found" });
    }
    const reviews = product.reviews;

    const isReviewExistIndex = reviews.findIndex((rev) => {
      return rev._id.toString() === reviewId.toString();
    });
    if (isReviewExistIndex < 0) {
      return res
        .status(404)
        .json({ success: false, message: "review doesn't exist" });
    }

    const reviewToBeDeleted = reviews[isReviewExistIndex];
    reviews.splice(isReviewExistIndex, 1);

    await product.save();
    res.status(200).json({
      success: true,
      msg: "review deleted successfully",
      deletedReview: reviewToBeDeleted,
      product,
    });
  } catch (error) {
    return next(new ErrorHandler(500, error));
  }
}
}
