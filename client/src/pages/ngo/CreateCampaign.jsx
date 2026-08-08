import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { showSuccess, showError } from "../../utils/toast";
import { createCampaign } from "../../services/campaignService";

export default function CreateCampaign() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    goalAmount: "",
    deadline: "",
    image: null,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    setLoading(true);

    const token = localStorage.getItem("token");

    const data = new FormData();

    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("category", formData.category);
    data.append("goalAmount", formData.goalAmount);
    data.append("deadline", formData.deadline);

    if (formData.image) {
      data.append("image", formData.image);
    }

    console.log("Sending request...");

    const response = await createCampaign(data, token);

    console.log("Response received:", response);

    showSuccess(
      "Campaign Created",
      "Your campaign has been published successfully!"
    );

    navigate("/ngo-dashboard");

  } catch (err) {
    console.error("Create Campaign Error:", err);

    showError(
      "Creation Failed",
      err.response?.data?.message || "Unable to create campaign."
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-[#14201B] flex justify-center items-center p-10">
      <div className="w-full max-w-3xl bg-white/5 border border-white/10 rounded-3xl p-10">

        <h1 className="hero-title text-5xl text-white mb-8">
          Create Campaign
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Campaign Image */}

          <div>
            <label className="block mb-2 text-white font-medium">
              Campaign Cover Image
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full rounded-xl border border-white/10 bg-[#101916] p-4 text-white
              file:mr-4
              file:rounded-lg
              file:border-0
              file:bg-[#E7B14C]
              file:px-4
              file:py-2
              file:font-semibold
              file:text-[#14201B]"
            />
          </div>

          {/* Campaign Title */}

          <input
            type="text"
            name="title"
            placeholder="Campaign Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-[#101916] text-white border border-white/10"
            required
          />

          {/* Description */}

          <textarea
            rows="5"
            name="description"
            placeholder="Campaign Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-[#101916] text-white border border-white/10"
            required
          />

          {/* Category */}

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-[#101916] text-white border border-white/10"
            required
          >
            <option value="">Select Category</option>
            <option value="Education">Education</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Environment">Environment</option>
            <option value="Animal Welfare">Animal Welfare</option>
            <option value="Women Empowerment">Women Empowerment</option>
            <option value="Disaster Relief">Disaster Relief</option>
            <option value="Food">Food</option>
          </select>

          {/* Goal */}

          <input
            type="number"
            name="goalAmount"
            placeholder="Goal Amount"
            value={formData.goalAmount}
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-[#101916] text-white border border-white/10"
            required
          />

          {/* Deadline */}

          <input
            type="date"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-[#101916] text-white border border-white/10"
            required
          />

          {/* Buttons */}

          <div className="flex gap-4">

            <button
              type="button"
              onClick={() => navigate("/ngo-dashboard")}
              className="flex-1 py-4 rounded-xl bg-white/10 text-white hover:bg-white/20 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-4 rounded-xl bg-[#E7B14C] text-[#14201B] font-bold hover:opacity-90 transition"
            >
              {loading ? "Creating..." : "Create Campaign"}
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}