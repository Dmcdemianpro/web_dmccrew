import { Metadata } from "next";
import { PortfolioContent } from "./components/portfolio-content";

export const metadata: Metadata = {
  title: "Portafolio - Casos de Éxito y Trabajos",
  description:
    "Trabajos de impresión DTF y personalización textil. Conoce lo que hemos logrado para nuestros clientes.",
};

export default function PortfolioPage() {
  return <PortfolioContent />;
}
