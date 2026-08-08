const Campaign = require("../models/Campaign");
const NGOProfile = require("../models/NGOProfile");

const verifyCampaign = require("../utils/verifyCampaign");
const recommendCampaign = require("../utils/recommendCampaign");

const calculateFraudScore = require("../services/fraudScoring");
const generateAISummary = require("../services/aiSummary");

// ============================================================
// CREATE CAMPAIGN
// ============================================================

const createCampaign = async (req, res) => {
  try {
    console.log("========== CREATE CAMPAIGN ==========");
    console.log("User:", req.user);
    console.log("Body:", req.body);
    console.log("File:", req.file);

    const {
      title,
      description,
      category,
      goalAmount,
      deadline,
    } = req.body;

    // ========================================================
    // Validate required fields
    // ========================================================

    if (
      !title ||
      !description ||
      !category ||
      !goalAmount ||
      !deadline
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    // ========================================================
    // Find NGO Profile
    // ========================================================

    const ngoProfile = await NGOProfile.findOne({
      user: req.user.userId,
    }).populate(
      "user",
      "name email role isVerified"
    );

    if (!ngoProfile) {
      return res.status(404).json({
        success: false,
        message: "NGO profile not found.",
      });
    }

    // ========================================================
    // 1. EXISTING AI VERIFICATION
    // ========================================================

    console.log("Running AI verification...");

    const aiResult = await verifyCampaign(description);

    console.log("AI Result:", aiResult);

    // ========================================================
    // 2. EXPLAINABLE FRAUD SCORING
    // ========================================================

    console.log("Running explainable fraud scoring...");

    const fraudAnalysis = calculateFraudScore(
      {
        description,
        goalAmount: Number(goalAmount),
        deadline,
      },
      {
        user: {
          isVerified:
            ngoProfile.user?.isVerified || false,
        },

        website: ngoProfile.website || "",
        address: ngoProfile.address || "",
      }
    );

    console.log(
      "Explainable Fraud:",
      fraudAnalysis
    );

    // ========================================================
    // 3. GEMINI AI CAMPAIGN REPORT
    // ========================================================

    console.log("Generating Gemini AI report...");

    const aiReport = await generateAISummary({
      title,
      category,
      description,
      goalAmount: Number(goalAmount),
    });

    console.log(
      "Gemini AI Report:",
      aiReport
    );

    // ========================================================
    // 4. AI RECOMMENDATION
    // ========================================================

    console.log("Generating AI recommendation...");

    const recommendation =
      await recommendCampaign({
        title,
        category,
        goalAmount: Number(goalAmount),
        raisedAmount: 0,
        fraudScore:
          fraudAnalysis.fraudScore,
        description,
      });

    console.log(
      "Recommendation:",
      recommendation
    );

    // ========================================================
    // 5. CREATE CAMPAIGN IN DATABASE
    // ========================================================

    const campaign =
      await Campaign.create({
        ngo: ngoProfile._id,

        title,

        description,

        category,

        goalAmount:
          Number(goalAmount),

        deadline,

        image: req.file
          ? req.file.path
          : "",

        // ----------------------------------------------------
        // Existing AI Verification
        // ----------------------------------------------------

        aiVerified:
          aiResult.aiVerified,

        aiSummary:
          aiResult.aiSummary || "",

        aiSuggestions:
          aiResult.aiSuggestions || [],

        // ----------------------------------------------------
        // Explainable Fraud Scoring
        // ----------------------------------------------------

        fraudScore:
          fraudAnalysis.fraudScore,

        riskLevel:
          fraudAnalysis.riskLevel,

        fraudBreakdown:
          fraudAnalysis.breakdown,

        // ----------------------------------------------------
        // Gemini AI Report
        // ----------------------------------------------------

        aiReport: {
          summary:
            aiReport.summary || "",

          beneficiaries:
            aiReport.beneficiaries || "",

          urgency:
            aiReport.urgency || "",

          trustAssessment:
            aiReport.trustAssessment || "",

          suggestions:
            aiReport.suggestions || [],
        },

        // ----------------------------------------------------
        // AI Recommendation
        // ----------------------------------------------------

        aiRecommendation:
          recommendation.reason || "",

        aiBadge:
          recommendation.badge || "",
      });

    console.log(
      "Campaign Created Successfully"
    );

    // ========================================================
    // RESPONSE
    // ========================================================

    return res.status(201).json({
      success: true,

      message:
        "Campaign created successfully.",

      campaign,
    });

  } catch (error) {
    console.error(
      "Create Campaign Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ============================================================
// GET LOGGED-IN NGO'S CAMPAIGNS
// ============================================================

const getMyCampaigns = async (req, res) => {
  try {
    console.log(
      "========== MY CAMPAIGNS =========="
    );

    console.log(
      "Logged In User:",
      req.user
    );

    const ngoProfile =
      await NGOProfile.findOne({
        user: req.user.userId,
      });

    if (!ngoProfile) {
      return res.status(404).json({
        success: false,
        message: "NGO profile not found.",
      });
    }

    const campaigns =
      await Campaign.find({
        ngo: ngoProfile._id,
      }).sort({
        createdAt: -1,
      });

    const totalCampaigns =
      campaigns.length;

    const activeCampaigns =
      campaigns.filter(
        (campaign) =>
          campaign.status === "active"
      ).length;

    const completedCampaigns =
      campaigns.filter(
        (campaign) =>
          campaign.status === "completed"
      ).length;

    const totalFundsRaised =
      campaigns.reduce(
        (sum, campaign) =>
          sum +
          (campaign.raisedAmount || 0),
        0
      );

    return res.status(200).json({
      success: true,

      campaigns,

      stats: {
        totalCampaigns,
        activeCampaigns,
        completedCampaigns,
        totalFundsRaised,
      },
    });

  } catch (error) {
    console.error(
      "Get My Campaigns Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ============================================================
// GET ALL CAMPAIGNS
// ============================================================

const getAllCampaigns = async (
  req,
  res
) => {
  try {
    const campaigns =
      await Campaign.find()
        .populate({
          path: "ngo",

          select:
            "description website phone address user",

          populate: {
            path: "user",

            select:
              "name email role isVerified",
          },
        });

    return res.status(200).json({
      success: true,

      count: campaigns.length,

      campaigns,
    });

  } catch (error) {
    console.error(
      "Get All Campaigns Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ============================================================
// GET CAMPAIGN BY ID
// ============================================================

const getCampaignById = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    const campaign =
      await Campaign.findById(id)
        .populate({
          path: "ngo",

          select:
            "description website phone address user",

          populate: {
            path: "user",

            select:
              "name email role isVerified",
          },
        });

    if (!campaign) {
      return res.status(404).json({
        success: false,
        message: "Campaign not found.",
      });
    }

    return res.status(200).json({
      success: true,

      campaign,
    });

  } catch (error) {
    console.error(
      "Get Campaign By ID Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ============================================================
// UPDATE CAMPAIGN
// ============================================================

const updateCampaign = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    const campaign =
      await Campaign.findById(id);

    if (!campaign) {
      return res.status(404).json({
        success: false,
        message: "Campaign not found.",
      });
    }

    const ngoProfile =
      await NGOProfile.findOne({
        user: req.user.userId,
      });

    if (!ngoProfile) {
      return res.status(404).json({
        success: false,
        message: "NGO profile not found.",
      });
    }

    // ========================================================
    // Authorization
    // ========================================================

    if (
      campaign.ngo.toString() !==
      ngoProfile._id.toString()
    ) {
      return res.status(403).json({
        success: false,

        message:
          "You are not authorized to update this campaign.",
      });
    }

    const updatedCampaign =
      await Campaign.findByIdAndUpdate(
        id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

    return res.status(200).json({
      success: true,

      message:
        "Campaign updated successfully.",

      campaign: updatedCampaign,
    });

  } catch (error) {
    console.error(
      "Update Campaign Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ============================================================
// DELETE CAMPAIGN
// ============================================================

const deleteCampaign = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    const campaign =
      await Campaign.findById(id);

    if (!campaign) {
      return res.status(404).json({
        success: false,
        message: "Campaign not found.",
      });
    }

    const ngoProfile =
      await NGOProfile.findOne({
        user: req.user.userId,
      });

    if (!ngoProfile) {
      return res.status(404).json({
        success: false,
        message: "NGO profile not found.",
      });
    }

    // ========================================================
    // Authorization
    // ========================================================

    if (
      campaign.ngo.toString() !==
      ngoProfile._id.toString()
    ) {
      return res.status(403).json({
        success: false,

        message:
          "You are not authorized to delete this campaign.",
      });
    }

    await Campaign.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,

      message:
        "Campaign deleted successfully.",
    });

  } catch (error) {
    console.error(
      "Delete Campaign Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ============================================================
// EXPORTS
// ============================================================

module.exports = {
  createCampaign,
  getMyCampaigns,
  getAllCampaigns,
  getCampaignById,
  updateCampaign,
  deleteCampaign,
};