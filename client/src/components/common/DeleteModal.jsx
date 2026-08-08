export default function DeleteModal({
  isOpen,
  title,
  message,
  onCancel,
  onConfirm,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-[430px] rounded-3xl border border-white/10 bg-[#1B2A24] p-8 shadow-2xl animate-fadeIn">

        <div className="flex justify-center text-5xl mb-4">
          🗑️
        </div>

        <h2 className="hero-title text-3xl text-center text-white">
          {title}
        </h2>

        <p className="text-center text-[#B6C2BC] mt-5">
          {message}
        </p>

        <p className="text-center text-red-400 text-sm mt-3">
          This action cannot be undone.
        </p>

        <div className="flex gap-4 mt-8">

          <button
            onClick={onCancel}
            className="flex-1 py-3 rounded-xl bg-white/10 text-white hover:bg-white/20 transition"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="flex-1 py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white font-semibold transition"
          >
            Delete
          </button>

        </div>

      </div>
    </div>
  );
}