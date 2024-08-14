import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please  enter  your Event productname "],
  },

  description: {
    type: String,
    required: [true, "Please  enter your Event product description "],
  },
  start_date: {
    type: Date,
    required: true,
  },
  finish_date: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    default: "Running",
  },
  category: {
    type: String,
    required: [true, "Please  enter your Event product category "],
  },

  tags: {
    type: String,
    // required: [true, "Please  enter your product tags "],
  },

  originalPrice: {
    type: Number,
    // required: [true, "Please  enter your product original price "],
  },
  discountPrice: {
    type: Number,
    required: [true, "Please  enter your product discount price(Price only) "],
  },
  stock: {
    type: Number,
    required: [true, "Please  enter your Event product stock "],
  },
  images: [
    {
      type: String,
      // required: [true, "Please  enter your product stock "],
    },
  ],
  shopId: {
    type: String,
    required: [true],
  },
  shop: {
    type: Object,
    required: true,
  },
  sold_out: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Event = mongoose.model("Event", eventSchema);
export default Event;
