import { useNavigate } from "react-router-dom";
import Sidebar from "../components/admin/Sidebar";
import Topbar from "../components/admin/Topbar";
import PendingNGOs from "../components/admin/PendingNGOs";

export default function AdminNGOs() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#14201B] text-white flex">

      <Sidebar />

      <main className="flex-1 p-10 overflow-y-auto">

        <Topbar />

        <div className="mt-10">

          <div className="mb-10">
            <h1 className="hero-title text-4xl text-white">
              NGO Approvals
            </h1>

            <p className="mt-3 text-[#93A79A]">
              Review and verify NGOs before they can operate as
              verified organizations on ImpactBridge.
            </p>
          </div>

          <PendingNGOs />

          <button
            onClick={() => navigate("/admin")}
            className="mt-8 rounded-xl border border-white/10 px-6 py-3 text-[#93A79A] hover:bg-white/5 hover:text-white transition"
          >
            ← Back to Dashboard
          </button>

        </div>

      </main>

    </div>
  );
}