import connectToDB from "../utils/connection.js";
import createError from "../utils/error.js";
import bcrypt from "bcrypt";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

export const signUp = async (req, res, next) => {
  try {
    const { userName, email, phoneNumber, password } = req.body;

    if (!email || !password || !userName || !phoneNumber) {
      return next(createError(400, "Missing field"));
    }

    await connectToDB();

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const newUser = new User({ ...req.body, password: hash });

    await newUser.save();

    res.status(201).json("User created Successfully");
  } catch (error) {
    console.error("Registration Error:", error);
    return next(createError(400, error.message || "Internal Server Error"));
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    console.log(req.body);

    if (!email || !password) {
      return next(createError(400, "Missing field"));
    }

    await connectToDB();

    const user = await User.findOne({ email });
    if (!user) return next(createError(400, "Invalid credentials"));

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect)
      return next(createError(400, "Invalid credentials"));

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return res.status(201).json({
      message: "User Logged In",
      token: token,
      user: user,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserInfo = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.userId);

    if (!user) return next(createError(404, "User not found"));

    res.status(200).json({ message: "User found", user });
  } catch (error) {
    next(createError(400, error.message || "Error finding the user"));
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const userId = req?.user?.userId;
    const user = await User.findByIdAndUpdate(userId, req.body, {
      new: true,
    });

    if (!user) return next(createError(400, "user not found"));
    res.status(200).json({
      message: "User Updated Successfully",
      user,
    });
  } catch (error) {
    console.log("err", error);
    next(createError(400, `Updating User Failed: ${error}`));
  }
};
