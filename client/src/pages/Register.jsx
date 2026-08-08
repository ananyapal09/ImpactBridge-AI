import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import {
  HeartHandshake,
  ArrowLeft,
  User,
  Mail,
  Lock,
  Users,
} from "lucide-react";

import { register } from "../services/authService";

export default function Register() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "donor",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.name ||
      !form.email ||
      !form.password ||
      !form.confirmPassword
    ) {
      return toast.error("Please fill all fields");
    }

    if (form.password !== form.confirmPassword) {
      return toast.error("Passwords do not match");
    }

    try {
      setLoading(true);

      const res = await register({
        name: form.name,
        email: form.email,
        password: form.password,
        role: form.role,
      });

      toast.success(res.message);

      navigate("/login");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Registration Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#081C15] flex">

      {/* LEFT SIDE */}

      <div className="w-1/2 flex flex-col justify-center px-32">

        <div className="flex items-center gap-4 mb-10">

          <div className="w-14 h-14 rounded-full bg-[#E7B14C] flex items-center justify-center">
            <HeartHandshake
              size={28}
              className="text-[#081C15]"
            />
          </div>

          <div>
            <h1 className="hero-title text-6xl text-white">
              ImpactBridge
            </h1>

            <p className="text-[#AFC2AE]">
              AI Verified Giving
            </p>
          </div>

        </div>

        <span className="inline-block w-fit px-6 py-3 rounded-full bg-[#E7B14C]/10 text-[#E7B14C] tracking-[4px] text-sm mb-10">
          AI VERIFIED FUNDRAISING
        </span>

        <h2 className="text-6xl font-bold text-white leading-tight mb-8">
          Join the future
          <br />
          of transparent
          <br />
          giving.
        </h2>

        <p className="text-[#93A79A] text-xl leading-10 max-w-xl mb-12">
          Create your account and become part of India's
          AI-powered crowdfunding ecosystem.
        </p>

        <div className="space-y-5 text-[#D9E4D8]">

          <div className="flex items-center gap-3">
            🤖
            <span>
              Every campaign is AI verified before fundraising.
            </span>
          </div>

          <div className="flex items-center gap-3">
            🔒
            <span>
              Secure authentication and transparent donations.
            </span>
          </div>

          <div className="flex items-center gap-3">
            ❤️
            <span>
              Join thousands of donors creating meaningful impact.
            </span>
          </div>

        </div>

        <Link
          to="/"
          className="flex items-center gap-2 mt-14 text-[#E7B14C] hover:translate-x-1 transition"
        >
          <ArrowLeft size={18} />
          Back to Home
        </Link>

      </div>

      {/* RIGHT SIDE */}

      <div className="w-1/2 flex items-center justify-center">

        <form
          onSubmit={handleSubmit}
          className="
          w-[520px]
          bg-white/5
          backdrop-blur-xl
          border
          border-white/10
          rounded-[40px]
          p-10
          "
        >

          <h2 className="hero-title text-5xl text-white text-center mb-3">
            Create Account
          </h2>

          <p className="text-center text-[#93A79A] mb-10">
            Start making meaningful impact today.
          </p>

          {/* Name */}

          <label className="text-white font-medium">
            Full Name
          </label>

          <div className="mt-3 mb-6 flex items-center bg-white/5 border border-white/10 rounded-xl px-5 py-4">

            <User className="text-[#E7B14C]" />

            <input
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="ml-4 w-full bg-transparent outline-none text-white placeholder:text-[#93A79A]"
            />

          </div>

          {/* Email */}

          <label className="text-white font-medium">
            Email
          </label>

          <div className="mt-3 mb-6 flex items-center bg-white/5 border border-white/10 rounded-xl px-5 py-4">

            <Mail className="text-[#E7B14C]" />

            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="ml-4 w-full bg-transparent outline-none text-white placeholder:text-[#93A79A]"
            />

          </div>

          {/* Password */}

          <label className="text-white font-medium">
            Password
          </label>

          <div className="mt-3 mb-6 flex items-center bg-white/5 border border-white/10 rounded-xl px-5 py-4">

            <Lock className="text-[#E7B14C]" />

            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Create password"
              className="ml-4 w-full bg-transparent outline-none text-white placeholder:text-[#93A79A]"
            />

          </div>

          {/* Confirm Password */}

          <label className="text-white font-medium">
            Confirm Password
          </label>

          <div className="mt-3 mb-6 flex items-center bg-white/5 border border-white/10 rounded-xl px-5 py-4">

            <Lock className="text-[#E7B14C]" />

            <input
              name="confirmPassword"
              type="password"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm password"
              className="ml-4 w-full bg-transparent outline-none text-white placeholder:text-[#93A79A]"
            />

          </div>

          {/* Role */}

          <label className="text-white font-medium">
            Register As
          </label>

          <div className="mt-3 mb-8 flex items-center bg-white/5 border border-white/10 rounded-xl px-5 py-4">

            <Users className="text-[#E7B14C]" />

            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="ml-4 w-full bg-transparent outline-none text-white"
            >
              <option value="donor" className="text-black">
                👤 Donor
              </option>

              <option value="ngo" className="text-black">
                🏢 NGO
              </option>

            </select>

          </div>

          {/* Button */}

          <button
            type="submit"
            disabled={loading}
            className="
            w-full
            py-4
            rounded-xl
            bg-[#E7B14C]
            text-[#081C15]
            text-lg
            font-bold
            hover:scale-[1.02]
            hover:shadow-[0_0_35px_rgba(231,177,76,.35)]
            transition-all
            duration-300
            disabled:opacity-60
            "
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>

          <p className="text-center text-[#93A79A] mt-8">
            Already have an account?{" "}

            <Link
              to="/login"
              className="text-[#E7B14C] font-semibold hover:underline"
            >
              Login
            </Link>

          </p>

        </form>

      </div>

    </div>
  );
}