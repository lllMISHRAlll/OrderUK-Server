import mongoose, { Types } from "mongoose";

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, "Must Provide a User name"],
  },
  phoneNumber: {
    type: Number,
    required: [true, "Must Provide a Phone Number"],
  },
  email: {
    type: String,
    required: [true, "Must provide an email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Must provide a password"],
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
  },
  country: {
    type: String,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
