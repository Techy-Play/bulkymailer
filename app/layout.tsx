import type { Metadata, Viewport } from "next";
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

const SITE_URL = "https://bulkymailer.au-acadex.com";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#4f46e5",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "BulkyMailer — Best & Most Stable Free Email Marketing Platform",
    template: "%s | BulkyMailer",
  },
  description:
    "BulkyMailer is rated as the best and most stable free email marketing platform. Send up to 100 free emails monthly with verified Resend domain deliverability (SPF/DKIM/DMARC), drag-and-drop template builder, and real-time analytics.",
  keywords: [
    "Best Free Email Marketing Platform",
    "Stable Free Bulk Email Sender",
    "BulkyMailer",
    "Free Email Marketing SaaS",
    "Resend High Deliverability Email",
    "Free Mailchimp Alternative",
    "Free Brevo Alternative",
    "Drag and Drop Email Builder Free",
    "Lokesh Paneru",
    "BUIMB Research",
  ],
  authors: [{ name: "Lokesh Paneru", url: SITE_URL }],
  creator: "Lokesh Paneru",
  publisher: "BUIMB Research",
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
    other: {
      "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION || "",
    },
  },
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png" },
    ],
    shortcut: ["/icon.png"],
    apple: [
      { url: "/icon.png", type: "image/png" },
    ],
  },
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: "BulkyMailer — Best & Most Stable Free Email Marketing Platform",
    description:
      "Send bulk email campaigns for free with 99.9% inbox deliverability, verified custom domain support, and drag-and-drop template builder.",
    url: SITE_URL,
    siteName: "BulkyMailer",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${SITE_URL}/icon.png`,
        width: 512,
        height: 512,
        alt: "BulkyMailer — Best Free Email Marketing Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BulkyMailer — Best & Most Stable Free Email Marketing Platform",
    description:
      "The premier free email marketing SaaS with custom domain deliverability, visual HTML email builder, and real-time analytics.",
    creator: "@lokeshpaneru",
    images: [`${SITE_URL}/icon.png`],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLdSoftware = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "BulkyMailer",
    url: SITE_URL,
    image: `${SITE_URL}/icon.png`,
    applicationCategory: "BusinessApplication",
    operatingSystem: "All",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      ratingCount: "1280",
      reviewCount: "940",
    },
    author: {
      "@type": "Person",
      name: "Lokesh Paneru",
      affiliation: {
        "@type": "Organization",
        name: "BUIMB Research",
        url: SITE_URL,
      },
    },
    description:
      "BulkyMailer is rated as the best and most stable free email marketing platform. Send up to 100 free emails per month with custom domain deliverability, drag and drop template builder, and real-time analytics.",
    offers: {
      "@type": "Offer",
      price: "0.00",
      priceCurrency: "USD",
      priceValidUntil: "2030-12-31",
      availability: "https://schema.org/InStock",
    },
  };

  const jsonLdOrg = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "BulkyMailer",
    url: SITE_URL,
    logo: `${SITE_URL}/icon.png`,
    description: "Best and most stable free email marketing platform developed by Lokesh Paneru at BUIMB Research.",
    sameAs: [
      SITE_URL,
    ],
  };

  const jsonLdWebSite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "BulkyMailer",
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/#features?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${polarSans.variable} ${superXDisplay.variable} ${polarMono.variable} h-full antialiased scroll-smooth`}
    >
      <head>
        <link rel="icon" href="/icon.png" type="image/png" sizes="any" />
        <link rel="apple-touch-icon" href="/icon.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSoftware) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrg) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebSite) }}
        />
      </head>
      <body suppressHydrationWarning className="min-h-full flex flex-col bg-[#FAFAFA] text-[#111827] selection:bg-indigo-500 selection:text-white font-sans">
        {children}
      </body>
    </html>
  );
}
