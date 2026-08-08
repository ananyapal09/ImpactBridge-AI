import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import CampaignCard from "./CampaignCard";
import { getAllCampaigns } from "../../services/campaignService";

export default function CampaignSection() {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      const res = await getAllCampaigns();
      setCampaigns(res.campaigns);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="relative bg-[#14201B] py-32 overflow-hidden">

      <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[700px] h-[350px] rounded-full bg-[#2D6A4F] opacity-20 blur-[170px]" />

      <div className="relative max-w-7xl mx-auto px-8 lg:px-20">

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">

          <div className="max-w-2xl">

            <span className="uppercase tracking-[5px] text-[#E7B14C] text-sm font-semibold">
              FEATURED CAMPAIGNS
            </span>

            <h2 className="hero-title text-5xl lg:text-6xl text-white mt-6">
              Support causes
              <br />
              changing lives.
            </h2>

            <p className="mt-6 text-[#93A79A] text-xl leading-9">
              Every campaign is AI verified before fundraising begins.
              Donate with confidence and track real impact.
            </p>

          </div>

          <Link
            to="/campaigns"
            className="group flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-4 text-white backdrop-blur-xl hover:border-[#E7B14C]/40"
          >
            View All Campaigns

            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition"
            />
          </Link>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mt-20">

          {campaigns.slice(0,3).map((campaign) => (
            <CampaignCard
              key={campaign._id}
              campaign={campaign}
            />
          ))}

        </div>

      </div>

    </section>
  );
}