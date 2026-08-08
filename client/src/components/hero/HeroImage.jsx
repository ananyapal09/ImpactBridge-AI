 export default function HeroImage() {
  return (
    <div className="relative flex justify-center items-center">

      {/* Background Glow */}
      <div className="absolute w-[780px] h-[620px] rounded-full bg-[#335B43] blur-[180px] opacity-30"></div>

      <div className="relative">

        {/* Main Image */}
        <img
          src="/images/hero/hero.jpg"
          alt="Children smiling together"
          className="
            w-[700px]
            h-[450px]
            object-cover
            object-[40%_28%]
            rounded-[34px]
            border border-white/10
            shadow-[0_35px_80px_rgba(0,0,0,0.45)]
            transition-all
            duration-500
            hover:scale-[1.02]
          "
        />

        {/* Verified NGO Badge */}
        <div
          className="
            absolute
            top-5
            left-5
            flex
            items-center
            gap-3
            px-5
            py-3
            rounded-[24px]
            bg-white/10
            backdrop-blur-xl
            border
            border-white/15
            shadow-2xl
          "
        >
          <div
            className="
              w-10
              h-10
              rounded-full
              bg-[#B7E4C7]
              flex
              items-center
              justify-center
            "
          >
            <span className="text-[#081C15] text-lg font-bold">✓</span>
          </div>

          <div>
            <p className="text-white font-semibold text-[17px] leading-none">
              Verified NGO
            </p>

            <p className="mt-1 text-sm text-[#D5E6D2]">
              AI Checked
            </p>
          </div>
        </div>

        {/* Trust Score Card */}
        <div
          className="
            absolute
            -bottom-5
            -right-5
            flex
            items-center
            gap-3
            px-5
            py-3
            rounded-[24px]
            bg-white/10
            backdrop-blur-xl
            border
            border-white/15
            shadow-2xl
          "
        >
          <div
            className="
              w-10
              h-10
              rounded-full
              bg-[#B7E4C7]
              flex
              items-center
              justify-center
            "
          >
            <span className="text-[#081C15] text-sm font-bold">
              ★
            </span>
          </div>

          <div>
            <h2 className="text-4xl font-extrabold text-white leading-none">
              98%
            </h2>

            <p className="mt-1 text-sm text-[#D5E6D2]">
              Trust Score
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}