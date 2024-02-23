
import mongoose from "mongoose";

export const productSchema = new mongoose.Schema({
    name: String,
    quantity: Number,
});

const productModel = mongoose.model(
    "products",
    productSchema
  );
  
export default productModel;