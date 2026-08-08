const express = require("express");

const router = express.Router();

const protect = require("../middleware/auth.middleware");

const {
  createOrder,
  verifyPayment,
  getMyDonations,
  downloadCertificate,
  verifyCertificate,

} = require("../controllers/donation.controller");

router.post("/create-order", protect, createOrder);

router.post("/verify", protect, verifyPayment);

router.get("/my", protect, getMyDonations);
router.get("/:id/certificate", protect, downloadCertificate);
router.get(
  "/certificate/verify/:certificateId",
  verifyCertificate
);

module.exports = router;