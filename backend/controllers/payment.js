import express from "express";
import Stripe from "stripe";
import catchAsyncError from "../middleware/catchAsyncError.js";
import ErrorHandler from "../utils/ErrorHandler.js";

const router = express.Router();

router.post(
  "/process",
  catchAsyncError(async (req, res, next) => {
    const stripe = Stripe(process.env.STRIPE_PRIVATE_KEY);
    try {
      // console.log(process.env.STRIPE_PRIVATE_KEY);
      // console.log(req.body);
      const payment = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: "inr",
        payment_method_types: ["card"],
        description: "Test payment",
        metadata: {
          company: "developerdev",
        },
      });
      console.log(payment);
      res.status(200).json({
        success: true,
        client_secret: payment.client_secret,
      });
    } catch (error) {
      console.log(error);
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

////////!!!

router.get(
  "/stripeapikey",
  catchAsyncError(async (req, res, next) => {
    try {
      res.status(200).json({
        stripeApiKey: process.env.STRIPE_API_KEY,
      });
    } catch (error) {
      console.log("error in payment.js: ", error);

      return next(new ErrorHandler(error.message, 500));
    }
  })
);

export default router;
