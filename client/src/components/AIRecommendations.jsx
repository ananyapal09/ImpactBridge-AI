import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRecommendations } from "../services/aiService";

export default function AIRecommendations() {
  const [recommendations, setRecommendations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadRecommendations();
  }, []);

  const loadRecommendations = async () => {
  try {
    const res = await getRecommendations();

    console.log("API:", res);
    console.log("Recommendations:", res.recommendations);

    if (res.success) {
      setRecommendations(res.recommendations);
    }
  } catch (err) {
    console.log(err);
  }
};

  const badgeColor = {
    "Best Impact": "bg-green-600",
    "Fast Progress": "bg-blue-600",
    "High Risk": "bg-red-600",
    Urgent: "bg-red-600",
    "Almost Complete": "bg-purple-600",
  };

  const badgeIcon = {
    "Best Impact": "🥇",
    "Fast Progress": "🚀",
    "High Risk": "⚠️",
    Urgent: "🚑",
    "Almost Complete": "🎯",
  };

  return (
    <div className="bg-white/5 rounded-3xl p-8 border border-white/10">
      <h2 className="text-3xl font-bold text-white mb-8">
        🤖 AI Recommended Campaigns
      </h2>

      {recommendations.length === 0 ? (
        <div className="flex justify-center py-10">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#E7B14C]"></div>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
          {recommendations.map((item, index) => (
            <div
              key={item._id}
              className="bg-[#1D2B25] rounded-2xl p-6 border border-[#E7B14C]/20 hover:scale-105 hover:border-[#E7B14C] transition-all duration-300"
            >
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-bold text-white">
                  {index === 0
                    ? "🥇"
                    : index === 1
                    ? "🥈"
                    : "🥉"}{" "}
                  {item.title}
                </h3>

                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold text-white ${
                    badgeColor[item.badge] || "bg-gray-600"
                  }`}
                >
                  {badgeIcon[item.badge]} {item.badge}
                </span>
              </div>

              <p className="text-[#E7B14C] mt-3">
                📂 {item.category}
              </p>

              <div className="mt-4 space-y-2 text-[#C8D2CC]">
                <p>🎯 Goal: ₹{item.goalAmount.toLocaleString()}</p>

                <p>💰 Raised: ₹{item.raisedAmount.toLocaleString()}</p>

                <p>
                  🛡 Fraud Score:
                  <span
                    className={`font-semibold ml-2 ${
                      item.fraudScore <= 20
                        ? "text-green-400"
                        : item.fraudScore <= 60
                        ? "text-yellow-400"
                        : "text-red-400"
                    }`}
                  >
                    {item.fraudScore}/100
                  </span>
                </p>
              </div>

              <div className="mt-5 border-t border-white/10 pt-4">
                <p className="text-[#93A79A] leading-7">
                  {item.reason}
                </p>
              </div>

              <button
                onClick={() =>
                  navigate(`/campaign/${item._id}`)
                }
                className="mt-6 w-full bg-[#E7B14C] text-[#14201B] py-3 rounded-xl font-semibold hover:bg-yellow-400 transition"
              >
                View Campaign →
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}