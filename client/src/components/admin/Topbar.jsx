import { Bell, Search, UserCircle2 } from "lucide-react";

export default function Topbar() {
  return (
    <div className="flex items-center justify-between mb-8">

      <div>

        <h1 className="hero-title text-4xl text-white">
          Dashboard
        </h1>

        <p className="text-[#93A79A] mt-2">
          Welcome back, Admin.
        </p>

      </div>

      <div className="flex items-center gap-5">

        <button className="text-[#93A79A] hover:text-white transition">
          <Search size={22} />
        </button>

        <button className="text-[#93A79A] hover:text-white transition">
          <Bell size={22} />
        </button>

        <button className="text-[#93A79A] hover:text-white transition">
          <UserCircle2 size={30} />
        </button>

      </div>

    </div>
  );
}