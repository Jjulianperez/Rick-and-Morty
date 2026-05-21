import { useToastStore } from "../../stores/toastStore";
import { AiFillCheckCircle, AiFillCloseCircle, AiFillInfoCircle } from "react-icons/ai";
import "./toast.scss";

const iconMap = {
  success: <AiFillCheckCircle />,
  error: <AiFillCloseCircle />,
  info: <AiFillInfoCircle />,
};

export const ToastContainer = () => {
  const { toasts, removeToast } = useToastStore();

  if (toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`toast toast-${toast.type} ${toast.exiting ? "toast-exit" : ""}`}
          onClick={() => removeToast(toast.id)}
        >
          <span className="toast-icon">{iconMap[toast.type]}</span>
          <span className="toast-message">{toast.message}</span>
        </div>
      ))}
    </div>
  );
};
