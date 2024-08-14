import express from "express";
import catchAsyncError from "../middleware/catchAsyncError.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import { isSeller } from "../middleware/auth.js";
import CouponCode from "../models/couponCode.js";
import { ObjectId } from "mongoose";

const router = express.Router();

router.post(
  "/create-coupon-code",
  isSeller,
  catchAsyncError(async (req, res, next) => {
    try {
      const isCouponCode = await CouponCode.find({ name: req.body.name });

      if (isCouponCode.length !== 0) {
        return next(new ErrorHandler("Coupon code Already Exists ", 400));
      }

      const couponCode = await CouponCode.create(req.body);
      console.log(req.body);
      res.status(201).json({ success: true, couponCode });
    } catch (error) {
      return next(new ErrorHandler(error, 500));
    }
  })
);

///! *** get all coupons of a shop

router.get(
  "/get-coupon/:id",
  isSeller,
  catchAsyncError(async (req, res, next) => {
    try {
      console.log(req.params.id);
      const couponCodes = await CouponCode.find({
        "shop._id": req.params.id,
      });
      console.log(couponCodes);

      res.status(200).json({
        success: true,
        couponCodes,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 500));
    }
  })
);

////**!! delete coupon code of a shop */

router.delete(
  "/delete-coupon/:id",
  isSeller,
  catchAsyncError(async (req, res, next) => {
    try {
      const couponCode = await CouponCode.findByIdAndDelete({
        _id: req.params.id,
      });

      // if (!couponCode) {
      //   return next(new ErrorHandler("coupon Code not found", 400));
      // }

      res.status(200).json({
        success: true,
        message: "Coupon Code deleted successfully",
      });
    } catch (error) {
      return next(new ErrorHandler(error.response.data.message, 500));
      console.log(EvalError);
    }
  })
);

////! **** get coupon code value by its name

router.get(
  "/get-coupon-value/:name",
  catchAsyncError(async (req, res, next) => {
    try {
      const couponCode = await CouponCode.findOne({ name: req.params.name });

      res.status(200).json({
        success: true,
        couponCode,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

export default router;
