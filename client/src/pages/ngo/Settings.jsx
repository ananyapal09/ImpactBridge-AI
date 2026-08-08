
import { useEffect, useState } from "react";
import {
  User,
  Mail,
  Building2,
  Globe,
  Phone,
  MapPin,
  Lock,
  ShieldCheck,
  Save,
} from "lucide-react";
import toast from "react-hot-toast";

import {
  getProfile,
  updateProfile,
  changePassword,
} from "../../services/authService";

export default function Settings() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    description: "",
    website: "",
    phone: "",
    address: "",
    isVerified: false,
  });

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // ==============================
  // Load Profile
  // ==============================

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const res = await getProfile();

      if (!res.success) {
        throw new Error(res.message);
      }

      setProfile({
        name: res.user?.name || "",
        email: res.user?.email || "",
        description: res.ngoProfile?.description || "",
        website: res.ngoProfile?.website || "",
        phone: res.ngoProfile?.phone || "",
        address: res.ngoProfile?.address || "",
        isVerified: res.user?.isVerified || false,
      });
    } catch (error) {
      console.error("Profile loading error:", error);
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Unable to load profile."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==============================
  // Input Handler
  // ==============================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ==============================
  // Save Profile
  // ==============================

  const handleSaveProfile = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      const res = await updateProfile({
        name: profile.name,
        description: profile.description,
        website: profile.website,
        phone: profile.phone,
        address: profile.address,
      });

      if (!res.success) {
        throw new Error(res.message);
      }

      setProfile((prev) => ({
        ...prev,
        name: res.user?.name || prev.name,
        isVerified:
          res.user?.isVerified ?? prev.isVerified,
      }));

      toast.success("Profile updated successfully.");
    } catch (error) {
      console.error("Profile update error:", error);

      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Unable to update profile."
      );
    } finally {
      setSaving(false);
    }
  };

  // ==============================
  // Password Handler
  // ==============================

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;

    setPasswords((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ==============================
  // Change Password
  // ==============================

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (
      !passwords.currentPassword ||
      !passwords.newPassword ||
      !passwords.confirmPassword
    ) {
      toast.error("Please fill all password fields.");
      return;
    }

    if (passwords.newPassword.length < 6) {
      toast.error(
        "New password must be at least 6 characters."
      );
      return;
    }

    if (
      passwords.newPassword !==
      passwords.confirmPassword
    ) {
      toast.error("New passwords do not match.");
      return;
    }

    try {
      setPasswordLoading(true);

      const res = await changePassword({
        currentPassword: passwords.currentPassword,
        newPassword: passwords.newPassword,
      });

      if (!res.success) {
        throw new Error(res.message);
      }

      setPasswords({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      toast.success("Password changed successfully.");
    } catch (error) {
      console.error("Password change error:", error);

      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Unable to change password."
      );
    } finally {
      setPasswordLoading(false);
    }
  };

  // ==============================
  // Loading
  // ==============================

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-[#E7B14C] text-lg">
          Loading settings...
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">

      {/* Header */}

      <div className="mb-8">

        <h1 className="text-3xl font-bold text-white">
          Settings
        </h1>

        <p className="mt-2 text-[#93A79A]">
          Manage your NGO profile and account settings.
        </p>

      </div>

      {/* Verification Status */}

      <div className="mb-8 rounded-2xl border border-white/10 bg-[#1B2A24] p-6">

        <div className="flex items-center gap-4">

          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#E7B14C]/10">

            <ShieldCheck
              className="text-[#E7B14C]"
              size={25}
            />

          </div>

          <div>

            <h2 className="font-semibold text-white">
              NGO Verification
            </h2>

            <p className="mt-1 text-sm text-[#93A79A]">
              Your organization verification status.
            </p>

          </div>

          <div className="ml-auto">

            {profile.isVerified ? (
              <span className="rounded-full bg-green-500/15 px-4 py-2 text-sm font-semibold text-green-400">
                ✓ Verified
              </span>
            ) : (
              <span className="rounded-full bg-yellow-500/15 px-4 py-2 text-sm font-semibold text-yellow-400">
                Pending Verification
              </span>
            )}

          </div>

        </div>

      </div>

      {/* Profile Section */}

      <form onSubmit={handleSaveProfile}>

        <div className="rounded-2xl border border-white/10 bg-[#1B2A24] p-6 md:p-8">

          <div className="mb-7">

            <h2 className="text-xl font-bold text-white">
              Organization Profile
            </h2>

            <p className="mt-1 text-sm text-[#93A79A]">
              Update the information donors see about your organization.
            </p>

          </div>

          <div className="grid gap-6 md:grid-cols-2">

            {/* Name */}

            <div>

              <label className="mb-2 block text-sm text-[#C8D2CC]">
                Organization Name
              </label>

              <div className="relative">

                <User
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#93A79A]"
                />

                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-white/10 bg-[#13231D] py-3 pl-11 pr-4 text-white outline-none focus:border-[#E7B14C]"
                  required
                />

              </div>

            </div>

            {/* Email */}

            <div>

              <label className="mb-2 block text-sm text-[#C8D2CC]">
                Email
              </label>

              <div className="relative">

                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#93A79A]"
                />

                <input
                  type="email"
                  value={profile.email}
                  disabled
                  className="w-full cursor-not-allowed rounded-xl border border-white/10 bg-[#0F1C17] py-3 pl-11 pr-4 text-[#93A79A]"
                />

              </div>

              <p className="mt-2 text-xs text-[#6F8177]">
                Email cannot be changed from Settings.
              </p>

            </div>

            {/* Website */}

            <div>

              <label className="mb-2 block text-sm text-[#C8D2CC]">
                Website
              </label>

              <div className="relative">

                <Globe
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#93A79A]"
                />

                <input
                  type="url"
                  name="website"
                  value={profile.website}
                  onChange={handleChange}
                  placeholder="https://example.org"
                  className="w-full rounded-xl border border-white/10 bg-[#13231D] py-3 pl-11 pr-4 text-white outline-none focus:border-[#E7B14C]"
                />

              </div>

            </div>

            {/* Phone */}

            <div>

              <label className="mb-2 block text-sm text-[#C8D2CC]">
                Phone
              </label>

              <div className="relative">

                <Phone
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#93A79A]"
                />

                <input
                  type="tel"
                  name="phone"
                  value={profile.phone}
                  onChange={handleChange}
                  placeholder="9876543210"
                  className="w-full rounded-xl border border-white/10 bg-[#13231D] py-3 pl-11 pr-4 text-white outline-none focus:border-[#E7B14C]"
                />

              </div>

            </div>

            {/* Address */}

            <div className="md:col-span-2">

              <label className="mb-2 block text-sm text-[#C8D2CC]">
                Address
              </label>

              <div className="relative">

                <MapPin
                  size={18}
                  className="absolute left-4 top-4 text-[#93A79A]"
                />

                <input
                  type="text"
                  name="address"
                  value={profile.address}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-white/10 bg-[#13231D] py-3 pl-11 pr-4 text-white outline-none focus:border-[#E7B14C]"
                />

              </div>

            </div>

            {/* Description */}

            <div className="md:col-span-2">

              <label className="mb-2 block text-sm text-[#C8D2CC]">
                Organization Description
              </label>

              <div className="relative">

                <Building2
                  size={18}
                  className="absolute left-4 top-4 text-[#93A79A]"
                />

                <textarea
                  name="description"
                  value={profile.description}
                  onChange={handleChange}
                  rows={5}
                  className="w-full resize-none rounded-xl border border-white/10 bg-[#13231D] py-3 pl-11 pr-4 text-white outline-none focus:border-[#E7B14C]"
                />

              </div>

            </div>

          </div>

          {/* Save */}

          <div className="mt-8 flex justify-end">

            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 rounded-xl bg-[#E7B14C] px-6 py-3 font-semibold text-[#14201B] transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-60"
            >

              <Save size={18} />

              {saving
                ? "Saving..."
                : "Save Changes"}

            </button>

          </div>

        </div>

      </form>

      {/* Password */}

      <form
        onSubmit={handleChangePassword}
        className="mt-8 rounded-2xl border border-white/10 bg-[#1B2A24] p-6 md:p-8"
      >

        <div className="mb-7">

          <h2 className="flex items-center gap-2 text-xl font-bold text-white">

            <Lock size={20} className="text-[#E7B14C]" />

            Change Password

          </h2>

          <p className="mt-1 text-sm text-[#93A79A]">
            Keep your account secure by using a strong password.
          </p>

        </div>

        <div className="grid gap-6 md:grid-cols-3">

          <input
            type="password"
            name="currentPassword"
            placeholder="Current Password"
            value={passwords.currentPassword}
            onChange={handlePasswordChange}
            className="rounded-xl border border-white/10 bg-[#13231D] px-4 py-3 text-white outline-none focus:border-[#E7B14C]"
          />

          <input
            type="password"
            name="newPassword"
            placeholder="New Password"
            value={passwords.newPassword}
            onChange={handlePasswordChange}
            className="rounded-xl border border-white/10 bg-[#13231D] px-4 py-3 text-white outline-none focus:border-[#E7B14C]"
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm New Password"
            value={passwords.confirmPassword}
            onChange={handlePasswordChange}
            className="rounded-xl border border-white/10 bg-[#13231D] px-4 py-3 text-white outline-none focus:border-[#E7B14C]"
          />

        </div>

        <div className="mt-6 flex justify-end">

          <button
            type="submit"
            disabled={passwordLoading}
            className="rounded-xl border border-[#E7B14C]/40 px-6 py-3 font-semibold text-[#E7B14C] transition hover:bg-[#E7B14C]/10 disabled:opacity-60"
          >
            {passwordLoading
              ? "Updating..."
              : "Change Password"}
          </button>

        </div>

      </form>

    </div>
  );
}