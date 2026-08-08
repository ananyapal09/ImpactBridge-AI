export default function StatCard({ stat }) {
  return (
    <div
      className="
        group
        rounded-[28px]
        border
        border-white/10
        bg-white/5
        backdrop-blur-xl
        py-12 px-10
        text-center
        transition-all
        duration-500
        hover:-translate-y-2
        hover:border-[#E7B14C]/40
        hover:bg-white/[0.07]
        hover:shadow-[0_20px_60px_rgba(231,177,76,0.08)]
      "
    >
      <h3
        className="
          hero-title
          text-5xl
          lg:text-6xl
          text-white
        "
      >
        {stat.number}
      </h3>

      <p
        className="
          mt-4
          text-[#93A79A]
          text-lg
          tracking-wide
          font-medium
        "
      >
        {stat.label}
      </p>
    </div>
  );
}