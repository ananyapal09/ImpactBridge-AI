import { useEffect, useState } from "react";
import {
  FolderKanban,
  PlayCircle,
  CheckCircle,
  IndianRupee,
  TrendingUp,
} from "lucide-react";
import { getMyCampaigns } from "../../services/campaignService";

function StatCard({
  title,
  value,
  subtitle,
  Icon,
  iconBg,
  iconColor,
}) {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#E7B14C]/40 hover:shadow-[0_20px_40px_rgba(231,177,76,0.12)]">

      {/* Glow */}
      <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[#E7B14C]/10 blur-3xl opacity-0 group-hover:opacity-100 transition duration-500" />

      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-sm text-[#93A79A] tracking-wide">
            {title}
          </p>

          <h2 className="mt-3 text-4xl font-bold text-white">
            {value}
          </h2>

          <div className="mt-4 flex items-center gap-2 text-sm text-[#7DA08B]">
            <TrendingUp size={16} />
            <span>{subtitle}</span>
          </div>
        </div>

        <div
          className={`rounded-2xl p-4 ${iconBg} transition-transform duration-300 group-hover:scale-110`}
        >
          <Icon
            size={28}
            className={iconColor}
          />
        </div>
      </div>
    </div>
  );
}

export default function NgoStats() {
  const [stats, setStats] = useState({
    totalCampaigns: 0,
    activeCampaigns: 0,
    completedCampaigns: 0,
    totalFundsRaised: 0,
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await getMyCampaigns(token);
      setStats(res.stats);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">

      <StatCard
        title="Total Campaigns"
        value={stats.totalCampaigns}
        subtitle="Campaigns created"
        Icon={FolderKanban}
        iconBg="bg-blue-500/15"
        iconColor="text-blue-400"
      />

      <StatCard
        title="Active Campaigns"
        value={stats.activeCampaigns}
        subtitle="Currently running"
        Icon={PlayCircle}
        iconBg="bg-green-500/15"
        iconColor="text-green-400"
      />

      <StatCard
        title="Completed"
        value={stats.completedCampaigns}
        subtitle="Successfully finished"
        Icon={CheckCircle}
        iconBg="bg-purple-500/15"
        iconColor="text-purple-400"
      />

      <StatCard
        title="Funds Raised"
        value={`₹${stats.totalFundsRaised.toLocaleString()}`}
        subtitle="Across all campaigns"
        Icon={IndianRupee}
        iconBg="bg-[#E7B14C]/15"
        iconColor="text-[#E7B14C]"
      />

    </div>
  );
}