import { Heart, LayoutDashboard, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function DonorSidebar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <aside className="w-72 bg-[#101916] border-r border-white/10 p-8 flex flex-col">

      <h1 className="hero-title text-3xl text-white mb-12">
        ImpactBridge
      </h1>

      <nav className="space-y-4">

        <Link
          to="/dashboard"
          className="flex items-center gap-3 rounded-xl p-4 text-white hover:bg-white/10"
        >
          <LayoutDashboard size={20} />
          Dashboard
        </Link>

        <Link
          to="/campaigns"
          className="flex items-center gap-3 rounded-xl p-4 text-white hover:bg-white/10"
        >
          <Heart size={20} />
          Campaigns
        </Link>

      </nav>

      <button
        onClick={logout}
        className="mt-auto flex items-center gap-3 rounded-xl p-4 text-red-400 hover:bg-red-500/10"
      >
        <LogOut size={20} />
        Logout
      </button>

    </aside>
  );
}