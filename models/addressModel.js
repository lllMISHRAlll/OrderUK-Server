import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  state: {
    type: String,
    required: [true, "Must Provide state"],
  },
  city: {
    type: String,
    required: [true, "Must Provide a city or district name"],
  },
  pinCode: {
    type: Number,
    required: [true, "Must provide a Pin Code"],
  },
  phoneNumber: {
    type: Number,
    required: [true, "Must provide a Phone Number"],
  },
  address: {
    type: String,
    required: [true, "please enter your address"],
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Must Provide userId"],
  },
});

const Address = mongoose.model("Address", addressSchema);

export default Address;
