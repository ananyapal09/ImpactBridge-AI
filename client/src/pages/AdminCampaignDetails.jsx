import { useParams } from "react-router-dom";

export default function AdminCampaignDetails() {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-[#14201B] text-white p-10">
      <h1 className="text-4xl font-bold">
        Campaign Details
      </h1>

      <p className="mt-5">
        Campaign ID: {id}
      </p>
    </div>
  );
}