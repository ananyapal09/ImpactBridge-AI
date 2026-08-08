import toast from "react-hot-toast";

export const showSuccess = (title, message) => {
  toast.success(
    <div>
      <p className="font-semibold text-white">{title}</p>
      <p className="text-sm text-gray-300 mt-1">{message}</p>
    </div>,
    {
      duration: 3000,
    }
  );
};

export const showError = (title, message) => {
  toast.error(
    <div>
      <p className="font-semibold text-white">{title}</p>
      <p className="text-sm text-gray-300 mt-1">{message}</p>
    </div>,
    {
      duration: 3500,
    }
  );
};