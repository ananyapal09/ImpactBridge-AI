import {
  ArrowRight,
  ShieldCheck,
  CalendarDays,
  IndianRupee,
  Target,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function CampaignCard({ campaign }) {
  const goalAmount = campaign.goalAmount || 0;
  const raisedAmount = campaign.raisedAmount || 0;

  const progress =
    goalAmount > 0
      ? Math.round((raisedAmount / goalAmount) * 100)
      : 0;

  const daysLeft = Math.max(
    Math.ceil(
      (new Date(campaign.deadline) - new Date()) /
        (1000 * 60 * 60 * 24)
    ),
    0
  );
  console.log("Campaign object:", campaign);
console.log("Campaign _id:", campaign._id);
console.log("NGO:", campaign.ngo);
  return (
    <div
      className="
        group
        overflow-hidden
        rounded-[30px]
        border
        border-white/10
        bg-white/5
        backdrop-blur-xl
        transition-all
        duration-500
        hover:-translate-y-3
        hover:border-[#E7B14C]/30
        hover:shadow-[0_25px_70px_rgba(0,0,0,0.35)]
      "
    >
      {/* Cover Image */}

      <div className="relative overflow-hidden">

        <img
          src={
            campaign.image ||
            "https://images.unsplash.com/photo-1469571486292-b53601020f20?w=1200"
          }
          alt={campaign.title}
          className="
            h-72
            w-full
            object-cover
            transition-transform
            duration-700
            group-hover:scale-110
          "
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

        {/* AI Verified */}

        <div
          className="
            absolute
            left-5
            top-5
            flex
            items-center
            gap-2
            rounded-full
            border
            border-white/10
            bg-[#14201B]/90
            px-4
            py-2
            backdrop-blur-xl
          "
        >
          <ShieldCheck
            size={16}
            className="text-[#B7E4C7]"
          />

          <span className="text-xs font-medium text-white">
            Verified NGO
          </span>
        </div>

        {/* Category */}

        <div
          className="
            absolute
            bottom-5
            left-5
            rounded-full
            bg-[#E7B14C]
            px-4
            py-2
            text-sm
            font-semibold
            text-[#14201B]
          "
        >
          {campaign.category}
        </div>

      </div>

      {/* Content */}

      <div className="p-7">

        <h3 className="hero-title text-3xl leading-tight text-white">
          {campaign.title}
        </h3>

        <p className="mt-4 line-clamp-3 text-[#93A79A]">
          {campaign.description}
        </p>

        {/* Progress */}

        <div className="mt-6">

          <div className="mb-2 flex justify-between">

            <span className="text-sm text-[#93A79A]">
              Progress
            </span>

            <span className="font-semibold text-[#B7E4C7]">
              {progress}%
            </span>

          </div>

          <div className="h-2 overflow-hidden rounded-full bg-white/10">

            <div
              className="h-full rounded-full bg-[#4CAF72] transition-all duration-700"
              style={{
                width: `${progress}%`,
              }}
            />

          </div>

        </div>

        {/* Raised + Goal */}

        <div className="mt-7 grid grid-cols-2 gap-5">

          <div>

            <div className="flex items-center gap-2 text-[#93A79A]">

              <IndianRupee size={16} />

              <span className="text-sm">
                Raised
              </span>

            </div>

            <h4 className="mt-2 text-xl font-bold text-white">
              ₹{raisedAmount.toLocaleString()}
            </h4>

          </div>

          <div className="text-right">

            <div className="flex items-center justify-end gap-2 text-[#93A79A]">

              <Target size={16} />

              <span className="text-sm">
                Goal
              </span>

            </div>

            <h4 className="mt-2 text-xl font-bold text-white">
              ₹{goalAmount.toLocaleString()}
            </h4>

          </div>

        </div>

        {/* Footer */}

        <div className="mt-7 flex items-center justify-between">

          <div className="flex items-center gap-2 text-[#93A79A]">

            <CalendarDays size={16} />

            <span className="text-sm">
              {daysLeft} days left
            </span>

          </div>

          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              campaign.status === "active"
                ? "bg-green-500/20 text-green-400"
                : "bg-gray-500/20 text-gray-300"
            }`}
          >
            {campaign.status}
          </span>

        </div>

        {/* View Button */}

       <Link
  onClick={() => alert(campaign._id)}
  to={`/campaign/${campaign._id}`}
          className="
            mt-8
            flex
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-[#E7B14C]
            px-6
            py-4
            font-semibold
            text-[#14201B]
            transition-all
            duration-300
            hover:scale-[1.02]
          "
        >
          View Details

          <ArrowRight
            size={18}
            className="transition group-hover:translate-x-1"
          />
        </Link>

      </div>
    </div>
  );
}