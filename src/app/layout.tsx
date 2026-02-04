import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers/Providers";

export const metadata: Metadata = {
  metadataBase: new URL("https://dmcprojects.cl"),
  title: {
    default: "DMC Projects - Interoperabilidad en Salud e Impresión DTF",
    template: "%s | DMC Projects",
  },
  description:
    "Especialistas en integración de sistemas clínicos (HL7, FHIR, Mirth) y personalización textil DTF. Poleras, uniformes y más. Chile.",
  keywords: [
    "interoperabilidad salud Chile",
    "integración sistemas clínicos",
    "HL7",
    "FHIR",
    "Mirth Connect",
    "impresión DTF",
    "poleras personalizadas",
    "uniformes corporativos",
    "DMC Projects",
  ],
  authors: [{ name: "DMC Projects" }],
  creator: "DMC Projects",
  openGraph: {
    type: "website",
    locale: "es_CL",
    url: "https://dmcprojects.cl",
    siteName: "DMC Projects",
    title: "DMC Projects - Interoperabilidad en Salud e Impresión DTF",
    description:
      "Especialistas en integración de sistemas clínicos y personalización textil DTF en Chile.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "DMC Projects",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DMC Projects - Interoperabilidad en Salud e Impresión DTF",
    description:
      "Especialistas en integración de sistemas clínicos y personalización textil DTF en Chile.",
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
