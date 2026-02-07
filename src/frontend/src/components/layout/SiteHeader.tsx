import { Button } from '@/components/ui/button';
import { Menu, X, Phone, Mail } from 'lucide-react';
import { useState } from 'react';
import { CONTACT_CONFIG, getTelHref, getMailtoHref } from '@/config/contact';

interface SiteHeaderProps {
  onNavigateToCRM: () => void;
  onScrollToQuote: () => void;
}

export default function SiteHeader({ onNavigateToCRM, onScrollToQuote }: SiteHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/assets/generated/ccs-logo.dim_512x256.png" alt="Clear Choice Solutions" className="h-8" />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <button
              onClick={() => scrollToSection('services')}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection('service-areas')}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Service Areas
            </button>
            <button
              onClick={() => scrollToSection('testimonials')}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Testimonials
            </button>
            <div className="flex items-center gap-4 pl-2 border-l">
              <a
                href={getTelHref()}
                className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span className="hidden lg:inline">{CONTACT_CONFIG.phone.display}</span>
              </a>
              <a
                href={getMailtoHref()}
                className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span className="hidden lg:inline">Email</span>
              </a>
            </div>
            <Button variant="outline" size="sm" onClick={onNavigateToCRM}>
              CRM Login
            </Button>
            <Button size="sm" onClick={onScrollToQuote}>
              Get Quote
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 space-y-3 border-t">
            <button
              onClick={() => scrollToSection('services')}
              className="block w-full text-left px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection('service-areas')}
              className="block w-full text-left px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors"
            >
              Service Areas
            </button>
            <button
              onClick={() => scrollToSection('testimonials')}
              className="block w-full text-left px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors"
            >
              Testimonials
            </button>
            <div className="px-4 pt-2 space-y-2 border-t">
              <a
                href={getTelHref()}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors"
              >
                <Phone className="w-4 h-4" />
                {CONTACT_CONFIG.phone.display}
              </a>
              <a
                href={getMailtoHref()}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors"
              >
                <Mail className="w-4 h-4" />
                {CONTACT_CONFIG.email.address}
              </a>
            </div>
            <div className="px-4 pt-2 space-y-2 border-t">
              <Button variant="outline" size="sm" className="w-full" onClick={onNavigateToCRM}>
                CRM Login
              </Button>
              <Button
                size="sm"
                className="w-full"
                onClick={() => {
                  onScrollToQuote();
                  setMobileMenuOpen(false);
                }}
              >
                Get Quote
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
