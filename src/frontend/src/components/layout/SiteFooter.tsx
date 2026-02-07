import { Button } from '@/components/ui/button';
import { SiFacebook, SiX, SiLinkedin, SiInstagram } from 'react-icons/si';
import { Heart, Phone, Mail } from 'lucide-react';
import { CONTACT_CONFIG, getTelHref, getMailtoHref } from '@/config/contact';

interface SiteFooterProps {
  onScrollToQuote: () => void;
}

export default function SiteFooter({ onScrollToQuote }: SiteFooterProps) {
  return (
    <footer className="bg-muted/30 border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <img src="/assets/generated/ccs-logo.dim_512x256.png" alt="Clear Choice Solutions" className="h-8" />
            <p className="text-sm text-muted-foreground">
              Professional commercial cleaning services for property managers across DC, Maryland, and Virginia.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors"
              >
                <SiFacebook className="w-4 h-4 text-primary" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors"
              >
                <SiX className="w-4 h-4 text-primary" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors"
              >
                <SiLinkedin className="w-4 h-4 text-primary" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors"
              >
                <SiInstagram className="w-4 h-4 text-primary" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#services" className="hover:text-foreground transition-colors">
                  Office Cleaning
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-foreground transition-colors">
                  Deep Cleaning
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-foreground transition-colors">
                  Specialized Services
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-foreground transition-colors">
                  Emergency Response
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href={getTelHref()}
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  {CONTACT_CONFIG.phone.display}
                </a>
              </li>
              <li>
                <a
                  href={getMailtoHref()}
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  {CONTACT_CONFIG.email.address}
                </a>
              </li>
            </ul>
            <div className="mt-4 pt-4 border-t">
              <h4 className="font-semibold mb-2 text-sm">Service Areas</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>Washington, DC</li>
                <li>Montgomery County, MD</li>
                <li>Prince George's County, MD</li>
                <li>Northern Virginia</li>
              </ul>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Get Started</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Ready to experience the Clear Choice difference? Request your free quote today.
            </p>
            <Button onClick={onScrollToQuote} className="w-full">
              Request Quote
            </Button>
          </div>
        </div>

        <div className="border-t pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>
            © 2026. Built with <Heart className="inline w-4 h-4 text-destructive fill-destructive" /> using{' '}
            <a href="https://caffeine.ai" target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
              caffeine.ai
            </a>
          </p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
