import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"], // Specify the desired font weights
  subsets: ["latin", "cyrillic"], // Specify the desired subsets
});

export const metadata: Metadata = {
  title: "Tasky",
  description: "Task Tracker website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
