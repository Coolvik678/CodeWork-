import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tanish ENT Hospital | Dr. Akshay Suratwala - ENT Specialist in Surat",
  description: "Tanish ENT Hospital in Adajan, Surat. Led by Dr. Akshay Suratwala, MBBS, MS - ENT (Gold Medalist Surgeon). Advanced ear, nose, throat, and vertigo diagnostic & surgical care.",
  keywords: ["Tanish ENT Hospital", "Dr. Akshay Suratwala", "ENT Surgeon Surat", "Best ENT doctor Adajan", "Ear Nose Throat specialist Surat", "Gold Medalist ENT surgeon", "Vertigo treatment Surat", "Sinus surgery Surat", "Tonsil surgery Surat"],
  authors: [{ name: "Dr. Akshay Suratwala" }],
  openGraph: {
    title: "Tanish ENT Hospital | Dr. Akshay Suratwala",
    description: "State-of-the-Art Diagnostic & Surgical Excellence in Adajan, Surat.",
    url: "https://tanish-ent-hospital.vercel.app",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-medical-light text-slate-800 font-sans">
        {children}
      </body>
    </html>
  );
}
