import SiteHeader from '../layout/SiteHeader';
import SiteFooter from '../layout/SiteFooter';
import HeroSection from './HeroSection';
import ServicesSection from './ServicesSection';
import ServiceAreasSection from './ServiceAreasSection';
import TestimonialsSection from './TestimonialsSection';
import LeadCaptureSection from '../leads/LeadCaptureSection';

interface MarketingPageProps {
  onNavigateToCRM: () => void;
  onScrollToQuote: () => void;
}

export default function MarketingPage({ onNavigateToCRM, onScrollToQuote }: MarketingPageProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader onNavigateToCRM={onNavigateToCRM} onScrollToQuote={onScrollToQuote} />
      <main className="flex-1">
        <HeroSection onScrollToQuote={onScrollToQuote} />
        <ServicesSection />
        <ServiceAreasSection />
        <TestimonialsSection />
        <LeadCaptureSection />
      </main>
      <SiteFooter onScrollToQuote={onScrollToQuote} />
    </div>
  );
}
