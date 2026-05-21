import { useEffect, useRef } from "react";
import { FaExclamationTriangle } from "react-icons/fa";
import "./confirmDialog.scss";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  variant?: "danger" | "warning";
}

export const ConfirmDialog = ({
  open,
  title,
  message,
  confirmLabel = "Eliminar",
  cancelLabel = "Cancelar",
  onConfirm,
  onCancel,
  variant = "danger",
}: ConfirmDialogProps) => {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (open) {
      el.showModal();
    } else {
      el.close();
    }
  }, [open]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleClose = () => onCancel();
    el.addEventListener("close", handleClose);
    return () => el.removeEventListener("close", handleClose);
  }, [onCancel]);

  return (
    <dialog ref={ref} className={`confirm-dialog confirm-${variant}`} onClick={(e) => { if (e.target === ref.current) onCancel(); }}>
      <div className="confirm-dialog-content">
        <div className="confirm-icon">
          <FaExclamationTriangle />
        </div>
        <h3>{title}</h3>
        <p>{message}</p>
        <div className="confirm-actions">
          <button className="btn-cancel" onClick={onCancel}>
            {cancelLabel}
          </button>
          <button className="btn-confirm" onClick={onConfirm}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </dialog>
  );
};
