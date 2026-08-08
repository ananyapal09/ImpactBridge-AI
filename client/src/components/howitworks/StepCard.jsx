import { ArrowRight } from "lucide-react";

export default function StepCard({
  step,
  icon,
  title,
  description,
  featured = false,
  action,
}) {
  return (
    <div
      className={`
group
relative
overflow-hidden
rounded-[28px]
border
border-white/10
bg-white/5
backdrop-blur-xl
p-8
transition-all
duration-500
hover:-translate-y-3
hover:bg-white/10
hover:shadow-[0_20px_60px_rgba(0,0,0,0.25)]

${featured ? "lg:-translate-y-5 lg:scale-105 border-[#E7B14C]/30" : ""}
`}
    >
      {/* Step Number */}
      <div className="text-[#E7B14C] text-sm font-semibold tracking-[4px] uppercase">
        Step {step}
      </div>

      {/* Icon — stronger contrast against the card so it reads as an
          accent moment, matching the weight of the hero's badges */}
      <div
        className="
        mt-6
        w-20
        h-20
        rounded-3xl
        bg-[#E7B14C]/25
        border
        border-[#E7B14C]/40
        flex
        items-center
        justify-center
        text-[#E7B14C]
        "
      >
        {icon}
      </div>

      {/* Title */}
      <h3 className="hero-title text-3xl text-white mt-8">{title}</h3>

      {/* Description — reuses the same muted token as the hero body copy
          (#93A79A) instead of a slightly-different one-off gray */}
      <p className="text-[#93A79A] leading-8 mt-5">{description}</p>

      {/* Link */}
      <button
  type="button"
  className="
  mt-10
  flex
  items-center
  gap-2
  text-[#E7B14C]
  font-medium
  transition-all
  group-hover:gap-4
  "
>
  {action}
  <ArrowRight size={18} />
</button>
    </div>
  );
}