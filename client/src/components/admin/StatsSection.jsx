import { useEffect, useState } from "react";
import {
  Landmark,
  Building2,
  FolderKanban,
  Users,
} from "lucide-react";

import StatCard from "./StatCard";
import { getDashboard } from "../../services/adminService";

export default function StatsSection() {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await getDashboard(token);

      const dashboard = res.dashboard;

      setStats([
        {
          id: 1,
          title: "Total Donations",
          value: `₹${dashboard.totalFundsRaised}`,
          icon: Landmark,
        },
        {
          id: 2,
          title: "Verified NGOs",
          value: dashboard.approvedNGOs,
          icon: Building2,
        },
        {
          id: 3,
          title: "Campaigns",
          value: dashboard.totalCampaigns,
          icon: FolderKanban,
        },
        {
          
  id: 4,
  title: "Users",
  value: dashboard.totalUsers,
  icon: Users,

        },
      ]);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <StatCard
          key={stat.id}
          title={stat.title}
          value={stat.value}
          Icon={stat.icon}
        />
      ))}
    </div>
  );
}