const User = require("../models/User");
const Campaign = require("../models/Campaign");
const Donation = require("../models/Donation");

// Get all NGOs waiting for approval
const getPendingNGOs = async (req, res) => {
    try {
        const ngos = await User.find({
            role: "ngo",
            isVerified: false,
        }).select("-password");

        return res.status(200).json({
            success: true,
            count: ngos.length,
            ngos,
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

// Approve NGO
const approveNGO = async (req, res) => {
    try {
        const { id } = req.params;

        const ngo = await User.findById(id);

        if (!ngo) {
            return res.status(404).json({
                success: false,
                message: "NGO not found.",
            });
        }

        if (ngo.role !== "ngo") {
            return res.status(400).json({
                success: false,
                message: "User is not an NGO.",
            });
        }

        if (ngo.isVerified) {
            return res.status(400).json({
                success: false,
                message: "NGO is already approved.",
            });
        }

        ngo.isVerified = true;
        await ngo.save();

        // Fetch updated NGO without password
        const approvedNGO = await User.findById(id).select("-password");

        return res.status(200).json({
            success: true,
            message: "NGO approved successfully.",
            ngo: approvedNGO,
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};
// Admin Dashboard
const getAdminDashboard = async (req, res) => {
    try {

        const totalNGOs = await User.countDocuments({
            role: "ngo",
        });
        const totalUsers = await User.countDocuments();

        const pendingNGOs = await User.countDocuments({
            role: "ngo",
            isVerified: false,
        });
         
        const approvedNGOs = await User.countDocuments({
            role: "ngo",
            isVerified: true,
        });

        const totalCampaigns = await Campaign.countDocuments();

        const totalDonations = await Donation.countDocuments();

        const campaigns = await Campaign.find();

        let totalFundsRaised = 0;

        campaigns.forEach(campaign => {
            totalFundsRaised += campaign.raisedAmount;
        });

        return res.status(200).json({
            success: true,
dashboard: {
    totalUsers,
    totalNGOs,
    pendingNGOs,
    approvedNGOs,
    totalCampaigns,
    totalDonations,
    totalFundsRaised,
},        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};
// Reject NGO
const rejectNGO = async (req, res) => {
    try {
        const { id } = req.params;

        const ngo = await User.findById(id);

        if (!ngo) {
            return res.status(404).json({
                success: false,
                message: "NGO not found",
            });
        }

        if (ngo.role !== "ngo") {
            return res.status(400).json({
                success: false,
                message: "User is not an NGO",
            });
        }

        await User.findByIdAndDelete(id);

        return res.status(200).json({
            success: true,
            message: "NGO rejected successfully",
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};
// Get all campaigns (Admin)

const getAllCampaignsAdmin = async (req, res) => {
  try {
    const campaigns = await Campaign.find()
  .populate({
    path: "ngo",
    populate: {
      path: "user",
      select: "name email",
    },
  })
  .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: campaigns.length,
      campaigns,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
// Delete Campaign

const deleteCampaign = async (req, res) => {
  try {
    const { id } = req.params;

    const campaign = await Campaign.findById(id);

    if (!campaign) {
      return res.status(404).json({
        success: false,
        message: "Campaign not found",
      });
    }

    await Campaign.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Campaign deleted successfully",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
// Get All Users

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.status(200).json({
      success: true,
      count: users.length,
      users,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
// Get All Donations

const getAllDonations = async (req, res) => {
  try {
    const donations = await Donation.find()
      .populate("donor", "name email")
      .populate({
        path: "campaign",
        select: "title ngo",
        populate: {
          path: "ngo",
          populate: {
            path: "user",
            select: "name",
          },
        },
      })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: donations.length,
      donations,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
const getAnalytics = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();

    const totalCampaigns = await Campaign.countDocuments();

    const totalNGOs = await User.countDocuments({
      role: "ngo",
    });

    const donations = await Donation.find();

    const totalDonations = donations.reduce(
      (sum, d) => sum + d.amount,
      0
    );

    const campaigns = await Campaign.find();

    // Monthly Donations
    const monthly = {};

    donations.forEach((donation) => {
      const month = new Date(
        donation.createdAt
      ).toLocaleString("default", {
        month: "short",
      });

      monthly[month] =
        (monthly[month] || 0) + donation.amount;
    });

    // Categories
    const categories = {};

    campaigns.forEach((campaign) => {
      categories[campaign.category] =
        (categories[campaign.category] || 0) + 1;
    });

    // Fraud
    const fraud = {
      safe: 0,
      medium: 0,
      high: 0,
    };

    campaigns.forEach((campaign) => {
      if (campaign.fraudScore < 40)
        fraud.safe++;

      else if (campaign.fraudScore < 70)
        fraud.medium++;

      else fraud.high++;
    });

    res.json({
      success: true,

      totals: {
        totalUsers,
        totalCampaigns,
        totalNGOs,
        totalDonations,
      },

      monthly,

      categories,

      fraud,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
    });
  }
};
module.exports = {
    getPendingNGOs,
    approveNGO,
    getAdminDashboard,
    rejectNGO,
    getAllCampaignsAdmin,
    deleteCampaign,
    getAllUsers,
    getAllDonations,
    getAnalytics,






};