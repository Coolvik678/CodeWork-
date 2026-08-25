import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-heading",
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dr. Kothawala's Dental Cure & Care Center — Multi-Specialty Dental Clinic",
  description: "Experience premium multi-specialty family dentistry led by Dr. Abrar Kothawala and Dr. Khadeja Kothawala along with 7 expert consultants. 100% sterilization and advanced care.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${plusJakartaSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col relative bg-white text-slate-900">
        {children}
      </body>
    </html>
  );
}
