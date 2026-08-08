export default function StatCard({
  title,
  value,
  Icon,
}) {
  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-[#E7B14C]/40 transition-all duration-300">

      <div className="flex justify-between items-start">

        <div>
          <p className="text-[#93A79A] text-sm">
            {title}
          </p>

          <h2 className="hero-title text-4xl text-white mt-3">
            {value}
          </h2>
        </div>

        <div className="w-14 h-14 rounded-xl bg-[#E7B14C]/10 flex items-center justify-center">

          <Icon
            className="text-[#E7B14C]"
            size={28}
          />

        </div>

      </div>

    </div>
  );
}