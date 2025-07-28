import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Frontend Engineer | Azad Kumar",
  icons: {
    icon: "white_fav.svg",
    shortcut: "white_fav.svg",
    apple:"white_fav.svg"
  },
  description: "Azad Kumar is a frontend software engineer from India who builds responsive, accessible, and pixel-perfect web applications using modern technologies.",
  keywords: [
    "Frontend Engineer",
    "Software Developer",
    "React Developer",
    "Web Developer India",
    "Frontend Portfolio",
    "JavaScript",
    "Next.js",
    "UI Engineer",
    "Pixel Perfect Web Apps",
    "Azad Kumar"
  ],
  authors: [{ name: "Azad Kumar", url: "https://yourdomain.com" }],
  creator: "Azad Kumar",
  themeColor: "#ffffff",
  openGraph: {
    title: "Azad Kumar | Frontend Engineer",
    description: "Portfolio of Azad Kumar, a frontend software engineer from India who crafts high-quality web experiences.",
    url: "https://yourdomain.com",
    siteName: "Azad Kumar Portfolio",
    images: [
      {
        url: "/og_image.png", // Update with your OG image
        width: 1200,
        height: 630,
        alt: "Azad Kumar Portfolio Screenshot",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Azad Kumar | Frontend Engineer",
    description: "Building fast, modern, pixel-perfect web apps.",
    creator: "@Azadtom2917", // Optional
    images: ["/og_image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
