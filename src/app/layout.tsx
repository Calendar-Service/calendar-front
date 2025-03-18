import type { Metadata } from "next";
import { JSX } from "react";
import { Toaster } from "react-hot-toast";
import "./globals.css";

export const metadata: Metadata = {
  title: "Calendar Front",
  description: "Calendar & Schedule Management System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <html lang="en">
        <body>{children}</body>
      </html>
    </>
  );
}
