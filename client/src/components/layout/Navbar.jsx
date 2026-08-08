import { HeartHandshake } from "lucide-react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="absolute top-6 left-0 w-full z-50">
      <div className="max-w-[1450px] mx-auto px-8 lg:px-20">
        <nav
          className="
            flex
            items-center
            justify-between
            rounded-full
            px-8
            py-4
            bg-white/5
            backdrop-blur-xl
            border
            border-white/10
            shadow-[0_10px_50px_rgba(0,0,0,.25)]
          "
        >
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-[#E7B14C] flex items-center justify-center">
              <HeartHandshake
                size={20}
                className="text-[#081C15]"
              />
            </div>

            <div>
              <h2 className="hero-title text-2xl text-white">
                ImpactBridge
              </h2>

              <p className="text-xs text-[#AFC2AE]">
                AI Verified Giving
              </p>
            </div>
          </Link>

          {/* Navigation */}
          <div className="hidden lg:flex items-center gap-10">
            <Link
              to="/campaigns"
              className="text-[#D9E4D8] font-medium hover:text-[#E7B14C] transition"
            >
              Campaigns
            </Link>

            <Link
              to="/ngos"
              className="text-[#D9E4D8] font-medium hover:text-[#E7B14C] transition"
            >
              NGOs
            </Link>

            <a
              href="#about"
              className="text-[#D9E4D8] font-medium hover:text-[#E7B14C] transition"
            >
              About
            </a>

            <a
              href="#contact"
              className="text-[#D9E4D8] font-medium hover:text-[#E7B14C] transition"
            >
              Contact
            </a>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-4">
            <Link
              to="/login"
              className="
                px-6 py-3
                rounded-full
                border border-white/15
                bg-white/5
                text-white
                hover:bg-white/10
                transition-all
              "
            >
              Login
            </Link>

            <Link
              to="/register"
              className="
                px-7 py-3
                rounded-full
                bg-[#E7B14C]
                text-[#081C15]
                font-semibold
                hover:scale-105
                transition-all
              "
            >
              Register
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}