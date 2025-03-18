import React, { JSX } from "react";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export function Input({ className = "", ...props }: InputProps): JSX.Element {
  return <input {...props} className={`border rounded p-2 ${className}`} />;
}
