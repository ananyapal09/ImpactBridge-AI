import { ArrowRight } from "lucide-react";

export default function TrustCard({ feature }) {
  const Icon = feature.icon;

  return (
    <div
      className="
        group
        rounded-[30px]
        border
        border-white/10
        bg-white/5
        backdrop-blur-xl
        p-7
        transition-all
        duration-500
        hover:-translate-y-2
        hover:border-[#E7B14C]/40
        hover:bg-white/[0.07]
        hover:shadow-[0_25px_70px_rgba(0,0,0,0.35)]
      "
    >
      {/* Icon */}
      <div
        className="
          flex
          items-center
          justify-center
          w-14
          h-14
          rounded-2xl
          group-hover:shadow-lg
group-hover:shadow-[#E7B14C]/30
          border
          border-[#E7B14C]/20
          transition-all
          duration-300
          group-hover:bg-[#E7B14C]/25
          group-hover:scale-110
        "
      >
        <Icon
          size={26}
          className="text-[#E7B14C]"
        />
      </div>

      {/* Title */}
      <h3 className="hero-title text-3xl text-white mt-8">
        {feature.title}
      </h3>

      {/* Description */}
      <p className="mt-5 text-[#93A79A] leading-8 text-base">
        {feature.description}
      </p>

      {/* Learn More */}
      <button
        className="
          mt-6
          flex
          items-center
          gap-2
          text-[#E7B14C]
          font-semibold
          transition-all
          duration-300
          group-hover:gap-3
        "
      >
        Explore Feature

        <ArrowRight
          size={18}
          className="
            transition-transform
            duration-300
            group-hover:translate-x-1
          "
        />
      </button>
    </div>
  );
}