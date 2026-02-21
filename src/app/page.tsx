import { TextilHero } from "./textil/components/hero";
import { TextilWhatIsDTF } from "./textil/components/what-is-dtf";
import { TextilServices } from "./textil/components/services";
import { TextilProcess } from "./textil/components/process";
import { TextilRecommendations } from "./textil/components/recommendations";
import { TextilPricing } from "./textil/components/pricing";
import { TextilConfigurator } from "./textil/components/configurator";
import { StockDesigns } from "./textil/components/stock-designs";
import { TextilGallery } from "./textil/components/gallery";
import { TextilFAQ } from "./textil/components/faq";
import { TextilCTA } from "./textil/components/cta";
import { ScrollProgress } from "./textil/components/scroll-progress";
import { Stats } from "./textil/components/stats";

export default function Page() {
  return (
    <>
      <ScrollProgress />
      <TextilHero />
      <TextilWhatIsDTF />
      <TextilServices />
      <TextilProcess />
      <TextilRecommendations />
      <TextilPricing />
      <TextilConfigurator />
      <StockDesigns />
      <TextilGallery />
      <Stats />
      <TextilFAQ />
      <TextilCTA />
    </>
  );
}
