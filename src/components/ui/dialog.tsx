import { JSX, ReactNode } from "react";
import ReactDOM from "react-dom";

export interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
}

export function Dialog({
  open,
  onOpenChange,
  children,
}: DialogProps): JSX.Element {
  if (!open) return <></>;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded p-4 relative">
        {children}
        <button
          type="button"
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
          onClick={() => onOpenChange(false)}
          aria-label="Close"
        >
          ✕
        </button>
      </div>
    </div>,
    document.body
  );
}

export interface DialogContentProps {
  children: ReactNode;
}

export function DialogContent({ children }: DialogContentProps): JSX.Element {
  return <div className="p-4">{children}</div>;
}

export interface DialogHeaderProps {
  children: ReactNode;
}

export function DialogHeader({ children }: DialogHeaderProps): JSX.Element {
  return <div className="mb-4 border-b pb-2">{children}</div>;
}

export interface DialogTitleProps {
  children: ReactNode;
}

export function DialogTitle({ children }: DialogTitleProps): JSX.Element {
  return <h2 className="text-xl font-bold">{children}</h2>;
}
