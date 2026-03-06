import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers/Providers";

export const metadata: Metadata = {
  metadataBase: new URL("https://dmccrew.cl"),
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.png", type: "image/png", sizes: "192x192" },
    ],
    apple: "/apple-touch-icon.png",
  },
  title: {
    default: "DMC Crew - Personalización Textil DTF",
    template: "%s | DMC Crew",
  },
  description:
    "Impresión DTF y personalización textil en Chile. Poleras, polerones, uniformes y merchandising con entrega rápida y calidad premium.",
  keywords: [
    "impresión DTF",
    "poleras personalizadas",
    "uniformes corporativos",
    "polerones personalizados",
    "merchandising personalizado",
    "DMC Crew",
  ],
  authors: [{ name: "DMC Crew" }],
  creator: "DMC Crew",
  openGraph: {
    type: "website",
    locale: "es_CL",
    url: "https://dmccrew.cl",
    siteName: "DMC Crew",
    title: "DMC Crew - Personalización Textil DTF",
    description:
      "Impresión DTF y personalización textil en Chile. Poleras, polerones, uniformes y merchandising.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "DMC Crew",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DMC Crew - Personalización Textil DTF",
    description:
      "Impresión DTF y personalización textil en Chile. Poleras, polerones, uniformes y merchandising.",
    images: ["/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "PLACEHOLDER_GOOGLE_VERIFICATION",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Orbitron:wght@400;500;600;700;800;900&family=Rajdhani:wght@300;400;500;600;700&family=Poppins:wght@300;400;500;600;700;800;900&family=Montserrat:wght@300;400;500;600;700;800;900&family=Roboto:wght@300;400;500;700;900&family=Open+Sans:wght@300;400;500;600;700;800&family=Lato:wght@300;400;700;900&family=Raleway:wght@300;400;500;600;700;800;900&family=Playfair+Display:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased min-h-screen">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
