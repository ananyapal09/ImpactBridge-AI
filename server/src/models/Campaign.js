const mongoose = require("mongoose");

const campaignSchema = new mongoose.Schema(
  {
    ngo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "NGOProfile",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      enum: [
        "Education",
        "Healthcare",
        "Disaster Relief",
        "Animal Welfare",
        "Environment",
        "Women Empowerment",
        "Child Welfare",
        "Other",
      ],
      required: true,
    },

    goalAmount: {
      type: Number,
      required: true,
    },

    raisedAmount: {
      type: Number,
      default: 0,
    },

    deadline: {
      type: Date,
      required: true,
    },

    image: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["active", "completed", "closed"],
      default: "active",
    },

    aiVerified: {
      type: Boolean,
      default: false,
    },

    fraudScore: {
      type: Number,
      default: 0,
    },
    riskLevel: {
  type: String,
  enum: ["Low", "Medium", "High"],
  default: "Low",
},

fraudBreakdown: [
  {
    factor: String,
    impact: String,
    status: {
      type: String,
      enum: ["positive", "negative"],
    },
  },
],

    aiSummary: {
      type: String,
      default: "",
    },

    aiSuggestions: {
      type: [String],
      default: [],
    },
    aiReport: {
  summary: {
    type: String,
    default: "",
  },

  beneficiaries: {
    type: String,
    default: "",
  },

  urgency: {
    type: String,
    default: "",
  },

  trustAssessment: {
    type: String,
    default: "",
  },

  suggestions: {
    type: [String],
    default: [],
  },
},
    aiRecommendation: {
  type: String,
  default: "",
},

aiBadge: {
  type: String,
  default: "",
},

  },
  {
    timestamps: true,
  }
);


module.exports = mongoose.model("Campaign", campaignSchema);