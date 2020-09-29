const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  productID: { type: String, required: true },
  productName: { type: String, required: true },
  productPrice: { type: Number, required: true },
  productQty: { type: Number, required: true },
});

module.exports = mongoose.model("Product", productSchema);
