import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, LogIn } from "lucide-react";
import { toast } from "react-toastify";

import { login as loginService } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";

export default function LoginForm() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);

      const data = await loginService(form);

      login(data.token, data.user);

      toast.success("Login Successful!");

      switch (data.user.role) {
        case "donor":
          navigate("/dashboard");
          break;

        case "ngo":
          navigate("/ngo-dashboard");
          break;

        case "admin":
          navigate("/admin");
          break;

        default:
          navigate("/");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Login Failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl p-10">
      <h1 className="hero-title text-4xl text-white text-center">
        Welcome Back
      </h1>

      <p className="text-center text-[#93A79A] mt-3 mb-8">
        Sign in to continue your journey of making an impact.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email */}

        <div>
          <label className="text-white mb-2 block">
            Email
          </label>

          <div className="flex items-center bg-white/5 border border-white/10 rounded-xl px-4 focus-within:border-[#E7B14C] focus-within:ring-2 focus-within:ring-[#E7B14C]/20 transition">
            <Mail size={18} className="text-[#E7B14C]" />

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full bg-transparent outline-none px-3 py-4 text-white placeholder:text-[#93A79A]"
            />
          </div>
        </div>

        {/* Password */}

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-white">
              Password
            </label>

            <button
              type="button"
              className="text-sm text-[#E7B14C] hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          <div className="flex items-center bg-white/5 border border-white/10 rounded-xl px-4 focus-within:border-[#E7B14C] focus-within:ring-2 focus-within:ring-[#E7B14C]/20 transition">
            <Lock size={18} className="text-[#E7B14C]" />

            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full bg-transparent outline-none px-3 py-4 text-white placeholder:text-[#93A79A]"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#E7B14C] hover:bg-[#dca53f] hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 transition-all duration-300 text-black font-semibold py-4 rounded-xl flex items-center justify-center gap-2"
        >
          <LogIn size={18} />

          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <p className="text-center text-[#93A79A] mt-8">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="text-[#E7B14C] font-semibold hover:underline"
        >
          Register
        </Link>
      </p>
    </div>
  );
}