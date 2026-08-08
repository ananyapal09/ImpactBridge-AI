const express = require("express");

const router = express.Router();

const protect = require("../middleware/auth.middleware");

const {
    getProfile,
    updateProfile,
    changePassword,
} = require("../controllers/user.controller");

// Get logged-in user's profile
router.get("/profile", protect, getProfile);

// Update logged-in user's profile
router.put("/profile", protect, updateProfile);

// Change password
router.put("/change-password", protect, changePassword);

module.exports = router;