import ProductRepository from "./product.repository.js";
import productModel from "./product.schema.js";

export default class ProductController {
  constructor() {
    this.productRepository = new ProductRepository();
  }

  async addproduct(req, res) {
    try {
      const { name, quantity} = req.body;
      const addedBy=req.userID;
      const newProduct = {
        name,
        quantity,
        addedBy
    }
      const createdProduct = await this.productRepository.add(newProduct);
      res.status(201).send(createdProduct);
    } catch (err) {
      console.log(err);
      return res.status(200).send("Something went wrong");
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

  async updateProduct(req,res){
    const id = req.params.id;
    const userID = req.userID; //requesting directly from token
    try {

        const product = await this.productRepository.get(id);
        if (product.addedBy == userID) {
            // const updated = await product.updateOne({ $set: req.body});
            console.log(product);
            res.status(200).send({ data:product, message: "updated successfully" });
      } else {
        res.status(403).json("Action forbidden");
      }
    }  catch (err) {
      console.log(err);
      return res.status(200).send("Something went wrong while deleting post");
    }
  }
}
