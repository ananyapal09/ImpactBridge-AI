import {
  Building2,
  HeartHandshake,
  FolderKanban,
} from "lucide-react";

const activity = [
  {
    icon: Building2,
    text: "Helping Hands registered.",
  },
  {
    icon: FolderKanban,
    text: "New campaign created.",
  },
  {
    icon: HeartHandshake,
    text: "₹15,000 donation received.",
  },
];

export default function RecentActivity() {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-7">

      <h2 className="hero-title text-3xl text-white">
        Recent Activity
      </h2>

      <div className="mt-8 space-y-6">

        {activity.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={index}
              className="flex gap-4 items-start"
            >
              <div className="w-10 h-10 rounded-xl bg-[#E7B14C]/10 flex items-center justify-center">

                <Icon
                  size={18}
                  className="text-[#E7B14C]"
                />

              </div>

              <p className="text-[#93A79A]">
                {item.text}
              </p>

            </div>
          );
        })}

      </div>

    </div>
  );
}