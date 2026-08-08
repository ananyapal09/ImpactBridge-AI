import {
  Bell,
  Plus,
  Search,
  Sparkles,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function NgoTopbar({
  search,
  setSearch,
}) {
  const navigate = useNavigate();

  const hour = new Date().getHours();

  let greeting = "Good Evening";

  if (hour < 12) greeting = "Good Morning";
  else if (hour < 17) greeting = "Good Afternoon";

  return (
    <>
      {/* Top Bar */}
      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-5xl font-bold text-white">
            {greeting} 👋
          </h1>

          <p className="mt-3 text-lg text-[#93A79A]">
            Welcome back! Here's what's happening with your campaigns.
          </p>
        </div>

        <div className="flex items-center gap-4">

          <div className="relative">

            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#93A79A]"
            />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search campaigns..."
              className="w-72 rounded-2xl border border-white/10 bg-white/5 py-3 pl-11 pr-4 text-white outline-none transition focus:border-[#E7B14C]"
            />

          </div>

          <button className="rounded-2xl border border-white/10 bg-white/5 p-3 transition hover:border-[#E7B14C]">
            <Bell className="text-white" />
          </button>

        </div>

      </div>

      {/* Hero Card */}
      <div className="relative mt-10 overflow-hidden rounded-3xl border border-[#E7B14C]/20 bg-gradient-to-r from-[#1B2A24] via-[#21352D] to-[#14201B] p-8">

        {/* Glow */}
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#E7B14C]/10 blur-3xl" />

        <div className="relative flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">

          <div>

            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#E7B14C]/15 px-4 py-2 text-sm font-semibold text-[#E7B14C]">
              <Sparkles size={16} />
              Making a Difference Every Day
            </div>

            <h2 className="max-w-3xl text-5xl font-bold leading-tight text-white">
              Empower communities.
              <br />
              Change lives through
              <span className="text-[#E7B14C]">
                {" "}ImpactBridge.
              </span>
            </h2>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#93A79A]">
              Create campaigns, manage donations,
              monitor progress and inspire thousands
              of people to contribute towards meaningful causes.
            </p>

          </div>

          <div className="flex flex-col gap-4">

            <button
              onClick={() => navigate("/ngo-dashboard/create")}
              className="flex items-center gap-3 rounded-2xl bg-[#E7B14C] px-7 py-4 text-lg font-semibold text-[#14201B] transition hover:scale-105"
            >
              <Plus size={22} />
              Create Campaign
            </button>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">

              <p className="text-sm text-[#93A79A]">
                Impact Score
              </p>

              <h2 className="mt-2 text-4xl font-bold text-white">
                98%
              </h2>

              <p className="mt-2 text-sm text-green-400">
                ▲ Excellent performance
              </p>

            </div>

          </div>

        </div>

      </div>
    </>
  );
}