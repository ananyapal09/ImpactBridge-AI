import { useEffect, useState } from "react";
import NgoRow from "./NgoRow";
import {
  getPendingNGOs,
  approveNGO,
  rejectNGO,
} from "../../services/adminService";

export default function PendingNGOs() {
  const [ngos, setNgos] = useState([]);

  useEffect(() => {
    fetchPendingNGOs();
  }, []);

  const fetchPendingNGOs = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await getPendingNGOs(token);

      setNgos(res.ngos);
    } catch (error) {
      console.error("Error fetching NGOs:", error);
    }
  };

  const handleApprove = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await approveNGO(id, token);

      setNgos((prev) => prev.filter((ngo) => ngo._id !== id));
    } catch (error) {
      console.error("Error approving NGO:", error);
    }
  };

  const handleReject = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await rejectNGO(id, token);

      setNgos((prev) => prev.filter((ngo) => ngo._id !== id));
    } catch (error) {
      console.error("Error rejecting NGO:", error);
    }
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-7">
      <div className="flex justify-between items-center mb-7">
        <div>
          <h2 className="hero-title text-3xl text-white">
            Pending NGO Approvals
          </h2>

          <p className="text-[#93A79A] mt-2">
            NGOs waiting for verification
          </p>
        </div>

        <button
  onClick={() => (window.location.href = "/admin/ngos")}
  className="text-[#E7B14C] hover:text-white transition"
>
  View All →
</button>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-12 text-[#93A79A] text-sm pb-4 border-b border-white/10">
        <div className="col-span-4">NGO</div>

        <div className="col-span-3">Registration</div>

        <div className="col-span-2">Status</div>

        <div className="col-span-1">Docs</div>

        <div className="col-span-2">Actions</div>
      </div>

      {ngos.length === 0 ? (
        <p className="text-center text-[#93A79A] py-8">
          No pending NGOs found.
        </p>
      ) : (
        ngos.map((ngo, index) => (
          <NgoRow
            key={ngo._id}
            ngo={{
              ...ngo,
              registration: `NGO-${1001 + index}`,
            }}
            onApprove={() => handleApprove(ngo._id)}
            onReject={() => handleReject(ngo._id)}
          />
        ))
      )}
    </div>
  );
}