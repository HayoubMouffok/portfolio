import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { profile } from "@/lib/data";

const title = `${profile.firstName} ${profile.lastName} — ${profile.title}`;
const description =
  "Ingénieur DevOps, systèmes, réseaux et cybersécurité en Île-de-France : Kubernetes, CI/CD, BGP et EVPN-VXLAN, Linux et Active Directory, détection et réponse aux intrusions. Disponible immédiatement.";

export const metadata: Metadata = {
  metadataBase: new URL(profile.site),
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: { title, description, url: "/", type: "website", locale: "fr_FR", images: [{ url: "/og.png", width: 1200, height: 630 }] },
  twitter: { card: "summary_large_image", title, description, images: ["/og.png"] },
  icons: { icon: "/icon.svg" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#090e1a" },
    { media: "(prefers-color-scheme: light)", color: "#f4f5f7" },
  ],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: `${profile.firstName} ${profile.lastName}`,
  jobTitle: profile.title,
  url: profile.site,
  email: `mailto:${profile.email}`,
  address: { "@type": "PostalAddress", addressRegion: "Île-de-France", addressCountry: "FR" },
  sameAs: [profile.linkedin, profile.github],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className="grain">
        <Providers>{children}</Providers>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
