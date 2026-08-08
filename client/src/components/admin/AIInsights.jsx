import {
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Sparkles,
} from "lucide-react";

export default function AIInsights({ analytics }) {
  return (
    <div className="bg-[#1B2A24] rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <Sparkles className="text-[#E7B14C]" />
        <h2 className="text-2xl font-bold text-white">
          AI Insights
        </h2>
      </div>

      <div className="space-y-5">

        <div className="flex gap-3">
          <TrendingUp className="text-green-400 mt-1" />

          <div>
            <p className="text-white">
              Donations increased this month
            </p>

            <p className="text-sm text-gray-400">
              ₹{analytics.totalDonations} collected.
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <AlertTriangle className="text-red-400 mt-1" />

          <div>
            <p className="text-white">
              High fraud campaigns detected
            </p>

            <p className="text-sm text-gray-400">
              Review campaigns with fraud score above 70.
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <CheckCircle className="text-green-400 mt-1" />

          <div>
            <p className="text-white">
              NGOs Verified Successfully
            </p>

            <p className="text-sm text-gray-400">
              {analytics.ngos} NGOs verified.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}