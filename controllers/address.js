import connectToDB from "../utils/connection.js";
import createError from "../utils/error.js";
import Address from "../models/addressModel.js";
import mongoose from "mongoose";

export const getAllAddresses = async (req, res) => {
  try {
    const addresses = await Address.find({
      userId: req?.user?.userId,
    });
    console.log(req?.user?.userId, addresses);

    res.status(200).json(addresses);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch addresses", error });
  }
};

export const addAddress = async (req, res, next) => {
  try {
    const { state, city, pinCode, phoneNumber, address } = req.body;

    if (!state || !city || !pinCode || !phoneNumber || !address) {
      return next(createError(400, "Missing required fields"));
    }

    await connectToDB();
    const newAddress = new Address({
      state,
      city,
      pinCode,
      phoneNumber,
      address,
      userId: req?.user?.userId,
    });

    await newAddress.save();
    res
      .status(201)
      .json({ message: "Address added successfully", data: newAddress });
  } catch (error) {
    console.error("Add Address Error:", error);
    return next(createError(500, "Internal Server Error"));
  }
};

export const editAddress = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedAddress = await Address.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedAddress) return next(createError(404, "Address not found"));

    res
      .status(200)
      .json({ message: "Address updated successfully", updatedAddress });
  } catch (error) {
    next(createError(400, error.message || "Error updating address"));
  }
};

export const deleteAddress = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedAddress = await Address.findByIdAndDelete(id);

    if (!deletedAddress) return next(createError(404, "Address not found"));

    res.status(200).json({ message: "Address deleted successfully" });
  } catch (error) {
    next(createError(400, error.message || "Error deleting address"));
  }
};
