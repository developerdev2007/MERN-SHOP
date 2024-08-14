import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please  enter your productname "],
  },

  description: {
    type: String,
    required: [true, "Please  enter your product description "],
  },
  category: {
    type: String,
    required: [true, "Please  enter your product category "],
  },
  reviews: [
    {
      user: {
        type: Object,
      },
      rating: { type: Number },

      comment: {
        type: String,
      },
      productId: {
        type: String,
      },
      createdAt: {
        type: Date,
        default: Date.now(),
      },
    },
  ],
  ratings: { type: Number },
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
    required: [true, "Please  enter your product stock "],
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

const Product = mongoose.model("Product", productSchema);
export default Product;
