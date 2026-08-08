import { useState } from "react";
import {
  Pencil,
  Trash2,
  CalendarDays,
  Target,
  IndianRupee,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { deleteCampaign } from "../../services/campaignService";
import { showSuccess, showError } from "../../utils/toast";
import DeleteModal from "../common/DeleteModal";

export default function CampaignRow({ campaign, onDelete }) {
  const navigate = useNavigate();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const goal = campaign.goalAmount || 0;
  const raised = campaign.raisedAmount || 0;

  const progress =
    goal > 0
      ? Math.min((raised / goal) * 100, 100)
      : 0;

  const daysLeft = Math.max(
    Math.ceil(
      (new Date(campaign.deadline) - new Date()) /
        (1000 * 60 * 60 * 24)
    ),
    0
  );

  const handleDelete = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      await deleteCampaign(campaign._id, token);

      showSuccess(
        "Campaign Deleted",
        `"${campaign.title}" has been deleted.`
      );

      setShowDeleteModal(false);

      onDelete(campaign._id);
    } catch (err) {
      console.error(err);

      showError(
        "Delete Failed",
        "Unable to delete campaign."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="group overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-[#E7B14C]/40 hover:shadow-[0_20px_50px_rgba(231,177,76,.12)]">

        {/* Cover Image */}

        <div className="relative h-52 overflow-hidden">

          <img
            src={
              campaign.image ||
              "https://images.unsplash.com/photo-1469571486292-b53601020f20?w=900"
            }
            alt={campaign.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#14201B] via-transparent to-transparent" />

          <span className="absolute left-4 top-4 rounded-full bg-[#E7B14C] px-3 py-1 text-xs font-semibold text-[#14201B]">
            {campaign.category}
          </span>

        </div>

        <div className="p-6">

          {/* Title */}

          <h2 className="text-2xl font-bold text-white">
            {campaign.title}
          </h2>

          {/* Description */}

          <p className="mt-3 line-clamp-2 text-[#93A79A]">
            {campaign.description}
          </p>
          {/* AI Recommendation */}

{campaign.aiRecommendation && (
  <div className="mt-5 rounded-xl border border-[#E7B14C]/20 bg-[#101916] p-4">

    <div className="flex items-center justify-between">

      <h3 className="font-semibold text-[#E7B14C]">
        🤖 AI Recommendation
      </h3>

      {campaign.aiBadge && (
        <span className="rounded-full bg-[#E7B14C]/20 px-3 py-1 text-xs font-semibold text-[#E7B14C]">
          {campaign.aiBadge}
        </span>
      )}

    </div>

    <p className="mt-3 text-sm leading-6 text-[#D9E4D8]">
      {campaign.aiRecommendation}
    </p>

  </div>
)}
          {/* Progress */}

          <div className="mt-6">

            <div className="mb-2 flex justify-between text-sm">

              <span className="text-[#93A79A]">
                Progress
              </span>

              <span className="font-semibold text-white">
                {progress.toFixed(0)}%
              </span>

            </div>

            <div className="h-3 overflow-hidden rounded-full bg-white/10">

              <div
                className="h-full rounded-full bg-[#E7B14C] transition-all duration-700"
                style={{
                  width: `${progress}%`,
                }}
              />

            </div>

          </div>

          {/* Stats */}

          <div className="mt-6 grid grid-cols-2 gap-4">

            <div className="rounded-xl bg-[#101916] p-4">

              <div className="flex items-center gap-2 text-[#93A79A]">

                <IndianRupee size={16} />

                Raised

              </div>

              <h3 className="mt-2 text-lg font-bold text-white">
                ₹{raised.toLocaleString()}
              </h3>

            </div>

            <div className="rounded-xl bg-[#101916] p-4">

              <div className="flex items-center gap-2 text-[#93A79A]">

                <Target size={16} />

                Goal

              </div>

              <h3 className="mt-2 text-lg font-bold text-white">
                ₹{goal.toLocaleString()}
              </h3>

            </div>

          </div>

          {/* Footer */}

          <div className="mt-6 flex items-center justify-between">

            <div className="flex items-center gap-2 text-[#93A79A]">

              <CalendarDays size={17} />

              <span>{daysLeft} days left</span>

            </div>

            <div className="flex gap-2">

  {campaign.aiVerified && (
    <span className="rounded-full bg-green-500/20 px-3 py-1 text-xs font-semibold text-green-400">
      ✓ AI Verified
    </span>
  )}

  <span
    className={`rounded-full px-3 py-1 text-sm font-semibold ${
      campaign.status === "active"
        ? "bg-green-500/20 text-green-400"
        : "bg-gray-500/20 text-gray-300"
    }`}
  >
    {campaign.status}
  </span>

</div>

          </div>

          {/* Buttons */}

          <div className="mt-7 flex gap-4">

            <button
              onClick={() =>
                navigate(`/ngo-dashboard/edit/${campaign._id}`)
              }
              className="flex-1 rounded-xl border border-[#E7B14C]/30 py-3 font-medium text-[#E7B14C] transition hover:bg-[#E7B14C]/10"
            >
              <div className="flex items-center justify-center gap-2">
                <Pencil size={18} />
                Edit
              </div>
            </button>

            <button
              onClick={() => setShowDeleteModal(true)}
              className="flex-1 rounded-xl bg-red-500 py-3 font-medium text-white transition hover:bg-red-600"
            >
              <div className="flex items-center justify-center gap-2">
                <Trash2 size={18} />
                Delete
              </div>
            </button>

          </div>

        </div>

      </div>

      <DeleteModal
        isOpen={showDeleteModal}
        title="Delete Campaign"
        message={`Are you sure you want to delete "${campaign.title}"?`}
        loading={loading}
        onCancel={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
      />
    </>
  );
}