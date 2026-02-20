import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavigationBar from "../component/layOut/Header";
import Footer from "@/component/layOut/Footer";
import localFont from "next/font/local";
import fetchProductMenu from "@/utills/fetchProductMenu";
import { CommonEndPoints } from "../lib/service/CommonEndPoints";

const sans = localFont({
  src: "../public/fonts/DMSans-VariableFont_opsz,wght.ttf",
  variable: "--font-DmSans",
  weight: "100 900",
  display: "swap",
});


export const metadata: Metadata = {
  title: " DR D Pharma",
  description:
    "Explore DR D Pharma’s therapeutic divisions including Antibiotic, Cardio-Diabetic, Dermatology, Nutraceutical, Pediatric, Gynecology and more.",
  icons: {
    icon: "/images/dr-d.png",
    shortcut: "/images/dr-d.png",
    apple: "/images/dr-d.png",
  },
    robots: {
    index: false,
    follow: false,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const navBar = await CommonEndPoints.menu();
  const footer = await CommonEndPoints.footerMenu();
  const productMenu = await fetchProductMenu();
  const navItems = [
    { label: "Home", href: "/", active: true },
    { label: "About Us", href: "/about-us" },
    { label: "Facility", href: "/facility" },
    { label: "Products", href: "/product" },
    { label: "Our Divisions", href: "/our-divisions" },
    { label: "New Launches", href: "/new-launches" },
    { label: "Gallery", href: "/gallery" },
  ];
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={`${sans.variable} antialiased`}>
        <NavigationBar navBar={navBar} productMenu={productMenu} />
        {children}
        <Footer />
      </body>
    </html>
  );
}
