const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    permanentAddress: {
      fullName: String,
      email: String,
      phone: String,
      address: String,
      city: String,
      state: String,
      zipCode: String,
      country: { type: String, default: "India" },
    },
    shippingAddress: {
      fullName: String,
      phone: String,
      address: String,
      city: String,
      state: String,
      zipCode: String,
      country: { type: String, default: "India" },
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    paymentStatus: { type: String, default: 'Pending' },
    paymentId: { type: String  ,default: "null"},
    status: { type: String, default: 'Pending' },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
