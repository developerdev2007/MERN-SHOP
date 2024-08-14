import express from "express";
import Message from "../models/message.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import catchAsyncError from "../middleware/catchAsyncError.js";
import upload from "../multer.js";
import path from "path";

const router = express.Router();

///! create a new conversation

router.post(
  "/create-new-message",
  upload.single("image"),
  catchAsyncError(async (req, res, next) => {
    try {
      const messageData = req.body;
      if (req.file) {
        const filename = req.file.filename;
        const fileUrl = path.join(filename);

        // const imageUrls = files.map((file) => {
        //   file.filename;
        // });
        // messageData.image = imageUrls;

        messageData.image = fileUrl;
      }
      messageData.sender = req.body.sender;
      messageData.conversationId = req.body.conversationId;
      messageData.text = req.body.text;
      const message = await Message.create({
        sender: messageData.sender,
        conversationId: messageData.conversationId,
        image: messageData.image ? messageData.image : undefined,
        text: messageData.text,
      });

      res.status(201).json({
        msg: "message has been successfully created",
        message,
        success: true,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

//////! _  get All messages with converSATION Id
router.get(
  "/get-all-messages/:id",
  catchAsyncError(async (req, res, next) => {
    try {
      const messages = await Message.find({
        conversationId: req.params.id,
      });

      res.status(200).json({
        msg: "messages get successfully ",
        messages,
        success: true,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

export default router;
