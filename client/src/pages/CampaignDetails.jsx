import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  CalendarDays,
  IndianRupee,
  Target,
  ShieldCheck,
} from "lucide-react";

import { getCampaignById } from "../services/campaignService";
import {
  createOrder,
  verifyPayment,
} from "../services/donationService";

import {
  showSuccess,
  showError,
} from "../utils/toast";
import AIChat from "../components/ai/AIChat";

export default function CampaignDetails() {
  const { id } = useParams();

  const [campaign, setCampaign] = useState(null);
  const [donationAmount, setDonationAmount] = useState("");
const [donating, setDonating] = useState(false);
  console.log("Campaign state JSON:");
console.log(JSON.stringify(campaign, null, 2));

  useEffect(() => {
  loadCampaign();
}, [id]);

  const loadCampaign = async () => {
  try {
    console.log("Campaign ID from URL:", id);

    const res = await getCampaignById(id);

    console.log("API Response JSON:");
    console.log(JSON.stringify(res, null, 2));

    if (res.success && res.campaign) {
      setCampaign(res.campaign);
    } else {
      console.log("Campaign not found in response");
    }
  } catch (err) {
    console.error("Load campaign error:", err);
  }
};
  if (!campaign) {
  return (
    <div className="min-h-screen bg-[#14201B] flex flex-col justify-center items-center text-white">
      <p>Loading campaign...</p>
      <p className="mt-4 text-sm text-gray-400">
        Campaign ID: {id}
      </p>
    </div>
  );
}

  const progress =
    campaign.goalAmount > 0
      ? Math.round(
          (campaign.raisedAmount / campaign.goalAmount) * 100
        )
      : 0;

  const daysLeft = Math.max(
    Math.ceil(
      (new Date(campaign.deadline) - new Date()) /
        (1000 * 60 * 60 * 24)
    ),
    0
  );
   const handleDonate = async () => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      return showError(
        "Login Required",
        "Please login before donating."
      );
    }

    const amount = Number(donationAmount);

    if (!amount || amount <= 0) {
      return showError(
        "Invalid Amount",
        "Please enter a valid donation amount."
      );
    }

    if (amount < 10) {
      return showError(
        "Invalid Amount",
        "Minimum donation amount is ₹10."
      );
    }

    if (
      campaign.status === "completed" ||
      campaign.status === "closed"
    ) {
      return showError(
        "Campaign Closed",
        "This campaign is no longer accepting donations."
      );
    }

    if (campaign.raisedAmount >= campaign.goalAmount) {
      return showError(
        "Campaign Funded",
        "This campaign has already reached its fundraising goal."
      );
    }

    const remaining =
      campaign.goalAmount - campaign.raisedAmount;

    if (amount > remaining) {
      return showError(
        "Amount Too High",
        `Only ₹${remaining.toLocaleString()} is remaining to reach the campaign goal.`
      );
    }

    setDonating(true);

    const { order } = await createOrder(
      campaign._id,
      amount,
      token
    );

    if (!order) {
      throw new Error("Unable to create payment order.");
    }

    if (!window.Razorpay) {
      throw new Error(
        "Razorpay Checkout could not be loaded."
      );
    }

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,

      amount: order.amount,

      currency: order.currency,

      name: "ImpactBridge",

      description: campaign.title,

      image: "/favicon.svg",

      order_id: order.id,

      handler: async function (response) {
        try {
          await verifyPayment(
            {
              campaignId: campaign._id,
              amount,

              razorpay_order_id:
                response.razorpay_order_id,

              razorpay_payment_id:
                response.razorpay_payment_id,

              razorpay_signature:
                response.razorpay_signature,
            },
            token
          );

          setDonationAmount("");

          showSuccess(
            "Donation Successful",
            "Thank you for supporting this campaign!"
          );

          await loadCampaign();

        } catch (error) {
          showError(
            "Verification Failed",
            error.response?.data?.message ||
              "Payment verification failed."
          );
        } finally {
          setDonating(false);
        }
      },

      modal: {
        ondismiss: function () {
          setDonating(false);
        },
      },

      theme: {
        color: "#E7B14C",
      },
    };

    const razor = new window.Razorpay(options);

    razor.open();

  } catch (err) {
    console.error("Donation Error:", err);

    setDonating(false);

    showError(
      "Payment Failed",
      err.response?.data?.message ||
        err.message ||
        "Something went wrong."
    );
  }
};
  return (
    <div className="min-h-screen bg-[#14201B]">

      <div className="max-w-7xl mx-auto py-16 px-8">

        <img
          src={campaign.image}
          alt={campaign.title}
          className="w-full h-[450px] object-cover rounded-3xl"
        />

        <div className="grid lg:grid-cols-3 gap-10 mt-10">

          {/* Left */}

          <div className="lg:col-span-2">

            <span className="bg-[#E7B14C] text-[#14201B] px-4 py-2 rounded-full font-semibold">
              {campaign.category}
            </span>

            <h1 className="hero-title text-6xl text-white mt-6">
              {campaign.title}
            </h1>

            <p className="text-[#93A79A] mt-8 leading-9 text-lg">
              {campaign.description}
            </p>

          </div>

          {/* Right */}

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 h-fit">

            <div className="flex justify-between mb-3">

              <span className="text-[#93A79A]">
                Progress
              </span>

              <span className="text-white font-semibold">
                {progress}%
              </span>

            </div>

            <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden">

              <div
                className="h-full bg-[#E7B14C]"
                style={{
                  width: `${progress}%`,
                }}
              />

            </div>

            <div className="mt-8 space-y-5">

              <div className="flex justify-between">

                <div className="flex gap-2 items-center">

                  <IndianRupee size={18} />

                  Raised

                </div>

                <strong>
                  ₹{campaign.raisedAmount.toLocaleString()}
                </strong>

              </div>

              <div className="flex justify-between">

                <div className="flex gap-2 items-center">

                  <Target size={18} />

                  Goal

                </div>

                <strong>
                  ₹{campaign.goalAmount.toLocaleString()}
                </strong>

              </div>

              <div className="flex justify-between">

                <div className="flex gap-2 items-center">

                  <CalendarDays size={18} />

                  Days Left

                </div>

                <strong>
                  {daysLeft}
                </strong>

              </div>

            </div>

<div className="mt-10">

  <h3 className="text-xl font-bold text-white mb-4">
    Make a Donation
  </h3>

  <div className="relative">

    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#E7B14C] font-bold">
      ₹
    </span>

    <input
      type="number"
      min="10"
      value={donationAmount}
      onChange={(e) =>
        setDonationAmount(e.target.value)
      }
      placeholder="Enter amount"
      className="w-full rounded-xl border border-white/10 bg-white/5 py-4 pl-10 pr-4 text-white outline-none focus:border-[#E7B14C]"
      disabled={donating}
    />

  </div>

  <div className="grid grid-cols-3 gap-2 mt-3">

    {[100, 500, 1000].map((amount) => (
      <button
        key={amount}
        type="button"
        onClick={() =>
          setDonationAmount(String(amount))
        }
        disabled={donating}
        className="rounded-lg border border-white/10 py-2 text-sm text-[#C8D2CC] hover:border-[#E7B14C] hover:text-[#E7B14C] transition disabled:opacity-50"
      >
        ₹{amount}
      </button>
    ))}

  </div>

  <button
    onClick={handleDonate}
    disabled={donating}
    className="w-full mt-4 bg-[#E7B14C] py-4 rounded-xl font-bold text-[#14201B] hover:opacity-90 transition disabled:opacity-60 disabled:cursor-not-allowed"
  >
    {donating
      ? "Processing..."
      : donationAmount
      ? `Donate ₹${Number(donationAmount).toLocaleString()}`
      : "Donate Now"}
  </button>

</div>
            <div className="mt-8 flex gap-3 items-center text-[#93A79A]">

              <ShieldCheck className="text-green-400" />

              Verified NGO

            </div>
            <div className="mt-8 rounded-2xl border border-[#E7B14C]/20 bg-white/5 p-6">

  <h3 className="text-xl font-bold text-white mb-4">
    🤖 AI Verification
  </h3>

  <p className="text-[#93A79A]">
    Status
  </p>

  <span
    className={`inline-block mt-2 rounded-full px-4 py-2 font-semibold ${
      campaign.aiVerified
        ? "bg-green-500/20 text-green-400"
        : "bg-red-500/20 text-red-400"
    }`}
  >
    {campaign.aiVerified
  ? "✅ AI Verified"
  : "⚠ Needs Review"}
  </span>

  <div className="mt-5">

  <p className="text-[#93A79A]">
    AI Risk Score
  </p>

  <div className="flex items-center justify-between mt-2">

    <h2 className="text-3xl font-bold text-[#E7B14C]">
      {campaign.fraudScore ?? 0}/100
    </h2>

    <span
      className={`px-4 py-2 rounded-full font-semibold ${
        campaign.riskLevel === "Low"
          ? "bg-green-500/20 text-green-400"
          : campaign.riskLevel === "Medium"
          ? "bg-yellow-500/20 text-yellow-400"
          : "bg-red-500/20 text-red-400"
      }`}
    >
      {campaign.riskLevel || "Unknown"} Risk
    </span>

  </div>

</div>

  <div className="mt-5">

    <p className="text-[#93A79A]">
      Summary
    </p>

    <p className="text-white mt-2">
  {campaign.aiSummary || "No AI summary available."}
</p>

  </div>
<div className="mt-8">

  <h4 className="text-lg font-bold text-white mb-4">
    AI Risk Analysis
  </h4>

  {campaign.fraudBreakdown?.length ? (

    <div className="space-y-3">

      {campaign.fraudBreakdown.map((item, index) => (

        <div
          key={index}
          className="flex justify-between items-center bg-white/5 rounded-xl px-4 py-3"
        >

          <div className="flex items-center gap-3">

            <span className="text-xl">
              {item.status === "positive" ? "🟢" : "🔴"}
            </span>

            <span className="text-white">
              {item.factor}
            </span>

          </div>

          <span
            className={`font-bold ${
              item.status === "positive"
                ? "text-green-400"
                : "text-red-400"
            }`}
          >
            {item.impact}
          </span>

        </div>

      ))}

    </div>

  ) : (

    <p className="text-gray-400">
      No AI breakdown available.
    </p>

  )}

</div>
<div className="mt-8">
  <p className="text-[#93A79A] mb-2">
    AI Recommendation
  </p>

  <div className="rounded-2xl bg-[#E7B14C]/10 border border-[#E7B14C]/20 p-5">
    <div className="flex items-center gap-3">
      <span className="text-2xl">🤖</span>

      <span className="rounded-full bg-[#E7B14C]/20 px-4 py-2 font-bold text-[#E7B14C]">
        {campaign.aiBadge || "Best Impact"}
      </span>
    </div>

    <p className="mt-4 text-white leading-7">
      {campaign.aiRecommendation ||
        "This campaign has strong potential to create meaningful social impact."}
    </p>
  </div>
</div>
  <div className="mt-5">

    <p className="text-[#93A79A] mb-2">
      Suggestions
    </p>

    <ul className="list-disc list-inside text-white space-y-2">

  {campaign.aiSuggestions?.length ? (
    campaign.aiSuggestions.map((item, index) => (
      <li key={index}>{item}</li>
    ))
  ) : (
    <li>No suggestions available.</li>
  )}

</ul>

  </div>

</div>
          </div>

        </div>
       {/* AI Chat Assistant */}
        <div className="mt-10">
          <AIChat campaignId={campaign._id} />
        </div>
      </div>

    </div>
  );
}