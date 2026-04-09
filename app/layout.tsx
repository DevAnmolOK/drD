import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import NavigationBar from "../component/layOut/Header";
import Footer from "@/component/layOut/Footer";
import localFont from "next/font/local";
import fetchProductMenu from "@/utills/fetchProductMenu";
import { CommonEndPoints } from "../lib/service/CommonEndPoints";
import { getNewLaunchesProducts } from "@/utills/newLaunches";
import { getUpcomingProducts } from "@/utills/getUpcomingProducts";
import { getPromotionalOffers } from "@/utills/getPromotionalOffers";
import { fetchOffers } from "@/utills/fetchOffers";
import { fetchCertificates } from "@/utills/fetchCertificates";
import { BlogEndPoints } from "@/lib/service/BlogsEndPoints";

interface NewLaunchProductsProps {
  params: Promise<{ typeId: string }>;
}

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
    index: true,
    follow: true,
  },
};

// Avoid build-time prerender: parallel fetches to the local API cause ECONNRESET under load.
export const dynamic = "force-dynamic";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const navBar = await CommonEndPoints.menu();
  const footer = await CommonEndPoints.footerMenu();
  const productMenu = await fetchProductMenu();
  const newLaunchProducts = await getNewLaunchesProducts();
  const upcomingProducts = await getUpcomingProducts();
  const { promo } = await getPromotionalOffers();
  const { validOffers, expiredOffers } = await fetchOffers();
  const { certificates } = await fetchCertificates();
  const AllBlogs = await BlogEndPoints.blogList();

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="google-site-verification"
          content="7RfPynaXIu4_xDVY-mWN4NBiwPEsW1DRaa0vCH6tBos"
        />
        {/* Google tag (gtag.js)  */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=id=G-QCVHYXSSHL`}
        />
        {/* GA init */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){window.dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-QCVHYXSSHL');
            `,
          }}
        />

        <Script id="gtm-script" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){
              w[l]=w[l]||[];
              w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
              var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
              j.async=true;
              j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
              f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-N2NX8C6F');
          `}
        </Script>
      </head>
      <body className={`${sans.variable} antialiased`}>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=GTM-N2NX8C6F`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        <NavigationBar
          navBar={navBar}
          productMenu={productMenu}
          certificates={certificates}
          AllBlogs={AllBlogs}
          newLaunchProducts={newLaunchProducts}
          upCommingProducts={upcomingProducts}
          validOffers={validOffers}
          expiredOffers={expiredOffers}
          promo={promo}
        />
        {children}
        <Footer data={footer} />
      </body>
    </html>
  );
}
