import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getMyDonations,
  downloadCertificate,
} from "../services/donationService";

import DonorSidebar from "../components/dashboard/DonorSidebar";
import DonorTopbar from "../components/dashboard/DonorTopbar";
import DonationAnalytics from "../components/dashboard/DonationAnalytics";

export default function DonorDashboard() {
  const navigate = useNavigate();

  const [donations, setDonations] = useState([]);

  useEffect(() => {
    loadDonations();
  }, []);

  const loadDonations = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await getMyDonations(token);

      setDonations(res.donations);
    } catch (err) {
      console.log(err);
    }
  };

  const totalDonated = donations.reduce(
    (sum, donation) => sum + donation.amount,
    0
  );

  const campaignsSupported = new Set(
    donations.map((d) => d.campaign?._id)
  ).size;
const handleDownloadCertificate = async (donationId) => {
  try {
    const blob = await downloadCertificate(donationId);

    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = `ImpactBridge-Certificate-${donationId}.pdf`;

    document.body.appendChild(link);

    link.click();

    link.remove();

    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Certificate download error:", error);
    alert("Unable to download certificate. Please try again.");
  }
};
  return (
    <div className="min-h-screen flex bg-[#14201B]">
      <DonorSidebar />

      <main className="flex-1 overflow-y-auto p-10">

        <DonorTopbar />

        {/* Stats */}

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

          <div className="rounded-3xl bg-gradient-to-br from-[#1B2A24] to-[#21352D] border border-[#E7B14C]/20 p-8">

            <p className="text-[#93A79A]">
              Total Donated
            </p>

            <h2 className="mt-3 text-5xl font-bold text-white">
              ₹{totalDonated.toLocaleString()}
            </h2>

            <p className="mt-4 text-green-400">
              Thank you for your generosity ❤️
            </p>

          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">

            <p className="text-[#93A79A]">
              Total Donations
            </p>

            <h2 className="mt-3 text-5xl font-bold text-white">
              {donations.length}
            </h2>

          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">

            <p className="text-[#93A79A]">
              Campaigns Supported
            </p>

            <h2 className="mt-3 text-5xl font-bold text-white">
              {campaignsSupported}
            </h2>

          </div>

        </div>

        {/* Analytics */}

        <DonationAnalytics donations={donations} />

        {/* Recent Activity */}

        {donations.length > 0 && (

          <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-8">

            <h2 className="text-3xl font-bold text-white mb-6">
              Recent Activity
            </h2>

            <div className="flex justify-between items-center">

              <div>

                <h3 className="text-xl font-semibold text-white">
                  {donations[0].campaign.title}
                </h3>

                <p className="text-[#93A79A] mt-2">
                  You donated ₹{donations[0].amount}
                </p>

              </div>

              <span className="rounded-full bg-green-500/20 px-4 py-2 text-green-400 font-semibold">
                Success
              </span>

            </div>

          </div>

        )}

        {/* Donation History */}

        <div className="mt-14">

          <div className="mb-8 flex items-center justify-between">

            <h2 className="hero-title text-4xl text-white">
              Recent Donations
            </h2>

            <p className="text-[#93A79A]">
              {donations.length} Donations
            </p>

          </div>

          {donations.length === 0 ? (

            <div className="rounded-3xl border border-white/10 bg-white/5 py-20 text-center">

              <div className="mb-4 text-6xl">
                ❤️
              </div>

              <h3 className="text-3xl font-bold text-white">
                No Donations Yet
              </h3>

              <p className="mt-3 text-[#93A79A]">
                Support a campaign and your donations will appear here.
              </p>

              <button
                onClick={() => navigate("/campaigns")}
                className="mt-8 rounded-xl bg-[#E7B14C] px-6 py-3 font-semibold text-[#14201B]"
              >
                Browse Campaigns
              </button>

            </div>

          ) : (

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

              {donations.map((donation) => (

                <div
                  key={donation._id}
                  className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 transition hover:-translate-y-2 hover:border-[#E7B14C]/30 hover:shadow-[0_20px_40px_rgba(231,177,76,0.12)]"
                >

                  <img
                    src={donation.campaign.image}
                    alt={donation.campaign.title}
                    className="h-56 w-full object-cover"
                  />

                  <div className="p-6">

                    <span className="rounded-full bg-[#E7B14C]/15 px-3 py-1 text-sm font-semibold text-[#E7B14C]">
                      {donation.campaign.category}
                    </span>

                    <h2 className="mt-5 text-2xl font-bold text-white">
                      {donation.campaign.title}
                    </h2>

                    <div className="mt-8 flex justify-between">

                      <div>

                        <p className="text-[#93A79A] text-sm">
                          Donated
                        </p>

                        <h3 className="text-2xl font-bold text-[#E7B14C]">
                          ₹{donation.amount}
                        </h3>

                      </div>

                      <div className="text-right">

                        <p className="text-[#93A79A] text-sm">
                          Date
                        </p>

                        <h3 className="text-white">
                          {new Date(
                            donation.createdAt
                          ).toLocaleDateString()}
                        </h3>

                      </div>

                    </div>

                    <div className="mt-6">

                      <span className="rounded-full bg-green-500/20 px-4 py-2 text-sm font-semibold text-green-400">
                        {donation.paymentStatus}
                      </span>

                    </div>

                    <div className="mt-8 space-y-3">

  <button
    onClick={() =>
      navigate(`/campaign/${donation.campaign._id}`)
    }
    className="w-full rounded-xl bg-[#E7B14C] py-3 font-bold text-[#14201B] transition hover:opacity-90"
  >
    View Campaign
  </button>

  {donation.paymentStatus === "success" &&
    donation.certificateIssued && (
      <button
        onClick={() =>
          handleDownloadCertificate(donation._id)
        }
        className="w-full rounded-xl border border-[#E7B14C]/40 py-3 font-semibold text-[#E7B14C] transition hover:bg-[#E7B14C]/10"
      >
        📜 Download Certificate
      </button>
    )}

</div>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

      </main>
    </div>
  );
}