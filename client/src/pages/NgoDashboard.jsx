import { useState } from "react";

import NgoSidebar from "../components/ngo/NgoSidebar";
import NgoTopbar from "../components/ngo/NgoTopbar";
import NgoStats from "../components/ngo/NgoStats";
import MyCampaigns from "../components/ngo/MyCampaigns";

export default function NgoDashboard() {
  const [search, setSearch] = useState("");

  return (
    <div className="min-h-screen flex bg-[#14201B]">
      <NgoSidebar />

      <main className="flex-1 p-10 overflow-y-auto">
        <NgoTopbar
          search={search}
          setSearch={setSearch}
        />

        <div className="mt-10">
          <NgoStats />
        </div>

        <div className="mt-10">
          <MyCampaigns search={search} />
        </div>
      </main>
    </div>
  );
}