import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    products: [
      {
        productId: String,
        name: String,
        image: String,
        quantity: Number,
        price: Number,
      },
    ],

    totalPrice: {
      type: Number,
      required: true,
    },

    address: {
      village: String,
      nearByLocation: String,
      city: String,
      district: String,
      state: String,
      pincode: String,
    },

    paymentMethod: {
      type: String,
      default: "COD",
    },

    orderStatus: {
      type: String,
      default: "Pending",
    },

    notes: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("order", orderSchema);