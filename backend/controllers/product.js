import express from "express";
import Product from "../models/product.js";
import Shop from "../models/shop.js";
import upload from "../multer.js";
import fs from "fs";
import catchAsyncError from "../middleware/catchAsyncError.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import { isAdmin, isAuthenticated, isSeller } from "../middleware/auth.js";
import Order from "../models/order.js";

const router = express.Router();

router.post(
  "/create-product",
  upload.array("images"),
  catchAsyncError(async (req, res, next) => {
    try {
      const shopId = req.body.shopId;
      const shop = await Shop.findById(shopId);

      if (!shop) {
        return next(new ErrorHandler("Shop id is inValid ", 400));
      } else {
        const files = req.files;
        const imageURLs = files.map((file) => `${file.filename}`);

        const productData = req.body;
        productData.images = imageURLs;
        productData.shop = shop;

        const product = await Product.create(productData);

        res.status(201).json({ success: true, product });
      }
    } catch (error) {
      next(new ErrorHandler(error.message, 500));
    }
  })
);

////*******get all products of a user*********

router.get(
  "/get-all-products-shop/:id",
  catchAsyncError(async (req, res, next) => {
    try {
      const products = await Product.find({ shopId: req.params.id });
      res.status(201).json({
        success: true,
        products,
      });
    } catch (error) {}
  })
);

///***delete product of  */

router.delete(
  "/delete-shop-product/:id",
  isSeller,
  catchAsyncError(async (req, res, next) => {
    try {
      // console.log("hello");
      const productId = req.params.id;
      console.log(productId);

      const productData = await Product.findById(productId);
      console.log(productData);

      productData.images.forEach((imgURL) => {
        const filename = imgURL;
        const filePath = `uploads/${filename}`;
        fs.unlink(filePath, (err) => {
          if (err) {
            console.log(err);
            res.status(500).json({ message: "Error in deleting file" });
          } else {
            console.log("File deleted successfully");
            res.status(200).json({ message: "File deleted successfully" });
          }
        });
      });

      const product = await Product.findByIdAndDelete(productId);
      console.log(product);
      if (!product) {
        return next(new ErrorHandler("Product not found with this id ", 404));
      }
      res.status(200).json({
        success: true,
        // product,
        message: "Product deleted successfully",
      });
    } catch (error) {
      console.log(error);

      return next(new ErrorHandler(error, 400));
    }
  })
);

//** get all products */

router.get(
  "/get-all-products",
  catchAsyncError(async (req, res, next) => {
    try {
      const products = await Product.find().sort({ createdAt: -1 });

      res.status(201).json({
        success: true,
        products,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

///**review  of a product  */
router.put(
  "/create-new-review",
  isAuthenticated,
  catchAsyncError(async (req, res, next) => {
    try {
      const { user, rating, productId, comment, orderId } = req.body;

      // console.log({ user, rating, comment, productId });
      const product = await Product.findById(productId);

      if (!product) {
        return next(new ErrorHandler("Product not found", 404));
      }

      // Initialize reviews and ratings if they don't exist
      if (!product.reviews) {
        product.reviews = [];
      }
      if (!product.ratings) {
        product.ratings = 0;
      }

      const isReviewed = product?.reviews.find(
        (rev) => rev.user._id === req.user._id
      );

      if (isReviewed) {
        product.reviews.forEach((rev) => {
          if (rev.user.toString() === req.user._id.toString()) {
            (rev.rating = rating),
              (rev.comment = comment),
              (rev.user = user),
              (rev.productId = product._id);
          }
        });
      } else {
        const review = {
          user: req.user,
          productId,
          comment,
          rating,
        };
        product.reviews.push(review);
      }

      let avg = 0;
      product.reviews.forEach((rev) => {
        avg += rev.rating;
      });

      product.ratings = avg / product?.reviews.length;

      await product.save({
        validateBeforeSave: false,
      });

      await Order.findByIdAndUpdate(
        orderId,
        {
          $set: { "cart.$[elem].isReviewed": true },
        },
        { arrayFilters: [{ "elem._id": productId }], new: true }
      );

      res.status(200).json({
        success: true,
        message: "Review added successfully",
        product,
      });
    } catch (error) {
      console.log(error);
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

//!! **  get all products all of admin */

router.get(
  "/all-products-admin",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncError(async (req, res, next) => {
    try {
      const products = await Product.find().sort({ createdAt: -1 });

      res.status(200).json({
        message: "Products has been finded successfully for admin! ",
        success: true,
        products,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);
export default router;
