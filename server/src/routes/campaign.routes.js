const express = require("express");
const router = express.Router();

const protect = require("../middleware/auth.middleware");
const upload = require("../middleware/upload.middleware");

const {
    createCampaign,
    getAllCampaigns,
    getMyCampaigns,
    getCampaignById,
    updateCampaign,
    deleteCampaign,
} = require("../controllers/campaign.controller");
router.get("/test", (req, res) => {
    res.json({
        success: true,
        message: "Campaign routes working",
    });
});

// Public
router.get("/", getAllCampaigns);

// Protected
router.post(
  "/",
  protect,
  upload.single("image"),
  createCampaign
);

// IMPORTANT: This MUST come before "/:id"
router.get("/my-campaigns", protect, getMyCampaigns);

// Dynamic route LAST
router.get("/:id", getCampaignById);

router.put("/:id", protect, updateCampaign);
router.delete("/:id", protect, deleteCampaign);

module.exports = router;