import { Search, HeartHandshake, BarChart3 } from "lucide-react";
import StepCard from "./StepCard";

export default function HowItWorks() {
  return (
    // Background now matches the hero's #14201B token instead of a
    // separate #081C15 — removes the visible seam between sections.
    <section className="relative bg-[#14201B] py-32">
      <div className="max-w-[1400px] mx-auto px-8 lg:px-20">
        {/* Heading */}
        <div className="text-center max-w-4xl mx-auto">
          <span className="uppercase tracking-[5px] text-[#E7B14C] text-sm font-semibold">
            SIMPLE PROCESS
          </span>
          <h2 className="hero-title text-7xl leading-none text-white mt-6">
            How ImpactBridge Works
          </h2>
          <p className="mt-6 text-[#93A79A] text-xl leading-9">
            Support verified NGOs with confidence.
From discovery to impact tracking,
every step is secure, transparent,
and designed to build trust.
          </p>
        </div>

        {/* Cards */}
        <div className="relative grid lg:grid-cols-3 gap-8 mt-20">
          {/* Connecting line — a literal "bridge" between the three steps,
              tying the layout to the brand name instead of a plain
              3-card grid. Desktop only; on mobile the cards stack and
              the line would just look broken. */}
          <div
            className="hidden lg:block absolute top-[68px] left-[16.5%] right-[16.5%] h-px bg-[#E7B14C]/30 pointer-events-none"
            aria-hidden="true"
          />

          <StepCard
            step="01"
            icon={<Search size={40} />}
            title="Browse"
            description="Discover AI-verified campaigns across education, healthcare, disaster relief, and more."
            action="Browse Campaigns"

          />
          <StepCard
          featured
            step="02"
            icon={<HeartHandshake size={40} />}
            title="Donate"
            description="Contribute securely using trusted payments with complete transparency and instant confirmation."
            action="Donate Securely"

          />
          <StepCard
            step="03"
            icon={<BarChart3 size={40} />}
            title="Track"
            description="Receive AI-generated reports, impact updates and donation insights so you always know where your contribution went."
            action="View Impact"

          />
        </div>
      </div>
    </section>
  );
}