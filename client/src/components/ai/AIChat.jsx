import { useState } from "react";
import { chatWithAI } from "../../services/aiService";

export default function AIChat({ campaignId }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const askAI = async () => {
    if (!question.trim()) return;

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await chatWithAI(
        campaignId,
        question,
        token
      );

      setAnswer(res.answer);

    } catch (err) {
      console.log(err);

      setAnswer(
        "Unable to get AI response."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8 rounded-3xl border border-[#E7B14C]/20 bg-white/5 p-6">

      <h2 className="text-2xl font-bold text-white">
        🤖 Ask AI
      </h2>

      <textarea
        value={question}
        onChange={(e) =>
          setQuestion(e.target.value)
        }
        rows={4}
        placeholder="Ask anything about this campaign..."
        className="mt-5 w-full rounded-xl bg-[#101916] p-4 text-white outline-none"
      />

      <button
        onClick={askAI}
        className="mt-5 rounded-xl bg-[#E7B14C] px-6 py-3 font-bold text-[#14201B]"
      >
        {loading ? "Thinking..." : "Ask AI"}
      </button>

      {answer && (
        <div className="mt-6 rounded-xl bg-[#101916] p-5">

          <h3 className="mb-3 text-lg font-bold text-[#E7B14C]">
            AI Response
          </h3>

          <p className="text-white whitespace-pre-wrap">
            {answer}
          </p>

        </div>
      )}

    </div>
  );
}