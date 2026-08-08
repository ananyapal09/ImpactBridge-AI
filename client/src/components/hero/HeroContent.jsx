export default function HeroContent() {
  return (
    <div className="max-w-xl">

      <div className="flex items-center gap-3 mb-6">
        <div className="h-px w-10 bg-amber-500"></div>
        <span className="uppercase tracking-[3px] text-xs text-amber-400 font-semibold">
          AI VERIFIED GIVING
        </span>
      </div>

      <h1 className="font-serif text-[#F5F2EA] text-6xl lg:text-7xl font-bold leading-[1.05]">

        Every donation,

        <br />

        creates a life

        <br />

        <span className="text-[#9DB497]">
          it changed.
        </span>

      </h1>

      <p className="mt-8 text-lg text-[#A6B3A7] leading-8">

        We verify every NGO before it raises a single rupee,
        track every donation with transparency, and help
        donors create real impact through AI-assisted giving.

      </p>

      <div className="flex gap-4 mt-10">

        <button className="px-8 py-4 rounded-xl bg-[#D9A441] text-black font-semibold hover:scale-105 duration-300">

          Explore Campaigns

        </button>

        <button className="px-8 py-4 rounded-xl border border-[#314134] text-[#F5F2EA] hover:bg-[#1E2A22] duration-300">

          Become a Donor

        </button>

      </div>

      <div className="flex gap-12 mt-14">

        <div>
          <h2 className="text-4xl font-bold text-[#F5F2EA]">₹52L+</h2>
          <p className="text-[#9AA59B] mt-1">Funds Raised</p>
        </div>

        <div>
          <h2 className="text-4xl font-bold text-[#F5F2EA]">800+</h2>
          <p className="text-[#9AA59B] mt-1">Campaigns</p>
        </div>

        <div>
          <h2 className="text-4xl font-bold text-[#F5F2EA]">12K+</h2>
          <p className="text-[#9AA59B] mt-1">Donors</p>
        </div>

      </div>

    </div>
  );
}