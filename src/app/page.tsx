import { TextilHero } from "./textil/components/hero";
import { TextilGallery } from "./textil/components/gallery";
import { TextilBenefits } from "./textil/components/benefits";
import { TextilProcess } from "./textil/components/process";
import { TextilPricing } from "./textil/components/pricing";
import { StockDesigns } from "./textil/components/stock-designs";
import { TextilTestimonials } from "./textil/components/testimonials";
import { TextilFAQ } from "./textil/components/faq";
import { TextilCTA } from "./textil/components/cta";
import { ScrollProgress } from "./textil/components/scroll-progress";

export default function Page() {
  return (
    <>
      <ScrollProgress />
      <TextilHero />
      <TextilGallery />
      <TextilBenefits />
      <TextilProcess />
      <TextilPricing />
      <StockDesigns />
      <TextilTestimonials />
      <TextilFAQ />
      <TextilCTA />
    </>
  );
}
