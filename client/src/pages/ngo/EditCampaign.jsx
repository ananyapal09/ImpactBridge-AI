import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { showSuccess, showError } from "../../utils/toast";
import {
  getCampaignById,
  updateCampaign,
} from "../../services/campaignService";

export default function EditCampaign() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    goalAmount: "",
    deadline: "",
    image: "",
  });

  useEffect(() => {
    loadCampaign();
  }, []);

  const loadCampaign = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await getCampaignById(id, token);

      const campaign = res.campaign;

      setForm({
        title: campaign.title,
        description: campaign.description,
        category: campaign.category,
        goalAmount: campaign.goalAmount,
        deadline: campaign.deadline.slice(0, 10),
        image: campaign.image || "",
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await updateCampaign(id, form, token);

      showSuccess(
  "✏️ Campaign Updated",
  "Your changes have been saved successfully."
);

      navigate("/ngo-dashboard");
    } catch (err) {
      console.log(err);
      showError(
  "Update Failed",
  "Unable to save your changes."
);
    }
  };

  return (
    <div className="min-h-screen bg-[#14201B] flex justify-center py-16">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-4xl bg-white/5 border border-white/10 rounded-3xl p-10"
      >
        <h1 className="hero-title text-5xl text-white mb-10">
          Edit Campaign
        </h1>

        <div className="space-y-6">

          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Campaign Title"
            className="w-full bg-[#101916] text-white p-4 rounded-xl"
          />

          <textarea
            rows="5"
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full bg-[#101916] text-white p-4 rounded-xl"
          />

          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full bg-[#101916] text-white p-4 rounded-xl"
          >
            <option>Education</option>
            <option>Healthcare</option>
            <option>Environment</option>
            <option>Animal Welfare</option>
            <option>Women Empowerment</option>
          </select>

          <input
            type="number"
            name="goalAmount"
            value={form.goalAmount}
            onChange={handleChange}
            placeholder="Goal Amount"
            className="w-full bg-[#101916] text-white p-4 rounded-xl"
          />

          <input
            type="date"
            name="deadline"
            value={form.deadline}
            onChange={handleChange}
            className="w-full bg-[#101916] text-white p-4 rounded-xl"
          />

          <input
            type="text"
            name="image"
            value={form.image}
            onChange={handleChange}
            placeholder="Image URL"
            className="w-full bg-[#101916] text-white p-4 rounded-xl"
          />

          <button
            className="w-full bg-[#E7B14C] text-[#14201B] font-bold py-4 rounded-xl hover:opacity-90"
          >
            Update Campaign
          </button>

        </div>
      </form>
    </div>
  );
}