import { Search, Bell, Sparkles } from "lucide-react";

export default function DonorTopbar() {
  const hour = new Date().getHours();

  let greeting = "Good Evening";

  if (hour < 12) greeting = "Good Morning";
  else if (hour < 17) greeting = "Good Afternoon";

  return (
    <>
      {/* Top */}

      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-5xl font-bold text-white">
            {greeting} 👋
          </h1>

          <p className="mt-3 text-lg text-[#93A79A]">
            Thank you for making a difference through your donations.
          </p>
        </div>

        <div className="flex items-center gap-4">

          <div className="relative">

            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#93A79A]"
            />

            <input
              placeholder="Search donations..."
              className="w-72 rounded-2xl border border-white/10 bg-white/5 py-3 pl-11 pr-4 text-white outline-none"
            />

          </div>

          <button className="rounded-2xl border border-white/10 bg-white/5 p-3">
            <Bell className="text-white" />
          </button>

        </div>

      </div>

      {/* Hero */}

      <div className="relative mt-10 overflow-hidden rounded-3xl border border-[#E7B14C]/20 bg-gradient-to-r from-[#1B2A24] via-[#21352D] to-[#14201B] p-8">

        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#E7B14C]/10 blur-3xl" />

        <div className="relative">

          <div className="inline-flex items-center gap-2 rounded-full bg-[#E7B14C]/15 px-4 py-2 text-sm font-semibold text-[#E7B14C]">

            <Sparkles size={16} />

            Every Donation Matters

          </div>

          <h2 className="mt-6 text-5xl font-bold text-white">

            You are changing
            <br />

            lives every day.

          </h2>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#93A79A]">

            Thank you for supporting verified NGOs.
            Every contribution helps build a better future.

          </p>

        </div>

      </div>

    </>
  );
}