import {
  LayoutDashboard,
  Building2,
  FolderKanban,
  HeartHandshake,
  Users,
  LogOut,
  BarChart3,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const menu = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    path: "/admin",
  },
  {
    icon: Building2,
    label: "NGO Approvals",
    path: "/admin/ngos",
  },
  {
    icon: FolderKanban,
    label: "Campaigns",
    path: "/admin/campaigns",
  },
  {
    icon: HeartHandshake,
    label: "Donations",
    path: "/admin/donations",
  },
  {
    icon: Users,
    label: "Users",
    path: "/admin/users",
  },
      
 {
  icon: BarChart3,
  label: "Analytics",
  path: "/admin/analytics",
},
];

export default function Sidebar() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className="w-72 min-h-screen bg-[#101A16] border-r border-white/10 flex flex-col">
      {/* Logo */}
      <div className="px-8 py-8">
        <h1 className="hero-title text-4xl text-white">
          ImpactBridge
        </h1>

        <p className="text-[#E7B14C] text-xs tracking-[0.25em] mt-3 uppercase">
          Admin Panel
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-5">
        {menu.map(({ icon: Icon, label, path }) => (
          <NavLink
            key={label}
            to={path}
            className={({ isActive }) =>
              `flex items-center gap-4 px-5 py-4 rounded-xl mb-2 transition ${
                isActive
                  ? "bg-[#E7B14C] text-[#14201B] font-semibold"
                  : "text-[#93A79A] hover:bg-white/5 hover:text-white"
              }`
            }
          >
            <Icon size={20} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-5">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-4 px-5 py-4 rounded-xl text-red-400 hover:bg-red-500/10 transition"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
