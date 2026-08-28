import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isDestructive?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  isDestructive = true,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="bg-[#FFFFFF] max-w-md w-full p-6 border border-[#E7E7E2] shadow-xl space-y-4"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            {isDestructive ? (
              <div className="p-2 bg-red-50 text-red-700 rounded-full">
                <AlertTriangle className="w-5 h-5" />
              </div>
            ) : null}
            <h3 className="font-serif text-xl text-[#1A1A1A] italic">{title}</h3>
          </div>
          <button
            onClick={onCancel}
            className="text-[#737871] hover:text-[#1A1A1A] p-1"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-sm text-[#5A5E57] leading-relaxed">{message}</p>

        <div className="flex justify-end gap-3 pt-4 border-t border-[#E7E7E2]">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-xs uppercase tracking-wider font-medium text-[#5A5E57] hover:bg-[#E8EDE0] transition-colors"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={`px-5 py-2 text-xs uppercase tracking-wider font-semibold transition-colors shadow-xs ${
              isDestructive
                ? 'bg-red-700 text-white hover:bg-red-800'
                : 'bg-[#1A1C19] text-[#FFFFFF] hover:bg-[#8A9A5B]'
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};
