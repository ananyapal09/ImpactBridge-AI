const express = require("express");

const router = express.Router();

const protect = require("../middleware/auth.middleware");

const {
    createNGOProfile,
    getNGODashboard,
    getVerifiedNGOs,
} = require("../controllers/ngo.controller");


router.post("/profile", protect, createNGOProfile);
router.get("/dashboard", protect, getNGODashboard);
router.get("/", getVerifiedNGOs);


module.exports = router;