import Sidebar from "../components/admin/Sidebar";
import Topbar from "../components/admin/Topbar";
import StatsSection from "../components/admin/StatsSection";
import PendingNGOs from "../components/admin/PendingNGOs";
import RecentActivity from "../components/admin/RecentActivity";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-[#14201B] text-white flex">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-10 overflow-y-auto">

        {/* Topbar */}
        <Topbar />

        {/* Page Header */}
        <div className="mt-10 mb-10">
          <h1 className="hero-title text-4xl text-white">
            Admin Dashboard
          </h1>

          <p className="mt-3 text-[#93A79A]">
            Monitor ImpactBridge activity, NGOs, campaigns and donations.
          </p>
        </div>

        {/* Statistics */}
        <StatsSection />

        {/* Dashboard Content */}
        <div className="mt-10 grid grid-cols-1 xl:grid-cols-3 gap-8">

          {/* Pending NGOs */}
          <div className="xl:col-span-2">
            <PendingNGOs />
          </div>

          {/* Recent Activity */}
          <div>
            <RecentActivity />
          </div>

        </div>

      </main>

    </div>
  );
}