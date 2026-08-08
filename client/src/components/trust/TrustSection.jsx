import TrustCard from "./TrustCard";
import trustData from "./trustData";

export default function TrustSection() {
  return (
    <section
      id="about"
     className="relative bg-[#14201B] py-32 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] rounded-full bg-[#2D6A4F] opacity-20 blur-[170px]" />

      <div className="relative max-w-7xl mx-auto px-8 lg:px-20">
        {/* Heading */}
        <div className="max-w-2xl mx-auto text-center">
          <span className="uppercase tracking-[5px] text-[#E7B14C] text-sm font-semibold">
            WHY TRUST IMPACTBRIDGE
          </span>

          <h2 className="hero-title text-5xl lg:text-[56px] text-white leading-tight mt-6">
            Technology meets
            <br />
            transparency.
          </h2>

          <p className="mt-6 text-[#93A79A] text-lg lg:text-xl leading-9">
            Our AI-powered verification and transparent donation platform
            ensure every contribution creates measurable impact—from
            donation to delivery.
          </p>
        </div>
         <div className="w-24 h-px bg-[#E7B14C]/30 mx-auto my-12"></div>
        {/* Trust Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-20">
          {trustData.map((feature) => (
            <TrustCard
              key={feature.id}
              feature={feature}
            />
          ))}
        </div>
      </div>
    </section>
  );
}