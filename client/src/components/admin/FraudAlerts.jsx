export default function FraudAlerts({ campaigns }) {

  const fraud = campaigns.filter(
    (c) => c.fraudScore >= 70
  );

  return (
    <div className="bg-[#1B2A24] rounded-2xl p-6 mt-8">

      <h2 className="text-2xl text-red-400 font-bold mb-6">
        Fraud Alerts
      </h2>

      {fraud.length === 0 ? (
        <p className="text-green-400">
          No suspicious campaigns.
        </p>
      ) : (
        fraud.map((campaign) => (
          <div
            key={campaign._id}
            className="border-b border-white/10 py-4"
          >
            <p className="text-white">
              {campaign.title}
            </p>

            <p className="text-red-400">
              Fraud Score : {campaign.fraudScore}
            </p>
          </div>
        ))
      )}
    </div>
  );
}