import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllCampaigns } from "../services/campaignService";

export default function Campaigns() {
  const navigate = useNavigate();

  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadCampaigns();
  }, []);

  const loadCampaigns = async () => {
    try {
      const res = await getAllCampaigns();

      console.log("Campaign API Response:", res);

      if (res.success) {
        setCampaigns(res.campaigns || []);
      } else {
        setError("Unable to load campaigns.");
      }
    } catch (err) {
      console.error("Campaign loading error:", err);
      setError("Unable to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#14201B] flex items-center justify-center text-white text-xl">
        Loading campaigns...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#14201B] flex flex-col items-center justify-center text-white">
        <h2 className="text-3xl font-bold">
          Something went wrong
        </h2>

        <p className="mt-3 text-[#93A79A]">
          {error}
        </p>

        <button
          onClick={loadCampaigns}
          className="mt-6 bg-[#E7B14C] text-[#14201B] px-6 py-3 rounded-xl font-semibold"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#14201B] text-white">

      {/* Hero */}

      <section className="pt-28 pb-16 bg-gradient-to-r from-[#0B1814] via-[#13231D] to-[#183125]">

        <div className="max-w-7xl mx-auto px-8">

          <p className="text-[#E7B14C] font-semibold tracking-wide">
            MAKE AN IMPACT
          </p>

          <h1 className="text-5xl md:text-6xl font-bold mt-3">
            Browse Campaigns
          </h1>

          <p className="mt-5 text-[#93A79A] text-lg max-w-2xl">
            Discover verified campaigns and support causes
            that create meaningful social impact.
          </p>

        </div>

      </section>

      {/* Campaigns */}

      <section className="py-16">

        <div className="max-w-7xl mx-auto px-8">

          {campaigns.length === 0 ? (
            <div className="text-center py-20">

              <h2 className="text-3xl font-bold">
                No Campaigns Available
              </h2>

              <p className="mt-3 text-[#93A79A]">
                There are currently no campaigns to display.
              </p>

            </div>
          ) : (

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

              {campaigns.map((campaign) => {

                const progress =
                  campaign.goalAmount > 0
                    ? Math.min(
                        Math.round(
                          (campaign.raisedAmount /
                            campaign.goalAmount) *
                            100
                        ),
                        100
                      )
                    : 0;

                return (
                  <div
                    key={campaign._id}
                    className="
                      overflow-hidden
                      rounded-3xl
                      border
                      border-white/10
                      bg-[#1B2A24]
                      hover:border-[#E7B14C]/50
                      hover:-translate-y-2
                      transition-all
                      duration-300
                    "
                  >

                    {/* Image */}

                    <div className="h-56 overflow-hidden bg-[#13231D]">

                      {campaign.image ? (
                        <img
  src={campaign.image || "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=900"}
  alt={campaign.title}
  className="h-60 w-full object-cover"
  onError={(e) => {
    e.currentTarget.src =
      "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=900";
  }}
/>
                      ) : (
                        <div className="h-full w-full flex items-center justify-center text-[#93A79A]">
                          No Image
                        </div>
                      )}

                    </div>

                    <div className="p-6">

                      {/* Category */}

                      <span className="inline-block rounded-full bg-[#E7B14C]/20 px-3 py-1 text-sm text-[#E7B14C]">
                        {campaign.category}
                      </span>

                      {/* Title */}

                      <h2 className="mt-4 text-2xl font-bold">
                        {campaign.title}
                      </h2>

                      {/* Description */}

                      <p className="mt-3 text-[#93A79A] line-clamp-3 leading-6">
                        {campaign.description}
                      </p>

                      {/* Progress */}

                      <div className="mt-6">

                        <div className="flex justify-between text-sm mb-2">

                          <span className="text-[#93A79A]">
                            ₹{campaign.raisedAmount.toLocaleString()}
                            {" "}raised
                          </span>

                          <span className="text-white font-semibold">
                            {progress}%
                          </span>

                        </div>

                        <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">

                          <div
                            className="h-full bg-[#E7B14C]"
                            style={{
                              width: `${progress}%`,
                            }}
                          />

                        </div>

                      </div>

                      {/* Amount */}

                      <div className="mt-5 flex justify-between">

                        <div>
                          <p className="text-[#93A79A] text-sm">
                            Raised
                          </p>

                          <h3 className="text-xl font-bold">
                            ₹{campaign.raisedAmount.toLocaleString()}
                          </h3>
                        </div>

                        <div className="text-right">

                          <p className="text-[#93A79A] text-sm">
                            Goal
                          </p>

                          <h3 className="text-xl font-bold text-[#E7B14C]">
                            ₹{campaign.goalAmount.toLocaleString()}
                          </h3>

                        </div>

                      </div>

                      {/* AI / Risk */}

                      <div className="mt-5 flex justify-between items-center">

                        <span
                          className={`px-3 py-1 rounded-full text-sm ${
                            campaign.riskLevel === "Low"
                              ? "bg-green-500/20 text-green-400"
                              : campaign.riskLevel === "Medium"
                              ? "bg-yellow-500/20 text-yellow-400"
                              : "bg-red-500/20 text-red-400"
                          }`}
                        >
                          {campaign.riskLevel === "Low"
                            ? "✓ Low Risk"
                            : campaign.riskLevel === "Medium"
                            ? "⚠ Medium Risk"
                            : "⚠ High Risk"}
                        </span>

                        {campaign.aiVerified && (
                          <span className="text-green-400 text-sm">
                            ✓ AI Verified
                          </span>
                        )}

                      </div>

                      {/* Button */}

                      <button
                        onClick={() =>
                          navigate(
                            `/campaign/${campaign._id}`
                          )
                        }
                        className="
                          mt-7
                          w-full
                          rounded-xl
                          bg-[#E7B14C]
                          py-3
                          font-bold
                          text-[#14201B]
                          hover:scale-[1.02]
                          transition
                        "
                      >
                        View Details →
                      </button>

                    </div>

                  </div>
                );
              })}

            </div>

          )}

        </div>

      </section>

    </div>
  );
}