import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer 
    id="contact"

    className="bg-[#101B17]">
      {/* Gold Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#E7B14C]/40 to-transparent"></div>

      <div className="max-w-[1450px] mx-auto px-8 lg:px-20 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14">
          {/* Brand */}

          <div>
            <h2 className="hero-title text-4xl text-white">
              ImpactBridge
            </h2>

            <span
              className="
                inline-block
                mt-4
                px-3
                py-1
                rounded-full
                bg-[#E7B14C]/10
                text-[#E7B14C]
                text-xs
                tracking-widest
                uppercase
              "
            >
              AI-Powered Donation Platform
            </span>

            <p className="mt-6 text-[#93A79A] leading-8 max-w-sm">
              Making every donation transparent, secure and impactful through
              AI-powered NGO verification and real-time impact tracking.
            </p>

            <div className="flex gap-4 mt-8">
              {[
                { icon: <FaGithub />, href: "#" },
                { icon: <FaLinkedin />, href: "#" },
                { icon: <FaInstagram />, href: "#" },
              ].map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="
                    w-11
                    h-11
                    rounded-full
                    bg-white/5
                    border
                    border-white/10
                    flex
                    items-center
                    justify-center
                    text-[#93A79A]
                    hover:text-[#E7B14C]
                    hover:border-[#E7B14C]/50
                    hover:scale-110
                    hover:shadow-lg
                    hover:shadow-[#E7B14C]/10
                    transition-all
                    duration-300
                  "
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}

          <div>
            <h3 className="text-white text-xl font-semibold mb-7">
              Quick Links
            </h3>

            <ul className="space-y-5">
              {["Home", "Campaigns", "NGOs", "About", "Contact"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="
                        text-[#93A79A]
                        hover:text-[#E7B14C]
                        hover:translate-x-1
                        inline-block
                        transition-all
                        duration-300
                      "
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Resources */}

          <div>
            <h3 className="text-white text-xl font-semibold mb-7">
              Resources
            </h3>

            <ul className="space-y-5">
              {[
                "FAQs",
                "Privacy Policy",
                "Terms & Conditions",
                "Support",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="
                      text-[#93A79A]
                      hover:text-[#E7B14C]
                      hover:translate-x-1
                      inline-block
                      transition-all
                      duration-300
                    "
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}

          <div>
            <h3 className="text-white text-xl font-semibold mb-7">
              Get in Touch
            </h3>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Mail
                  size={18}
                  className="text-[#E7B14C] mt-1 shrink-0"
                />
                <p className="text-[#93A79A]">
                  contact@impactbridge.ai
                </p>
              </div>

              <div className="flex items-start gap-4">
                <Phone
                  size={18}
                  className="text-[#E7B14C] mt-1 shrink-0"
                />
                <p className="text-[#93A79A]">
                  +91 98765 43210
                </p>
              </div>

              <div className="flex items-start gap-4">
                <MapPin
                  size={18}
                  className="text-[#E7B14C] mt-1 shrink-0"
                />
                <p className="text-[#93A79A]">
                  New Delhi, India
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}

        <div className="h-px bg-white/10 my-14"></div>

        {/* Bottom */}

        <div className="flex flex-col md:flex-row items-center justify-between gap-5">
          <p className="text-sm text-[#93A79A]">
            © 2026 ImpactBridge. All rights reserved.
          </p>

          <p className="text-sm text-[#93A79A]">
            Built with ❤️ for creating transparent social impact.
          </p>
        </div>
      </div>
    </footer>
  );
}