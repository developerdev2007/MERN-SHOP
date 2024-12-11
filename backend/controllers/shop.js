import express from "express";
import Shop from "../models/shop.js";
import path from "path";
import sendMail from "../utils/sendMail.js";
import jwt from "jsonwebtoken";
import { sendToken } from "../utils/jwtToken.js";
import { isAdmin, isAuthenticated, isSeller } from "../middleware/auth.js";
import fs from "fs";
import upload from "../multer.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import catchAsyncError from "../middleware/catchAsyncError.js";
import { sendShopToken } from "../utils/shopToken.js";

const router = express.Router();

///! create-seller
router.post("/create-seller", upload.single("file"), async (req, res, next) => {
  try {
    const { email } = req.body;

    const sellerEmail = await Shop.findOne({ email });

    if (sellerEmail) {
      const filename = req.file.filename;
      const filePath = `uploads/${filename}`;
      fs.unlink(filePath, (err) => {
        if (err) {
          console.log(err);
          res.status(500).json({ message: "Error in deleting file" });
        }
      });
      return next(new ErrorHandler("Seller Already Exists", 400));
    }

    const filename = req.file.filename;
    const fileURL = path.join(filename);

    const seller = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      address: req.body.address,
      phoneNumber: req.body.phoneNumber,
      zipCode: req.body.zipCode,
      avatar: fileURL,
    };

    const activationToken = createActivationToken(seller);

    const activationURL = `${process.env.FRONTEND_API}/seller/activation/${activationToken}`;

    try {
      await sendMail({
        email: seller.email,
        subject: "Activate Your Account",
        message: `Hello  ${seller.name} please click on link to activate your shop account ${activationURL}`,
      });
      res.status(201).json({
        success: true,
        message: `Please check your  email ${seller.email} for verification and activation`,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

const createActivationToken = (seller) => {
  return jwt.sign(seller, process.env.ACTIVATION_SECRET, {
    expiresIn: "5m",
  });
};

router.post(
  "/activation",
  catchAsyncError(async (req, res, next) => {
    try {
      const { activation_token } = req.body;

      const newSeller = jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET
      );

      if (!newSeller) {
        return next(new ErrorHandler("Invalid Token", 400));
      }
      const { email, password, avatar, name, zipCode, address, phoneNumber } =
        newSeller;

      let seller = await Shop.findOne({ email });

      if (seller) {
        return next(new ErrorHandler("Seller Already exists!!", 400));
      }

      seller = await Shop.create({
        email,
        password,
        avatar,
        name,
        zipCode,
        address,
        phoneNumber,
      });

      sendShopToken(seller, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

/// log in shop
////*** Login Seller */

router.post(
  "/login-shop",
  catchAsyncError(async (req, res, next) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return next(new ErrorHandler("Please provides All fields!!", 400));
      }

      const seller = await Shop.findOne({ email }).select("+password");

      if (!seller) {
        return next(new ErrorHandler("seller Doesn't Exists!!", 400));
      }

      const isPasswordValid = await seller.comparePassword(password);

      if (!isPasswordValid) {
        return next(new ErrorHandler("Password is Incorrect!!", 400));
      }

      sendShopToken(seller, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

router.get(
  "/getseller",
  isSeller,
  catchAsyncError(async (req, res, next) => {
    try {
      const seller = await Shop.findById(req.seller.id);

      if (!seller) {
        return next(new ErrorHandler("Seller Doesn't exists!", 400));
      }

      res.status(200).json({ seller, success: true });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

////********Logout Shop */
router.get(
  "/logout",
  isSeller,
  catchAsyncError(async (req, res, next) => {
    try {
      res.cookie("seller_token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
      });

      res.status(201).json({
        success: true,
        message: "Shop Logout Successfully",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

//*** get shop info  */

router.get(
  "/get-shop-info/:id",
  catchAsyncError(async (req, res, next) => {
    try {
      const shop = await Shop.findById(req.params.id);

      res.status(200).json({
        success: true,
        shop,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 500));
    }
  })
);

/////  ! update shop of user
router.put(
  "/update-shop-avatar",
  isSeller,
  upload.single("image"),
  catchAsyncError(async (req, res, next) => {
    try {
      const shop = await Shop.findById(req.seller._id);

      const existsAvatar = `uploads/${shop.avatar}`;
      fs.unlinkSync(existsAvatar);
      const fileUrl = path.join(req.file.filename);

      const seller = await Shop.findByIdAndUpdate(req.seller._id, {
        avatar: fileUrl,
      });

      res.status(200).json({
        message: "Avatar Uploaded successfully",
        success: true,
        seller,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

////////////update shop details
router.put(
  "/update-shop-info",
  isSeller,
  catchAsyncError(async (req, res, next) => {
    try {
      const { address, description, phoneNumber, name, zipCode } = req.body;

      const shop = await Shop.findById(req.seller._id);

      if (!shop) {
        return next(new ErrorHandler("shop Not Found", 400));
      } else {
        shop.name = name;
        shop.description = description;
        shop.phoneNumber = phoneNumber;
        shop.address = address;
        shop.zipCode = zipCode;

        await shop.save();

        res.status(201).json({
          message: "shop updated successfully",
          success: true,
          shop,
        });
      }
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

///! seller for admin
router.get(
  "/admin-all-sellers",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncError(async (req, res, next) => {
    try {
      const sellers = await Shop.find().sort({
        createdAt: -1,
      });

      res.status(200).json({
        message: "Sellers has been founded for admin",
        success: true,
        sellers,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

////! delete Seller from admin age

router.delete(
  "/delete-shop/:id",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncError(async (req, res, next) => {
    try {
      const shop = await Shop.findById(req.params.id);

      if (!shop) {
        return next(new ErrorHandler("Shop not found ", 400));
      }
      await Shop.findByIdAndDelete(shop._id);

      res.status(200).json({
        message: "Shop has been deleted successfully",
        success: true,
      });
    } catch (error) {
      return next(new ErrorHandler(err.message, 500));
    }
  })
);

///!!! update Seller Withdraw methods

router.put(
  "/update-withdraw-methods",
  isSeller,
  catchAsyncError(async (req, res, next) => {
    try {
      const { withdrawMethod } = req.body;
      // console.log(withdrawMethod);
      const seller = await Shop.findByIdAndUpdate(req.seller._id, {
        withdrawMethod,
      });

      if (!seller) {
        return next(new ErrorHandler("Seller not found", 404));
      }
      res.status(200).json({
        message: "Withdraw Updated Successfully ",
        success: true,
        seller,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

//!! delete  Seller Withdraw methods

router.delete(
  "/delete-withdraw-method",
  isSeller,
  catchAsyncError(async (req, res, next) => {
    try {
      const seller = await Shop.findById(req.seller._id);

      if (!seller) {
        return next(new ErrorHandler("Seller not found", 404));
      }
      seller.withdrawMethod = null;
      await seller.save();
      res.status(200).json({
        message: "withdrawMethod deleted successfully",
        success: true,
        seller,
      });
    } catch (error) {
      return next(new ErrorHandler(err.message, 500));
    }
  })
);
export default router;
