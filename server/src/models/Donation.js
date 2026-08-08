const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema(
  {
    donor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    campaign: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Campaign",
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    razorpayOrderId: String,

    razorpayPaymentId: String,

    razorpaySignature: String,

    paymentStatus: {
      type: String,
      default: "pending",
    },

    
    // Donation Certificate
   

    certificateId: {
      type: String,
      unique: true,
      sparse: true,
    },

    certificateIssued: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Donation", donationSchema);