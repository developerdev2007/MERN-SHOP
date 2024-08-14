import express from "express";
import path from "path";
import upload from "../multer.js";
import User from "../models/user.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import fs from "fs";
import jwt from "jsonwebtoken";
import sendMail from "../utils/sendMail.js";
import catchAsyncError from "../middleware/catchAsyncError.js";
import { sendToken } from "../utils/jwtToken.js";
import { isAdmin, isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.post("/create-user", upload.single("file"), async (req, res, next) => {
  try {
    // console.log("first");
    const { name, email, password } = req.body;
    const userEmail = await User.findOne({ email });

    if (userEmail) {
      const filename = req.file.filename;
      const filePath = `uploads/${filename}`;
      fs.unlink(filePath, (err) => {
        if (err) {
          console.log(err);
          res.status(500).json({ message: "Error in deleting file" });
        }
      });
      return next(new ErrorHandler("User Already Exists", 400));
    }

    const filename = req.file.filename;
    const fileURL = path.join(filename);

    const user = {
      name: name,
      email: email,
      password: password,
      avatar: fileURL,
    };

    const activationToken = createActivationToken(user);
    const activationURL = `http://localhost:3000/activation/${activationToken}`;
    try {
      await sendMail({
        email: user.email,
        subject: "Account Activation",
        message: `HELLO ${user.name} Please use the following link to activate your account ${activationURL}`,
      });
      res.status(201).json({
        success: true,
        message: `please check your Email Id ${user.email} to activate your account `,
      });
    } catch (error) {
      console.log("email error", error);
      return next(new ErrorHandler(err.message, 500));
    }
  } catch (error) {
    console.log(error.message);
    console.log("creating user error", error);
  }
});
///********* Create Activation activationToken */

const createActivationToken = (user) => {
  return jwt.sign(user, process.env.ACTIVATION_SECRET, { expiresIn: "5m" });
};
////*** Login User */

router.post(
  "/login",
  catchAsyncError(async (req, res, next) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return next(new ErrorHandler("Please provides All fields!!", 400));
      }

      const user = await User.findOne({ email }).select("+password");

      if (!user) {
        return next(new ErrorHandler("User Doesn't Exists!!", 400));
      }

      const isPasswordValid = await user.comparePassword(password);

      if (!isPasswordValid) {
        return next(new ErrorHandler("Password is Incorrect!!", 400));
      }

      sendToken(user, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);
////****Active User */

router.post(
  "/activation",
  catchAsyncError(async (req, res, next) => {
    try {
      const { activation_token } = req.body;
      const newUser = jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET
      );
      if (!newUser) {
        return next(new ErrorHandler("Invalid Token", 400));
      }

      const { name, email, password, avatar } = newUser;
      let user = await User.findOne({ email });
      if (user) {
        return next(new ErrorHandler("User Already exists", 400));
      }
      user = await User.create({
        name,
        email,
        avatar,
        password,
      });
      sendToken(user, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

////!***  Load users***/
router.get(
  "/getuser",
  isAuthenticated,
  catchAsyncError(async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id);

      if (!user) {
        return next(new ErrorHandler("User Doesn't exists!", 400));
      }

      res.status(200).json({ user, success: true });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

///*** Log OUt  */
router.get(
  "/logout",
  isAuthenticated,
  catchAsyncError(async (req, res, next) => {
    try {
      res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
      });

      res.status(201).json({
        success: true,
        message: "Logout Successfully",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

router.put(
  "/update-user-info",
  isAuthenticated,
  catchAsyncError(async (req, res, next) => {
    try {
      const { email, password, phoneNumber, name } = req.body;

      const user = await User.findOne({ email }).select("+password");

      if (!user) {
        return next(new ErrorHandler("user Not Found", 400));
      } else {
        const isPasswordValid = await user.comparePassword(password);

        if (!isPasswordValid) {
          return next(new ErrorHandler("Please provide correct password", 400));
        }

        user.name = name;
        user.email = email;
        user.phoneNumber = phoneNumber;

        await user.save();

        res.status(201).json({
          message: "user updated successfully",
          success: true,
          user,
        });
      }
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

/// ! ----------update user avatar

router.put(
  "/update-avatar",
  isAuthenticated,
  upload.single("image"),
  catchAsyncError(async (req, res, next) => {
    try {
      const existUser = await User.findById(req.user._id);

      const existsAvatarPath = `uploads/${existUser.avatar}`;

      fs.unlinkSync(existsAvatarPath, (err) => {
        if (err) console.error(err);
      });

      const fileUrl = path.join(req.file.filename);

      const user = await User.findByIdAndUpdate(req.user._id, {
        avatar: fileUrl,
      });

      res.status(201).json({
        success: true,
        message: "avatar updated successfully",
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

////!!!---------- address (update) adding of user

router.put(
  "/update-addresses",
  isAuthenticated,
  catchAsyncError(async (req, res, next) => {
    try {
      const user = await User.findById(req.user._id);

      const sameTypeAddress = user.addresses.find(
        (address) => address.addressType === req.body.addressType
      );

      if (sameTypeAddress) {
        return next(
          new ErrorHandler(
            `${req.body.addressType} type of Address is Already Present`,
            400
          )
        );
      }

      const existAddress = user.addresses.find(
        (address) => address._id === req.body._id
      );

      if (existAddress) {
        Object.assign(existAddress, req.body);
      } else {
        ///!! add the new address to the array
        user.addresses.push(req.body);
      }

      await user.save();

      res.status(200).json({
        success: true,
        message: "address updated successfully",
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 500));
    }
  })
);

//////!!---------- delete address of user

router.delete(
  "/delete-user-address/:id",
  isAuthenticated,
  catchAsyncError(async (req, res, next) => {
    try {
      const userId = req.user._id;

      const addressId = req.params.id;

      console.log(addressId);

      await User.updateOne(
        { _id: userId },
        {
          $pull: {
            addresses: { _id: addressId },
          },
        }
      );

      const user = await User.findById(userId);

      res.status(200).json({
        success: true,
        message: "Address Deleted successfully",
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

////// !! +++++++++++ update password of a user

router.put(
  "/update-user-password",
  isAuthenticated,
  catchAsyncError(async (req, res, next) => {
    try {
      const user = await User.findById(req.user._id).select("+password");

      // console.log(user);

      const isPasswordCorrect = await user.comparePassword(
        req.body.oldPassword
      );

      if (!isPasswordCorrect) {
        return next(new ErrorHandler("Password is InCorrect", 400));
      }

      if (req.body.newPassword !== req.body.confirmPassword) {
        return next(
          new ErrorHandler("Password is not matched with confirm Password", 400)
        );
      }

      user.password = req.body.newPassword;

      await user.save();

      res.status(200).json({
        success: true,
        message: "password is created successfully",
        user,
      });
    } catch (error) {
      console.log(error);
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

///!! ------------- find user info with userId for socketio

router.get(
  "/user-info/:id",
  catchAsyncError(async (req, res, next) => {
    try {
      const user = await User.findById(req.params.id);

      res.status(200).json({
        message: "User has been get successfully",
        user,
        success: true,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

///! users for admin
router.get(
  "/admin-all-users",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncError(async (req, res, next) => {
    try {
      const users = await User.find().sort({
        createdAt: -1,
      });

      res.status(201).json({
        message: "users has been founded for admin",
        success: true,
        users,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

////! delete user from admmin age

router.delete(
  "/delete-user/:id",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncError(async (req, res, next) => {
    try {
      const user = await User.findById(req.params.id);

      if (!user) {
        return next(new ErrorHandler("User not found ", 400));
      }
      await User.findByIdAndDelete(user._id);

      res.status(200).json({
        message: "User has been deleted successfully",
        success: true,
      });
    } catch (error) {
      return next(new ErrorHandler(err.message, 500));
    }
  })
);
export default router;
