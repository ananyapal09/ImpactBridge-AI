const express = require("express");
const cors = require("cors");

const healthRoutes = require("./routes/health.routes");
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const ngoRoutes = require("./routes/ngo.routes");
const campaignRoutes = require("./routes/campaign.routes");
const adminRoutes = require("./routes/admin.routes");
const donationRoutes = require("./routes/donation.routes");
const aiRoutes = require("./routes/ai.routes");

const app = express();

app.use(
  cors({
    origin: [
  "http://localhost:5173",
  "https://impact-bridge-ai-kkyu.vercel.app",
  "https://impact-bridge-ai-kkyu-vo9egfql1-ananya-d2af.vercel.app",
],
    credentials: true,
  })
);

app.use(express.json());

app.use("/api", healthRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/ngos", ngoRoutes);
app.use("/api/campaigns", campaignRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/donations", donationRoutes);
app.use("/api/ai", aiRoutes);

module.exports = app;