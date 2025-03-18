import type { Metadata } from "next";
import { JSX } from "react";
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
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
