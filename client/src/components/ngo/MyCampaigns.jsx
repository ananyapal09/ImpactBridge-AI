import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyCampaigns } from "../../services/campaignService";
import CampaignRow from "./CampaignRow";

export default function MyCampaigns({ search }) {
  const navigate = useNavigate();

  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    loadCampaigns();
  }, []);

  const loadCampaigns = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await getMyCampaigns(token);

      setCampaigns(res.campaigns);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteCampaign = (deletedId) => {
    setCampaigns((prevCampaigns) =>
      prevCampaigns.filter(
        (campaign) => campaign._id !== deletedId
      )
    );
  };

  // Search Filter
  const filteredCampaigns = campaigns.filter((campaign) =>
    campaign.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-8">

      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">

        <div>
          <h2 className="hero-title text-3xl text-white">
            My Campaigns
          </h2>

          <p className="mt-2 text-[#93A79A]">
            Manage all your campaigns
          </p>
        </div>

        <button
          onClick={() => navigate("/ngo-dashboard/create")}
          className="rounded-xl bg-[#E7B14C] px-6 py-3 font-semibold text-[#14201B] transition hover:scale-105"
        >
          + Create Campaign
        </button>

      </div>

      {/* Empty State */}
      {filteredCampaigns.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">

          <div className="text-7xl">
            📂
          </div>

          <h3 className="mt-6 text-3xl font-bold text-white">
            No Campaigns Yet
          </h3>

          <p className="mt-3 max-w-md text-center text-[#93A79A]">
            Start your first campaign and inspire people
            to support meaningful causes.
          </p>

          <button
            onClick={() => navigate("/ngo-dashboard/create")}
            className="mt-8 rounded-xl bg-[#E7B14C] px-8 py-3 font-semibold text-[#14201B] transition hover:scale-105"
          >
            + Create Campaign
          </button>

        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

          {filteredCampaigns.map((campaign) => (
            <CampaignRow
              key={campaign._id}
              campaign={campaign}
              onDelete={handleDeleteCampaign}
            />
          ))}

        </div>
      )}

    </div>
  );
}