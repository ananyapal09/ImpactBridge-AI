import { ArrowLeft, ShieldCheck, HeartHandshake, Landmark } from "lucide-react";
import { Link } from "react-router-dom";

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#14201B] relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute -top-40 -left-32 h-96 w-96 rounded-full bg-[#E7B14C]/10 blur-3xl" />
      <div className="absolute -bottom-32 -right-20 h-80 w-80 rounded-full bg-green-500/10 blur-3xl" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-8 py-12">
        {/* LEFT */}
        <div className="hidden lg:flex w-1/2 flex-col justify-center pr-20">
          <h1 className="hero-title text-6xl text-white">
            ImpactBridge
          </h1>

          <span className="mt-6 inline-block w-fit rounded-full bg-[#E7B14C]/10 px-4 py-2 text-xs uppercase tracking-[0.25em] text-[#E7B14C]">
            AI Powered Donation Platform
          </span>

          <h2 className="mt-10 text-4xl font-semibold leading-tight text-white">
            Every login is another step toward creating meaningful impact.
          </h2>

          <p className="mt-6 max-w-lg text-lg leading-8 text-[#93A79A]">
            Join thousands of donors and verified NGOs building a transparent future together.
          </p>

          <div className="mt-12 space-y-5">
            <div className="flex items-center gap-4 text-white">
              <ShieldCheck className="text-[#E7B14C]" />
              <span>450+ Verified NGOs</span>
            </div>

            <div className="flex items-center gap-4 text-white">
              <Landmark className="text-[#E7B14C]" />
              <span>₹8.4 Crore Raised</span>
            </div>

            <div className="flex items-center gap-4 text-white">
              <HeartHandshake className="text-[#E7B14C]" />
              <span>12,000+ Donors</span>
            </div>
          </div>

          <Link
            to="/"
            className="mt-14 flex w-fit items-center gap-2 text-[#E7B14C] transition hover:translate-x-1"
          >
            <ArrowLeft size={18} />
            Back to Home
          </Link>
        </div>

        {/* RIGHT */}
        <div className="flex w-full justify-center lg:w-1/2">
          {children}
        </div>
      </div>
    </div>
  );
}