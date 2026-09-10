import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fintrack",
  description: "Fintrack",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body className="flex">
        {children}
      </body>
    </html>
  );
}
