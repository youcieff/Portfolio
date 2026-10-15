import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "@/app/globals.css";
import { AppProviders } from "@/components/providers/app-providers";
import { IntroLoader } from "@/components/ui/intro-loader";
import { Navigation } from "@/components/ui/navigation";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { ReadingProgress } from "@/components/ui/reading-progress";
import { site } from "@/data/site";

const outfit = localFont({
  src: "./fonts/outfit-latin-variable.woff2",
  variable: "--font-outfit",
  display: "swap",
  weight: "100 900",
});
const dmSans = localFont({
  src: "./fonts/dm-sans-latin-variable.woff2",
  variable: "--font-dm-sans",
  display: "swap",
  weight: "100 1000",
});

const description =
  "Youssef Maged Hanna is a Full Stack Developer in Giza, Egypt, building AI-assisted learning tools, commerce, booking, and multiplayer experiences.";

export const metadata: Metadata = {
  metadataBase: new URL(site.website),
  title: { default: `${site.name} — ${site.role}`, template: `%s — ${site.name}` },
  description,
  applicationName: `${site.name} Portfolio`,
  alternates: { canonical: "/" },
  authors: [{ name: site.name, url: site.website }],
  creator: site.name,
  openGraph: {
    type: "website",
    url: "/",
    title: `${site.name} — ${site.role}`,
    description,
    siteName: `${site.name} Portfolio`,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${site.name} — Full Stack Developer`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.role}`,
    description,
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  icons: { icon: "/icon.svg", apple: "/icon.svg" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f4fb" },
    { media: "(prefers-color-scheme: dark)", color: "#090c19" },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: site.role,
    email: site.email,
    telephone: site.phone,
    address: { "@type": "PostalAddress", addressLocality: site.city, addressCountry: site.country },
    url: site.website,
    sameAs: [site.github, site.linkedin],
  };
  return (
    <html
      lang="en"
      className={`no-js intro-pending ${outfit.variable} ${dmSans.variable}`}
      suppressHydrationWarning
    >
      <head>
        <meta name="color-scheme" content="light dark" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(person).replace(/</g, "\\u003c") }}
        />
      </head>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <AppProviders>
          <ReadingProgress />
          <Navigation />
          <CustomCursor />
          <IntroLoader />
          {children}
        </AppProviders>
      </body>
    </html>
  );
}
