const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  // productName: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Product",
  //   required: true,
  // },
  productID: { type: String },
  productQty: { type: Number, default: 1 },
});

module.exports = mongoose.model("Order", orderSchema);
