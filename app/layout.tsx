import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const polarSans = localFont({
  src: "../public/fonts/FTPolar_Regular-s.p.61d92bfa.woff2",
  variable: "--font-polar-sans",
  display: "swap",
});

const superXDisplay = localFont({
  src: "../public/fonts/NaNSuperXSansDisplay_VF_TRIAL-s.p.55b41e97.woff2",
  variable: "--font-super-display",
  display: "swap",
});

const polarMono = localFont({
  src: [
    {
      path: "../public/fonts/FTPolarMono_Regular-s.p.23bb8712.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/FTPolarMono_Medium-s.p.119f14b6.woff2",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-polar-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "BulkyMailer — Email Marketing That Gets Delivered",
    template: "%s | BulkyMailer",
  },
  description:
    "BulkyMailer is a modern email marketing platform built for speed, deliverability, and growth. Developed by Lokesh Paneru at BUIMB Research.",
  keywords: [
    "Email Marketing",
    "SaaS Email Platform",
    "BulkyMailer",
    "Lokesh Paneru",
    "BUIMB Research",
    "Email Automation",
    "Developer Email API",
    "Campaign Analytics",
  ],
  authors: [{ name: "Lokesh Paneru", url: "https://bulkymailer.vercel.app/" }],
  creator: "Lokesh Paneru",
  publisher: "BUIMB Research",
  metadataBase: new URL("https://bulkymailer.vercel.app/"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "BulkyMailer — Email Marketing That Gets Delivered",
    description:
      "Create campaigns, manage subscribers, and track analytics with 99.99% inbox deliverability.",
    url: "https://bulkymailer.vercel.app/",
    siteName: "BulkyMailer",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BulkyMailer — Modern Email Marketing SaaS",
    description:
      "Modern email marketing platform built for high deliverability and scale. Developed by Lokesh Paneru.",
    creator: "@lokeshpaneru",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "BulkyMailer",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    author: {
      "@type": "Person",
      name: "Lokesh Paneru",
      affiliation: {
        "@type": "Organization",
        name: "BUIMB Research",
      },
    },
    description:
      "BulkyMailer is a modern email marketing SaaS platform providing scalable email campaign management, real-time analytics, and high-performance delivery APIs.",
    offers: {
      "@type": "Offer",
      price: "0.00",
      priceCurrency: "USD",
    },
  };

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${polarSans.variable} ${superXDisplay.variable} ${polarMono.variable} h-full antialiased scroll-smooth`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body suppressHydrationWarning className="min-h-full flex flex-col bg-[#FAFAFA] text-[#111827] selection:bg-indigo-500 selection:text-white font-sans">
        {children}
      </body>
    </html>
  );
}
