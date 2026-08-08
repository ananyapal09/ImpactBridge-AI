import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../utils/axios";

export default function VerifyCertificate() {
  const [searchParams] = useSearchParams();

  const [certificateId, setCertificateId] = useState(
    searchParams.get("id") || ""
  );

  const [certificate, setCertificate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const verifyCertificate = async () => {
    if (!certificateId.trim()) {
      setError("Please enter a certificate ID.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setCertificate(null);

      const response = await api.get(
        `/donations/certificate/verify/${encodeURIComponent(
          certificateId.trim()
        )}`
      );

      setCertificate(response.data.certificate);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Certificate could not be verified."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-2xl">

        <div className="text-center mb-10">
          <h1 className="hero-title text-5xl">
            ImpactBridge
          </h1>

          <p className="mt-3 text-[#93A79A]">
            Donation Certificate Verification
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl">

          <h2 className="text-2xl font-bold text-white">
            Verify Certificate
          </h2>

          <p className="mt-2 text-[#93A79A]">
            Enter the certificate ID shown on an ImpactBridge
            donation certificate.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">

            <input
              type="text"
              value={certificateId}
              onChange={(e) => setCertificateId(e.target.value)}
              placeholder="IB-CERT-XXXXXXXX"
              className="flex-1 rounded-xl border border-white/10 bg-[#14201B] px-5 py-4 text-white outline-none focus:border-[#E7B14C]"
            />

            <button
              onClick={verifyCertificate}
              disabled={loading}
              className="rounded-xl bg-[#E7B14C] px-7 py-4 font-bold text-[#14201B] transition hover:opacity-90 disabled:opacity-50"
            >
              {loading ? "Verifying..." : "Verify"}
            </button>

          </div>

          {error && (
            <div className="mt-6 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-red-400">
              {error}
            </div>
          )}

          {certificate && (
            <div className="mt-8 rounded-2xl border border-green-500/20 bg-green-500/10 p-6">

              <div className="flex items-center gap-3">

                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500/20 text-2xl">
                  ✓
                </div>

                <div>
                  <h3 className="text-xl font-bold text-green-400">
                    Certificate Verified
                  </h3>

                  <p className="text-sm text-[#93A79A]">
                    This certificate is linked to a verified
                    ImpactBridge donation record.
                  </p>
                </div>

              </div>

              <div className="mt-8 space-y-5">

                <div>
                  <p className="text-sm text-[#93A79A]">
                    Certificate ID
                  </p>
                  <p className="mt-1 font-semibold text-white">
                    {certificate.certificateId}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-[#93A79A]">
                    Donor
                  </p>
                  <p className="mt-1 font-semibold text-white">
                    {certificate.donorName}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-[#93A79A]">
                    Campaign
                  </p>
                  <p className="mt-1 font-semibold text-white">
                    {certificate.campaignTitle}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-[#93A79A]">
                    NGO
                  </p>
                  <p className="mt-1 font-semibold text-white">
                    {certificate.ngoName}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                  <div>
                    <p className="text-sm text-[#93A79A]">
                      Donation
                    </p>

                    <p className="mt-1 text-xl font-bold text-[#E7B14C]">
                      ₹{Number(
                        certificate.amount
                      ).toLocaleString("en-IN")}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-[#93A79A]">
                      Date
                    </p>

                    <p className="mt-1 font-semibold text-white">
                      {new Date(
                        certificate.donationDate
                      ).toLocaleDateString("en-IN")}
                    </p>
                  </div>

                </div>

                <div className="border-t border-white/10 pt-5">

                  <span className="inline-flex rounded-full bg-green-500/20 px-4 py-2 text-sm font-semibold text-green-400">
                    ✓ Payment Verified
                  </span>

                </div>

              </div>

            </div>
          )}

        </div>

        <p className="mt-8 text-center text-sm text-[#93A79A]">
          ImpactBridge • AI-powered social impact platform
        </p>

      </div>
    </div>
  );
}
