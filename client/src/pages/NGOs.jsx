import { useEffect, useState } from "react";
import { MapPin, Mail, Globe, BadgeCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { getVerifiedNGOs } from "../services/ngoService";

export default function NGOs() {
  const [ngos, setNgos] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNGOs();
  }, []);

  useEffect(() => {
    const results = ngos.filter(
      (ngo) =>
        ngo.name.toLowerCase().includes(search.toLowerCase()) ||
        ngo.address.toLowerCase().includes(search.toLowerCase()) ||
        ngo.description.toLowerCase().includes(search.toLowerCase())
    );

    setFiltered(results);
  }, [search, ngos]);

  const fetchNGOs = async () => {
    try {
      const data = await getVerifiedNGOs();

      setNgos(data.ngos);
      setFiltered(data.ngos);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#14201B] flex items-center justify-center text-white text-3xl">
        Loading NGOs...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#14201B] text-white">
      {/* Hero */}

      <section className="pt-28 pb-20 bg-gradient-to-r from-[#0B1814] via-[#13231D] to-[#183125]">
        <div className="max-w-7xl mx-auto px-8">
          <h1 className="text-6xl font-bold">Verified NGOs</h1>

          <p className="mt-5 text-xl text-gray-400 max-w-3xl">
            Explore AI-verified NGOs committed to creating real,
            measurable impact.
          </p>

          <input
            type="text"
            placeholder="Search NGOs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mt-10 w-full md:w-96 bg-[#1B2A24] border border-white/10 rounded-xl px-5 py-4 outline-none focus:border-[#E7B14C]"
          />
        </div>
      </section>

      {/* NGO Cards */}

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-8">
          <div
            className={`grid gap-8 ${
              filtered.length === 1
                ? "grid-cols-1 max-w-md mx-auto"
                : "md:grid-cols-2 lg:grid-cols-3"
            }`}
          >
            {filtered.map((ngo) => (
              <div
                key={ngo._id}
                className="bg-[#1B2A24] rounded-3xl overflow-hidden border border-white/10 hover:border-[#E7B14C] hover:-translate-y-2 transition-all duration-300"
              >
                <img
                  src="https://images.unsplash.com/photo-1593113630400-ea4288922497?w=900"
                  alt={ngo.name}
                  className="h-56 w-full object-cover"
                />

                <div className="p-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold">
                      {ngo.name}
                    </h2>

                    <div className="flex items-center gap-1 bg-green-600 px-3 py-1 rounded-full text-sm">
                      <BadgeCheck size={16} />
                      Verified
                    </div>
                  </div>

                  <p className="mt-5 text-gray-400 leading-7 line-clamp-4">
                    {ngo.description}
                  </p>

                  <div className="mt-6 space-y-3">
                    <div className="flex items-center gap-3 text-gray-300">
                      <MapPin
                        size={18}
                        className="text-[#E7B14C]"
                      />
                      {ngo.address}
                    </div>

                    <div className="flex items-center gap-3 text-gray-300">
                      <Mail
                        size={18}
                        className="text-[#E7B14C]"
                      />
                      {ngo.email}
                    </div>

                    <div className="flex items-center gap-3">
                      <Globe
                        size={18}
                        className="text-[#E7B14C]"
                      />

                      <a
                        href={ngo.website}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#E7B14C] hover:underline"
                      >
                        Visit Website
                      </a>
                    </div>
                  </div>

                  {/* Stats */}

                  <div className="grid grid-cols-2 gap-4 mt-8">
                    <div className="bg-[#13231D] rounded-xl p-4 text-center">
                      <h3 className="text-[#E7B14C] text-3xl font-bold">
                        {ngo.campaignCount}
                      </h3>

                      <p className="text-sm text-gray-400 mt-1">
                        Campaigns
                      </p>
                    </div>

                    <div className="bg-[#13231D] rounded-xl p-4 text-center">
                      <h3 className="text-[#E7B14C] text-2xl font-bold">
                        ₹{ngo.fundsRaised}
                      </h3>

                      <p className="text-sm text-gray-400 mt-1">
                        Raised
                      </p>
                    </div>
                  </div>

                  <Link to={`/campaigns?ngo=${ngo._id}`}>
                    <button className="w-full mt-8 bg-[#E7B14C] text-black font-semibold py-4 rounded-xl hover:scale-105 transition">
                      View Campaigns
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center text-gray-400 text-2xl mt-20">
              No NGOs Found
            </div>
          )}
        </div>
      </section>
    </div>
  );
}