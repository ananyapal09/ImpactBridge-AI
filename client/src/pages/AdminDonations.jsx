import { useEffect, useState } from "react";
import { getAllDonations } from "../services/adminService";

export default function AdminDonations() {

  const [donations, setDonations] = useState([]);

  useEffect(() => {
    loadDonations();
  }, []);

  const loadDonations = async () => {
    const token = localStorage.getItem("token");

    const data = await getAllDonations(token);

    setDonations(data.donations);
  };

  return (
    <div className="min-h-screen bg-[#14201B] text-white p-10">

      <h1 className="text-4xl font-bold mb-8">
        Donation Management
      </h1>

      <div className="space-y-4">

        {donations.map((donation) => (

          <div
            key={donation._id}
            className="bg-[#1B2A24] rounded-xl p-5 flex justify-between items-center"
          >

            <div>

              <h2 className="font-bold">
                {donation.donor?.name}
              </h2>

              <p className="text-gray-400">
                {donation.campaign?.title}
              </p>

              <p className="text-sm text-[#E7B14C]">
                NGO:
                {" "}
                {donation.campaign?.ngo?.user?.name}
              </p>

            </div>

            <div className="text-right">

              <p className="text-2xl font-bold text-green-400">
                ₹{donation.amount}
              </p>

              <p className="text-gray-400">
                {new Date(
                  donation.createdAt
                ).toLocaleDateString()}
              </p>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}