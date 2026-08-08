export default function TopCampaigns({ campaigns }) {
  const top = [...campaigns]
    .sort((a, b) => b.raisedAmount - a.raisedAmount)
    .slice(0, 5);

  return (
    <div className="bg-[#1B2A24] rounded-2xl p-6 mt-8">
      <h2 className="text-2xl font-bold mb-6 text-white">
        Top Performing Campaigns
      </h2>

      <div className="space-y-5">
        {top.map((campaign, index) => (
          <div
            key={campaign._id}
            className="flex justify-between items-center"
          >
            <div>
              <h3 className="text-white font-semibold">
                {index + 1}. {campaign.title}
              </h3>

              <p className="text-gray-400 text-sm">
                {campaign.category}
              </p>
            </div>

            <span className="text-[#E7B14C] font-bold">
              ₹{campaign.raisedAmount}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}