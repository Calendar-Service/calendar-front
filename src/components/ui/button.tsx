import React, { JSX } from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Button({
  children,
  className = "",
  ...props
}: ButtonProps): JSX.Element {
  return (
    <button
      {...props}
      className={`px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 transition ${className}`}
    >
      {children}
    </button>
  );
}
