import { useNavigate } from "react-router-dom";
import HeroImage from "./HeroImage";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-[#081C15]">

      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#1F4D34_0%,transparent_40%)]"></div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,#2D6A4F20_0%,transparent_50%)]"></div>

      <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(rgba(255,255,255,.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.12)_1px,transparent_1px)] bg-[size:48px_48px]"></div>

      <div className="relative max-w-[1450px] mx-auto px-8 lg:px-20 pt-32 pb-28">

        <div className="grid lg:grid-cols-2 items-center gap-20">

          {/* LEFT */}

          <div>

            <div className="flex items-center gap-4 mb-8">

              <div className="w-10 h-[2px] bg-[#E7B14C]" />

              <span className="uppercase tracking-[5px] text-[#E7B14C] text-sm font-semibold">
                AI VERIFIED GIVING
              </span>

            </div>

            <h1
              className="
                hero-title
                text-[78px]
                leading-[0.9]
                tracking-[-0.04em]
                font-bold
                text-[#F7F4EF]
              "
            >
              Every donation,
              <br />
              creates a future
              <br />
              <span className="text-[#A7D1B3]">
                that lasts.
              </span>
            </h1>

            <p
              className="
                mt-10
                max-w-[460px]
                text-[21px]
                leading-9
                text-[#C6D3C4]
              "
            >
              Every NGO is verified before fundraising begins.
              Track every rupee you donate and see the real impact
              your contribution creates through AI-powered transparency.
            </p>

            {/* Buttons */}

            <div className="flex gap-6 mt-12">

              <button
                onClick={() => navigate("/campaigns")}
                className="
                  px-9
                  py-5
                  rounded-[22px]
                  bg-[#E7B14C]
                  text-[#081C15]
                  text-lg
                  font-semibold
                  shadow-xl
                  transition-all
                  duration-300
                  hover:scale-105
                  hover:shadow-2xl
                "
              >
                Explore Campaigns
              </button>

              <button
                onClick={() => navigate("/campaigns")}
                className="
                  px-9
                  py-5
                  rounded-[22px]
                  border
                  border-white/30
                  bg-white/5
                  backdrop-blur-lg
                  text-white
                  text-lg
                  font-semibold
                  transition-all
                  duration-300
                  hover:bg-white
                  hover:text-[#081C15]
                "
              >
                Start Donating
              </button>

            </div>

            {/* Stats */}

            <div className="flex gap-16 mt-20">

              <div>
                <h2 className="text-5xl font-bold text-white">
                  ₹52L+
                </h2>

                <p className="mt-2 text-[#B8C8B5]">
                  Platform Raised
                </p>
              </div>

              <div>
                <h2 className="text-5xl font-bold text-white">
                  800+
                </h2>

                <p className="mt-2 text-[#B8C8B5]">
                  Verified Campaigns
                </p>
              </div>

              <div>
                <h2 className="text-5xl font-bold text-white">
                  12K+
                </h2>

                <p className="mt-2 text-[#B8C8B5]">
                  Active Donors
                </p>
              </div>

            </div>

          </div>

          {/* RIGHT */}

          <HeroImage />

        </div>

      </div>

    </section>
  );
}