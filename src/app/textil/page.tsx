import { Metadata } from "next";
import { TextilHero } from "./components/hero";
import { TextilWhatIsDTF } from "./components/what-is-dtf";
import { TextilServices } from "./components/services";
import { TextilProcess } from "./components/process";
import { TextilRecommendations } from "./components/recommendations";
import { TextilPricing } from "./components/pricing";
import { StockDesigns } from "./components/stock-designs";
import { TextilGallery } from "./components/gallery";
import { TextilFAQ } from "./components/faq";
import { TextilCTA } from "./components/cta";
import { ScrollProgress } from "./components/scroll-progress";
import { Stats } from "./components/stats";

export const metadata: Metadata = {
  title: "DMC Projects - Poleras y Uniformes Personalizados",
  description:
    "Personalización textil con tecnología DTF. Poleras, polerones, uniformes corporativos. Desde 1 unidad. Santiago, Chile.",
  keywords: [
    "impresión DTF Chile",
    "poleras personalizadas Santiago",
    "uniformes corporativos",
    "polerones personalizados",
    "DTF textil",
    "estampado poleras",
  ],
};

export default function TextilPage() {
  return (
    <>
      <ScrollProgress />
      <TextilHero />
      <TextilWhatIsDTF />
      <TextilServices />
      <TextilProcess />
      <TextilRecommendations />
      <TextilPricing />
      <StockDesigns />
      <TextilGallery />
      <Stats />
      <TextilFAQ />
      <TextilCTA />
    </>
  );
}
