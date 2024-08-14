import express from "express";
import Conversation from "../models/conversation.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import catchAsyncError from "../middleware/catchAsyncError.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

///! create a new conversation

router.post(
  "/create-new-conversation",
  catchAsyncError(async (req, res, next) => {
    try {
      const { groupTitle, userId, sellerId } = req.body;

      const isConversationExists = await Conversation.findOne({ groupTitle });

      if (isConversationExists) {
        res.status(201).json({
          message: "Conversation get successfully ",
          conversation: isConversationExists,
          success: true,
        });
      } else {
        const conversation = await Conversation.create({
          members: [userId, sellerId],
          groupTitle: groupTitle,
        });

        res.status(201).json({
          message: "Conversation created successfully ",
          conversation,
          success: true,
        });
      }
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

///! get all seller conversation

router.get(
  "/get-seller-conversation/:sellerId",
  catchAsyncError(async (req, res, next) => {
    try {
      const conversations = await Conversation.find({
        members: {
          $in: [req.params.sellerId],
        },
      }).sort({ updatedAt: -1, createdAt: -1 });

      res.status(200).json({
        message: "Conversation got successfully ",
        success: true,
        conversations,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);
///! get user conversation

router.get(
  "/get-user-conversation/:userId",
  isAuthenticated,
  catchAsyncError(async (req, res, next) => {
    try {
      const conversations = await Conversation.find({
        members: {
          $in: [req.params.userId],
        },
      }).sort({ updatedAt: -1, createdAt: -1 });

      res.status(200).json({
        message: "Conversation got successfully ",
        success: true,
        conversations,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

/// ! update the last conversation

router.put(
  "/update-last-message/:id",
  catchAsyncError(async (req, res, next) => {
    try {
      const { lastMessage, lastMessageId } = req.body;

      const conversation = await Conversation.findByIdAndUpdate(req.params.id, {
        lastMessage,
        lastMessageId,
      });

      res.status(200).json({
        message: "Updated successfully",
        conversation,
        success: true,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);
export default router;
