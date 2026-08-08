import {
  Check,
  X,
  FileText,
} from "lucide-react";

export default function NgoRow({
  ngo,
  onApprove,
  onReject,
}) {
  return (
    <div className="grid grid-cols-12 items-center py-5 border-b border-white/5 hover:bg-white/5 transition">

      {/* NGO */}

      <div className="col-span-4">
        <h3 className="text-white font-medium">
          {ngo.name}
        </h3>

        <p className="text-sm text-[#93A79A] mt-1">
          {ngo.email}
        </p>
      </div>

      {/* Registration */}

      <div className="col-span-3">
        <p className="text-[#93A79A]">
          {ngo.registration}
        </p>
      </div>

      {/* Status */}

      <div className="col-span-2">
        <span className="bg-yellow-500/10 text-[#E7B14C] px-3 py-1 rounded-full text-sm">
          Pending
        </span>
      </div>

      {/* Documents */}

      <div className="col-span-1">
        <button className="text-[#E7B14C] hover:text-white transition">
          <FileText size={20} />
        </button>
      </div>

      {/* Actions */}

      <div className="col-span-2 flex gap-3">

        <button
  onClick={onApprove}
  className="w-10 h-10 rounded-lg bg-green-500/10 text-green-400 hover:bg-green-500 transition hover:text-white flex items-center justify-center"
>
  <Check size={18} />
</button>

<button
  onClick={onReject}
  className="w-10 h-10 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500 transition hover:text-white flex items-center justify-center"
>
  <X size={18} />
</button>

      </div>

    </div>
  );
}