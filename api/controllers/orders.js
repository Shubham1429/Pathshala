const mongoose = require("mongoose");
const Order = require("../models/order");

exports.orders_get_all = (req, res, next) => {
  Order.find()
    .select("productID productQty _id")
    .populate("productName", "name")
    .exec()
    .then((docs) => {
      res.status(200).json({
        count: docs.length,
        orders: docs.map((doc) => {
          return {
            _id: doc._id,
            productID: doc.productID,
            productQty: doc.productQty,
          };
        }),
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.orders_create_order = (req, res, next) => {
  const order = new Order({
    _id: mongoose.Types.ObjectId(),
    productQty: req.body.productQty,
    productID: req.body.productID,
  });
  return (
    order
      .save()
      //     //  })
      .then((result) => {
        res.status(201).json({
          message: "Order stored",
          createdOrder: {
            _id: result._id,
            product: result.productID,
            quantity: result.productQty,
          },
        });
      })

      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: err,
        });
      })
  );
};
