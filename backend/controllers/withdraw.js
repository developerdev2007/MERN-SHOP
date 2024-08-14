import express from "express";

import catchAsyncError from "../middleware/catchAsyncError.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import Withdraw from "../models/withdraw.js";
import { isSeller, isAuthenticated, isAdmin } from "../middleware/auth.js";
import sendMail from "../utils/sendMail.js";
import Shop from "../models/shop.js";

const router = express.Router();

//** create  with draw req..!!! only for seller  */
router.post(
  "/create-withdraw-request",
  isSeller,
  catchAsyncError(async (req, res, next) => {
    try {
      const { amount } = req.body;

      const data = {
        seller: req.seller,
        amount,
      };
      const withdraw = await Withdraw.create(data);
      try {
        await sendMail({
          email: req?.seller?.email,
          subject: "WithDraw Request has been successfully Created ",
          message: `Hello ${req.seller.name}, your Withdraw request of ${amount} $ is Processing , please wait for 3 days `,
        });
      } catch (error) {
        return next(new ErrorHandler(error.message, 500));
      }

      const shop = await Shop.findById(req.seller._id);

      shop.availBalance = shop.availBalance - amount;
      await shop.save();

      res.status(201).json({
        message: "Withdraw request has been successfully created",
        success: true,
        withdraw,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

////*** get all withdraw request  */
router.get(
  "/get-all-withdrawRequest",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncError(async (req, res, next) => {
    try {
      const withdraws = await Withdraw.find().sort({ createdAt: -1 });
      res.status(200).json({
        message: "WithDraw has been successfully created!!!",
        success: true,
        withdraws,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

///***update all withdraw request */

router.put(
  "/update-withdraw-request/:id",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncError(async (req, res, next) => {
    try {
      const { sellerId } = req.body;
      const withdraw = await Withdraw.findByIdAndUpdate(
        req.params.id,
        {
          status: "Succeed",
          updatedAt: Date.now(),
        },
        { new: true }
      );

      const seller = await Shop.findById(sellerId);

      const transaction = {
        _id: withdraw._id,
        amount: withdraw.amount,
        status: withdraw.status,
        updatedAt: withdraw.updatedAt,
      };

      seller.transactions = [...seller.transactions, transaction];

      await seller.save();
      await withdraw.save();

      try {
        await sendMail({
          email: seller.email,
          subject: "Payment Conformation  ",
          message: `Hello ${seller?.name}, Your withDraw request of ${withdraw.amount} is On the way Delivery time depends on your bank's rules it usually takes 3 to 7 days `,
        });
      } catch (error) {
        return next(new ErrorHandler(error.message, 500));
      }

      res.status(200).json({
        message: "",
        success: true,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);
export default router;
