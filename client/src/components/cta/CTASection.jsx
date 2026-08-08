import { ArrowRight, Building2 } from "lucide-react";

export default function CTASection() {
  return (
    <section className="relative bg-[#14201B] py-36 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 flex justify-center">
        <div className="w-[900px] h-[450px] rounded-full bg-[#3FA16B] opacity-25 blur-[180px]" />
      </div>

      <div className="relative max-w-5xl mx-auto px-8 text-center">
        {/* Label */}
        <span className="uppercase tracking-[5px] text-[#E7B14C] text-sm font-semibold">
          START MAKING A DIFFERENCE
        </span>

        {/* Heading */}
        <h2 className="hero-title text-5xl lg:text-7xl text-white leading-tight mt-6">
          Every donation
          <br />
          creates hope.
        </h2>

        {/* Description */}
        <p className="max-w-2xl mx-auto mt-8 text-[#93A79A] text-lg lg:text-xl leading-9">
          Join thousands of donors supporting verified NGOs across India.
          Together, we can create measurable impact for communities that need
          it the most.
        </p>

        {/* Divider */}
        <div className="w-24 h-px bg-[#E7B14C]/30 mx-auto my-12"></div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          {/* Primary */}
          <button
            className="
            group
            flex
            items-center
            justify-center
            gap-3
            rounded-2xl
            bg-[#E7B14C]
            px-10
            py-5
            text-[#14201B]
            font-semibold
            transition-all
            duration-300
            hover:bg-[#F0BC56]
            hover:scale-105
            hover:shadow-[0_20px_60px_rgba(231,177,76,0.35)]
            "
          >
            Start Donating

            <ArrowRight
              size={20}
              className="transition-transform group-hover:translate-x-1"
            />
          </button>

          {/* Secondary */}
          <button
            className="
            group
            flex
            items-center
            justify-center
            gap-3
            rounded-2xl
            border
            border-white/10
            bg-white/5
            backdrop-blur-xl
            px-8
            py-4
            text-white
            font-semibold
            transition-all
            duration-300
            hover:border-[#E7B14C]/40
            hover:bg-white/[0.08]
            hover:scale-105
            "
          >
            <Building2 size={20} />

            Register NGO
          </button>
        </div>
        <div className="mt-8 flex flex-wrap justify-center items-center gap-3 text-sm text-[#A8B9AE]">
  <span>✓ 12,000+ Donors</span>
  <span>•</span>
  <span>450+ Verified NGOs</span>
  <span>•</span>
  <span>100% Secure Donations</span>
</div>
    </div>
    </section>
  );
}