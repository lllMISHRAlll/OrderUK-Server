import connectToDB from "../utils/connection.js";
import createError from "../utils/error.js";
import Product from "../models/productModel.js";

export const addproduct = async (req, res, next) => {
  try {
    const {
      productName,
      productDescription,
      productPrice,
      restaurant,
      category,
    } = req.body;

    if (
      !productName ||
      !productDescription ||
      !productPrice ||
      !restaurant ||
      !category
    ) {
      return next(createError(400, "Missing Field"));
    }

    if (!productPrice || productPrice <= 0) {
      return next(createError(400, "Invalid product price"));
    }

    await connectToDB();

    const newProduct = new Product({
      productName,
      productDescription,
      productPrice,
      restaurant,
      category,
    });

    await newProduct.save();
    res.status(201).json("Product created Successfully");
  } catch (error) {
    console.error("Product Creation Error:", error);
    return next(createError(500, error.message || "Internal Server Error"));
  }
};
