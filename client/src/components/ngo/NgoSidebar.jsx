import {
  LayoutDashboard,
  FolderKanban,
  PlusCircle,
  Settings,
  LogOut,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

export default function NgoSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const isDashboard =
    location.pathname === "/ngo-dashboard";

  const isCreate =
    location.pathname === "/ngo-dashboard/create";

  const isCampaigns =
    location.pathname === "/ngo-dashboard/campaigns";

  const isSettings =
    location.pathname === "/ngo-dashboard/settings";

  const buttonClass = (active) =>
    `flex items-center gap-3 w-full text-left px-4 py-3 rounded-xl transition ${
      active
        ? "bg-[#E7B14C]/10 text-[#E7B14C]"
        : "hover:bg-white/5 text-white"
    }`;

  return (
    <aside className="w-72 bg-[#101916] border-r border-white/10 p-8 min-h-screen">

      {/* Logo */}

      <h1 className="hero-title text-3xl text-white">
        ImpactBridge
      </h1>

      <p className="text-[#E7B14C] mt-2 text-sm">
        NGO PANEL
      </p>

      {/* Navigation */}

      <nav className="mt-12 space-y-3">

        {/* Dashboard */}

        <button
          onClick={() => navigate("/ngo-dashboard")}
          className={buttonClass(isDashboard)}
        >
          <LayoutDashboard size={20} />
          Dashboard
        </button>

        {/* My Campaigns */}

        <button
          onClick={() => navigate("/ngo-dashboard/campaigns")}
          className={buttonClass(isCampaigns)}
        >
          <FolderKanban size={20} />
          My Campaigns
        </button>

        {/* Create Campaign */}

        <button
          onClick={() => navigate("/ngo-dashboard/create")}
          className={buttonClass(isCreate)}
        >
          <PlusCircle size={20} />
          Create Campaign
        </button>

        {/* Settings */}

        <button
          onClick={() => navigate("/ngo-dashboard/settings")}
          className={buttonClass(isSettings)}
        >
          <Settings size={20} />
          Settings
        </button>

      </nav>

      {/* Logout */}

      <button
        onClick={handleLogout}
        className="flex items-center gap-3 mt-20 text-red-400 hover:text-red-300 transition-colors"
      >
        <LogOut size={20} />
        Logout
      </button>

    </aside>
  );
}