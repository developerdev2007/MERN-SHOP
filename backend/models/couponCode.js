import mongoose from "mongoose";

const couponCodeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please  enter  your CouponCode Name "],
    unique: true,
  },

  value: {
    type: Number,
    required: true,
  },
  minAmount: {
    type: Number,
  },
  selectedProducts: {
    type:String,
  },
  maxAmount: {
  type:Number,
  },
  shop: {
    type: Object,
    required:true,
  },
  
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const CouponCode = mongoose.model("CouponCode", couponCodeSchema);
export default CouponCode;
