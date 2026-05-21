import { create } from "zustand";

export type ToastType = "success" | "error" | "info";

interface Toast {
  id: string;
  message: string;
  type: ToastType;
  exiting?: boolean;
}

interface ToastState {
  toasts: Toast[];
  addToast: (message: string, type?: ToastType) => void;
  removeToast: (id: string) => void;
}

export const useToastStore = create<ToastState>((set, get) => ({
  toasts: [],
  addToast: (message, type = "info") => {
    const id = crypto.randomUUID();
    set({ toasts: [...get().toasts, { id, message, type }] });
    setTimeout(() => {
      const toast = get().toasts.find((t) => t.id === id);
      if (toast) {
        set({
          toasts: get().toasts.map((t) =>
            t.id === id ? { ...t, exiting: true } : t
          ),
        });
        setTimeout(() => {
          set({ toasts: get().toasts.filter((t) => t.id !== id) });
        }, 300);
      }
    }, 3000);
  },
  removeToast: (id) => {
    set({ toasts: get().toasts.filter((t) => t.id !== id) });
  },
}));
