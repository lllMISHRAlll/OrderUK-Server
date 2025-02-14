import mongoose, { Types } from "mongoose";

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: [true, "Must Provide a product  name"],
  },
  productDescription: {
    type: String,
    required: [true, "Must Provide a Product Description"],
  },
  productPrice: {
    type: Number,
    required: [true, "Must provide a Product Price"],
  },
  restaurant: {
    type: String,
    required: [true, "Must provide a restaurant name"],
  },
  category: {
    type: String,
    required: [true, "Must provide a category"],
  },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
