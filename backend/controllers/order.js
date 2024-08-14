import express from "express";
import ErrorHandler from "../utils/ErrorHandler.js";
import catchAsyncError from "../middleware/catchAsyncError.js";
import Order from "../models/order.js";
import { isAdmin, isAuthenticated, isSeller } from "../middleware/auth.js";
import Product from "../models/product.js";
import { Error } from "mongoose";
import Shop from "../models/shop.js";

const router = express.Router();

//!!!++++++++++ create new order
router.post(
  "/create-order",
  catchAsyncError(async (req, res, next) => {
    try {
      const { cart, shippingAddress, user, totalPrice, paymentInfo } = req.body;

      ///!!! group cart items according (by) to shopId

      const shopItemsMap = new Map();

      for (const item of cart) {
        const shopId = item.shopId;
        if (!shopItemsMap.has(shopId)) {
          shopItemsMap.set(shopId, []);
        }
        shopItemsMap.get(shopId).push(item);
      }

      ///**** Create an order for each shop */
      // !!!very important part of this series
      const orders = [];

      for (const [shopId, items] of shopItemsMap) {
        const order = await Order.create({
          cart: items,
          shippingAddress,
          user,
          totalPrice,
          paymentInfo,
        });
        orders.push(order);
      }
      res.status(201).json({
        success: true,
        message: "Orders has been successfully created",
        orders,
      });
    } catch (error) {
      console.log(error);
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

////!!!++++++++++ get all orders of user only
router.get(
  "/get-all-orders/:userId",
  catchAsyncError(async (req, res, next) => {
    try {
      const orders = await Order.find({ "user._id": req.params.userId }).sort({
        createAt: -1,
      });

      res.status(200).json({
        success: true,
        message: "orders has been successfully founded",
        orders,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

//////!!++++ + get all orders of users for shop

router.get(
  "/get-all-orders-seller/:sellerId",
  catchAsyncError(async (req, res, next) => {
    try {
      const orders = await Order.find({
        "cart.shopId": req.params.sellerId,
      }).sort({ createdAt: -1 });

      res.status(200).json({
        success: true,
        message: "orders has been successfully retrieved of shop",
        orders,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

//////!!++++ + update order status for shop

router.put(
  "/update-order-status/:id",
  isSeller,
  catchAsyncError(async (req, res, next) => {
    try {
      const order = await Order.findById(req.params.id);

      if (!order) {
        return next(new ErrorHandler("Order not found in records!", 400));
      }

      if (req.body.status === "Transferred to delivery partner") {
        order.cart.forEach(async (data) => {
          await updateOrder(data?._id, data?.qty);
        });
      }

      async function updateOrder(id, qty) {
        const product = await Product.findById(id);
        console.log(product);
        product.stock -= qty;
        product.sold_out += qty;
        await product.save({ validateBeforeSave: false });
      }

      async function updateSellerInfo(amount) {
        const seller = await Shop.findById(req.seller._id);
        seller.availBalance = amount;
        await seller.save();
      }
      order.status = req.body.status;

      if (req.body.status === "Delivered") {
        order.deliveredAt = Date.now();
        order.paymentInfo.status = "Succeeded";
        const serviceCharge = order.totalPrice * 0.1;
        await updateSellerInfo(order.totalPrice - serviceCharge);
      }

      await order.save({ validateBeforeSave: false });

      res.status(200).json({
        success: true,
        message: "Order has been successfully Updated",
        order,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);
///!!!!!give a refund to user
router.put(
  "/give-a-refund/:id",
  isAuthenticated,
  catchAsyncError(async (req, res, next) => {
    try {
      const order = await Order.findById(req.params.id);

      if (!order) {
        return next(new ErrorHandler("Order doesn't exist in database", 400));
      }

      order.status = req.body.status;

      await order.save({
        validateBeforeSave: false,
      });

      res.status(200).json({
        message: "refund request successfully",
        success: true,
        order,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

////////!!!******** accept the refund

router.put(
  "/order-refund-success/:id",
  isSeller,
  catchAsyncError(async (req, res, next) => {
    try {
      const order = await Order.findById(req.params.id);

      if (!order) {
        return next(new ErrorHandler("Order not Found with this id", 400));
      }

      order.status = req.body.status;

      if (req.body.status === "Refund Success") {
        order.cart.forEach(async (data) => {
          await updateOrder(data?._id, data?.qty);
        });
      }

      await order.save();

      res.status(200).json({
        message: "Refund accepted successfully",
        success: true,
        order,
      });

      async function updateOrder(id, qty) {
        const product = await Product.findById(id);
        console.log(product);
        product.stock += qty;
        product.sold_out -= qty;
        await product.save({ validateBeforeSave: false });
      }
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

///! all orders for admin
router.get(
  "/admin-all-orders",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncError(async (req, res, next) => {
    try {
      const orders = await Order.find().sort({
        createdAt: -1,
        deliveredAt: -1,
      });

      res.status(200).json({
        message: "Orders has been founded for admin",
        success: true,
        orders,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);
export default router;
