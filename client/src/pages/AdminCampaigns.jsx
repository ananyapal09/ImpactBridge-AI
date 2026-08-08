import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2, Eye } from "lucide-react";
import {
  getAllCampaignsAdmin,
  deleteCampaignAdmin,
} from "../services/adminService";
export default function AdminCampaigns() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      const token = localStorage.getItem("token");

      const data = await getAllCampaignsAdmin(token);

      console.log(data);

      setCampaigns(data.campaigns);
    } catch (err) {
      console.log(err.response?.status);
      console.log(err.response?.data);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#14201B] text-white flex items-center justify-center">
        <h1 className="text-3xl">Loading Campaigns...</h1>
      </div>
    );
  }
 const handleDelete = async (id) => {
  const confirmDelete = window.confirm(
    "Delete this campaign?"
  );

  if (!confirmDelete) return;

  try {
    const token = localStorage.getItem("token");

    await deleteCampaignAdmin(id, token);

    setCampaigns((prev) =>
      prev.filter((c) => c._id !== id)
    );

    alert("Campaign Deleted");

  } catch (error) {
    console.error(error);
    alert("Delete Failed");
  }
};
  return (
    <div className="min-h-screen bg-[#14201B] text-white p-10">
      <h1 className="text-4xl font-bold mb-8">
        Campaign Management
      </h1>

      <div className="space-y-5">
        {campaigns.map((campaign) => (
          <div
            key={campaign._id}
            className="bg-[#1B2A24] rounded-xl p-6 border border-white/5"
          >
            <div className="grid grid-cols-6 gap-6 items-center">

              {/* Campaign Info */}
              <div>
                <h2 className="text-2xl font-bold">
                  {campaign.title}
                </h2>

                <p className="text-gray-400">
                  {campaign.category}
                </p>

                <p className="mt-2 text-sm">
                  NGO:{" "}
                  <span className="text-[#E7B14C]">
                    {campaign.ngo?.user?.name || "Unknown NGO"}
                  </span>
                </p>
              </div>

              {/* Raised */}
              <div>
                <p className="text-gray-400 text-sm">Raised</p>

                <p className="font-semibold text-lg text-[#E7B14C]">
                  ₹{campaign.raisedAmount}
                </p>
              </div>

              {/* Goal */}
              <div>
                <p className="text-gray-400 text-sm">Goal</p>

                <p className="font-semibold text-lg text-[#E7B14C]">
                  ₹{campaign.goalAmount}
                </p>
              </div>

              {/* Fraud Score */}
              <div>
                <p className="text-gray-400 text-sm">
                  Fraud Score
                </p>

                <p
                  className={`font-bold ${
                    campaign.fraudScore >= 80
                      ? "text-red-500"
                      : campaign.fraudScore >= 40
                      ? "text-yellow-400"
                      : "text-green-400"
                  }`}
                >
                  {campaign.fraudScore}%
                </p>
              </div>

              {/* Status */}
              <div>
                <span
                  className={`px-4 py-2 rounded-full text-sm font-semibold ${
                    campaign.status === "active"
                      ? "bg-green-600"
                      : campaign.status === "completed"
                      ? "bg-blue-600"
                      : "bg-red-600"
                  }`}
                >
                  {campaign.status}
                </span>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 justify-end">

                <button
                  onClick={() =>
                    navigate(`/campaign/${campaign._id}`)
                  }
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition"
                >
                  <Eye size={16} />
                  View
                </button>

                <button
                  onClick={() => handleDelete(campaign._id)}
                  className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition"
                >
                  <Trash2 size={16} />
                  Delete
                </button>

              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}