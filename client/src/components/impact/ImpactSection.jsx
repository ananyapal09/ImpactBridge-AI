import StatCard from "./StatCard";
import impactData from "./impactData";

export default function ImpactSection() {
  return (
    <section className="relative bg-[#14201B] py-32 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] rounded-full bg-[#2D6A4F] opacity-15 blur-[170px]" />

      <div className="relative max-w-7xl mx-auto px-8 lg:px-20">
        {/* Heading */}
        <div className="max-w-2xl mx-auto text-center">
          <span className="uppercase tracking-[5px] text-[#E7B14C] text-sm font-semibold">
            OUR IMPACT
          </span>

          <h2 className="hero-title text-5xl lg:text-[56px] leading-tight text-white mt-6">
            Creating measurable
            <br />
            change together.
          </h2>

          <p className="mt-6 text-[#93A79A] text-lg lg:text-xl leading-9">
            Every contribution is verified, tracked, and transformed into
            measurable impact across communities through trusted NGOs.
          </p>

          {/* Divider */}
          <div className="w-24 h-px bg-[#E7B14C]/30 mx-auto my-12"></div>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {impactData.map((stat) => (
            <StatCard
              key={stat.id}
              stat={stat}
            />
          ))}
        </div>
      </div>
    </section>
  );
}