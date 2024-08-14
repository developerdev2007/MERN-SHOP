import express from "express";
import fs from "fs";
import upload from "../multer.js";
import catchAsyncError from "../middleware/catchAsyncError.js";
import Shop from "../models/shop.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import Event from "../models/event.js";
import { isAdmin, isAuthenticated, isSeller } from "../middleware/auth.js";

const router = express.Router();

router.post(
  "/create-event",
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

        const eventData = req.body;
        eventData.images = imageURLs;
        eventData.shop = shop;

        const event = await Event.create(eventData);

        res.status(201).json({ success: true, event });
      }
    } catch (error) {
      next(new ErrorHandler(error.message, 500));
    }
  })
);

////*******get all events of a user*********

router.get(
  "/get-all-events-shop/:id",
  catchAsyncError(async (req, res, next) => {
    try {
      const events = await Event.find({ shopId: req.params.id });
      res.status(201).json({
        success: true,
        events,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

///***get all events of a shop */

router.get("/get-all-events", async (req, res, next) => {
  try {
    const events = await Event.find();

    res.status(200).json({
      success: true,
      message: "All Events are founded",
      events,
    });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});

///***delete Event of  */

router.delete(
  "/delete-shop-event/:id",
  catchAsyncError(async (req, res, next) => {
    try {
      // console.log("hello");
      const eventId = req.params.id;
      // console.log(eventId);
      const eventData = await Event.findById(eventId);
      console.log(eventData);

      eventData.images.forEach((imgURL) => {
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
      const event = await Event.findByIdAndDelete(eventId);
      if (!event) {
        return next(new ErrorHandler("Event not found with this id ", 404));
      }
      res.status(200).json({
        success: true,
        // event,
        message: "Event deleted successfully",
      });
    } catch (error) {
      console.log(error);

      return next(new ErrorHandler(error, 400));
    }
  })
);

//! get all Admin Events
router.get(
  "/all-events-admin",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncError(async (req, res, next) => {
    try {
      const events = await Event.find().sort({ createdAt: -1 });

      res.status(200).json({
        message: "Events  has been finded successfully for admin! ",
        success: true,
        events,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);
export default router;
