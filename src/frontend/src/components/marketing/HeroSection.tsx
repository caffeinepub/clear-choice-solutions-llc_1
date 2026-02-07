import { Button } from '@/components/ui/button';
import { Sparkles, CheckCircle2 } from 'lucide-react';

interface HeroSectionProps {
  onScrollToQuote: () => void;
}

export default function HeroSection({ onScrollToQuote }: HeroSectionProps) {
  return (
    <section className="relative bg-gradient-to-br from-primary/5 via-background to-accent/5 overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-sm font-medium text-primary">
              <Sparkles className="w-4 h-4" />
              <span>Trusted by 200+ Property Managers</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
              Commercial Cleaning Excellence for{' '}
              <span className="text-primary">Property Managers</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl text-balance">
              Clear Choice Solutions delivers spotless, reliable commercial cleaning services across DC, Maryland, and
              Virginia. We make property management easier with consistent quality and responsive service.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-foreground">24/7 Emergency Response Available</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-foreground">Fully Insured & Bonded Teams</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-foreground">Customized Service Plans</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" onClick={onScrollToQuote} className="text-base px-8 shadow-soft">
                Get Free Quote
              </Button>
              <Button size="lg" variant="outline" onClick={onScrollToQuote} className="text-base px-8">
                Schedule Consultation
              </Button>
            </div>
          </div>
          <div className="relative lg:h-[500px] h-[350px] rounded-2xl overflow-hidden shadow-soft">
            <img
              src="/assets/generated/ccs-hero.dim_1600x900.png"
              alt="Professional commercial cleaning services"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
