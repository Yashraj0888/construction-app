import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Construction Card Assistance | CSCS Cards, CITB Tests & Training Courses",
  description:
    "Apply for your CSCS Card, book your CITB Health Safety & Environment Touchscreen Test, or register for construction training courses completely online. Fast, simple, and secure.",
  keywords:
    "CSCS card, CITB test, CITB HS&E test, construction courses, green labourer card, blue skilled worker card, CSCS card renewal, construction health safety",
  openGraph: {
    title: "Construction Card Assistance | CSCS Cards, CITB Tests & Training",
    description:
      "Meet all your requirements to get on site. Apply for CSCS Cards, book CITB Tests, or register for courses online.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Outfit:wght@500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
