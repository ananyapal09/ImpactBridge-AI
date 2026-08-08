const express = require("express");

const router = express.Router();

const protect = require("../middleware/auth.middleware");
const isAdmin = require("../middleware/admin.middleware");

const {
    getPendingNGOs,
    approveNGO,
    getAdminDashboard,
    rejectNGO,
    getAllCampaignsAdmin,
    deleteCampaign,
    getAllUsers,
    getAllDonations,
    getAnalytics,




} = require("../controllers/admin.controller");

// Admin only
router.get("/pending-ngos", protect, isAdmin, getPendingNGOs);
router.put("/approve/:id", protect, isAdmin, approveNGO);
router.get("/dashboard", protect, isAdmin, getAdminDashboard);
router.delete("/reject/:id", protect, isAdmin, rejectNGO);
router.get(
    "/campaigns",
    protect,
    isAdmin,
    getAllCampaignsAdmin
);
router.delete(
  "/campaign/:id",
  protect,
  isAdmin,
  deleteCampaign
);
router.get(
  "/users",
  protect,
  isAdmin,
  getAllUsers
);
router.get(
  "/donations",
  protect,
  isAdmin,
  getAllDonations
);
router.get(
"/analytics",
protect,
isAdmin,
getAnalytics
);
module.exports = router;