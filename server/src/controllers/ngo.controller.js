const NGOProfile = require("../models/NGOProfile");
const Campaign = require("../models/Campaign");
const Donation = require("../models/Donation");

// ================= CREATE NGO PROFILE =================

const createNGOProfile = async (req, res) => {
    try {
        const { description, website, phone, address } = req.body;

        // Validate required fields
        if (!description || !address) {
            return res.status(400).json({
                success: false,
                message: "Description and address are required.",
            });
        }

        // Check if NGO profile already exists
        const existingProfile = await NGOProfile.findOne({
            user: req.user.userId,
        });

        if (existingProfile) {
            return res.status(400).json({
                success: false,
                message: "NGO profile already exists.",
            });
        }

        // Create NGO Profile
        const ngoProfile = await NGOProfile.create({
            user: req.user.userId,
            description,
            website,
            phone,
            address,
        });

        res.status(201).json({
            success: true,
            message: "NGO profile created successfully.",
            ngoProfile: {
                id: ngoProfile._id,
                user: ngoProfile.user,
                description: ngoProfile.description,
                website: ngoProfile.website,
                phone: ngoProfile.phone,
                address: ngoProfile.address,
                createdAt: ngoProfile.createdAt,
            },
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};
// NGO Dashboard
const getNGODashboard = async (req, res) => {
    try {

        // Find NGO Profile
        const ngoProfile = await NGOProfile.findOne({
            user: req.user.userId,
        });

        if (!ngoProfile) {
            return res.status(404).json({
                success: false,
                message: "NGO profile not found.",
            });
        }

        // Get NGO campaigns
        const campaigns = await Campaign.find({
            ngo: ngoProfile._id,
        });

        const totalCampaigns = campaigns.length;

        let totalFundsRaised = 0;
        let totalDonations = 0;

        for (const campaign of campaigns) {

            totalFundsRaised += campaign.raisedAmount;

            const donationCount = await Donation.countDocuments({
                campaign: campaign._id,
            });

            totalDonations += donationCount;
        }

        return res.status(200).json({
            success: true,
            dashboard: {
                totalCampaigns,
                totalFundsRaised,
                totalDonations,
            },
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};
// ================= GET VERIFIED NGOS =================

// ================= GET VERIFIED NGOS =================

const getVerifiedNGOs = async (req, res) => {
  try {
    const ngoProfiles = await NGOProfile.find().populate({
      path: "user",
      select: "name email role isVerified",
    });

    const verifiedNGOs = [];

    for (const ngo of ngoProfiles) {
      if (
        !ngo.user ||
        ngo.user.role !== "ngo" ||
        !ngo.user.isVerified
      ) {
        continue;
      }

      // Fetch campaigns of this NGO
      const campaigns = await Campaign.find({
        ngo: ngo._id,
      });

      // Total campaigns
      const campaignCount = campaigns.length;

      // Total funds raised
      const fundsRaised = campaigns.reduce(
        (total, campaign) => total + campaign.raisedAmount,
        0
      );

      verifiedNGOs.push({
        _id: ngo._id,
        name: ngo.user.name,
        email: ngo.user.email,
        description: ngo.description,
        website: ngo.website,
        phone: ngo.phone,
        address: ngo.address,

        // Statistics
        campaignCount,
        fundsRaised,

        // Keep if you later add NGO image
        image: ngo.image || "",
      });
    }

    return res.status(200).json({
      success: true,
      count: verifiedNGOs.length,
      ngos: verifiedNGOs,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  createNGOProfile,
  getNGODashboard,
  getVerifiedNGOs,
};