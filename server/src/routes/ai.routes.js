const express = require("express");
const router = express.Router();

const {
  chatWithAI,
  summarizeCampaign,
  recommendCampaign,
} = require("../controllers/ai.controller");

router.post("/chat", chatWithAI);

router.post("/summary", summarizeCampaign);


router.get("/recommendations", recommendCampaign);

module.exports = router;