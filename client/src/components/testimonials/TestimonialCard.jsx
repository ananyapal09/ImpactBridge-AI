import { Star, BadgeCheck } from "lucide-react";

export default function TestimonialCard({ testimonial }) {
  const initial = testimonial.name.charAt(0);

  return (
    <div
      className="
      group
      rounded-[30px]
      border
      border-white/10
      bg-white/5
      backdrop-blur-xl
      p-8
      transition-all
      duration-500
      hover:-translate-y-2
      hover:border-[#E7B14C]/40
      hover:bg-white/[0.07]
      hover:shadow-[0_20px_60px_rgba(231,177,76,0.08)]
      "
    >
      {/* Stars */}

      <div className="flex gap-1">
        {[...Array(testimonial.rating)].map((_, index) => (
          <Star
            key={index}
            size={16}
            className="fill-[#E7B14C] text-[#E7B14C]"
          />
        ))}
      </div>

      {/* Review */}

      <p
        className="
        mt-6
        text-[#E8EEE9]
        text-lg
        leading-8
        italic
        "
      >
        “{testimonial.review}”
      </p>

      {/* Divider */}

      <div className="w-full h-px bg-white/10 my-8"></div>

      {/* User */}

      <div className="flex items-center gap-4">
        {/* Avatar */}

        <div
          className="
          w-14
          h-14
          rounded-full
          bg-gradient-to-br
          from-[#E7B14C]
          to-[#D89E2B]
          flex
          items-center
          justify-center
          text-[#14201B]
          font-bold
          text-xl
          shadow-lg
          shadow-[#E7B14C]/20
          "
        >
          {initial}
        </div>

        {/* Name */}

        <div>
          <h4 className="text-white font-semibold text-lg">
            {testimonial.name}
          </h4>

          <div className="flex items-center gap-2 mt-1">
            <BadgeCheck
              size={15}
              className="text-[#4CAF72]"
            />

            <span className="text-[#93A79A] text-sm">
              {testimonial.role}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}