import { MapPin, Phone, Mail } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { CONTACT_CONFIG, getTelHref, getMailtoHref } from '@/config/contact';

const serviceAreas = [
  {
    region: 'Washington, DC',
    coverage: 'All quadrants and neighborhoods',
    highlights: ['Downtown DC', 'Capitol Hill', 'Georgetown', 'Dupont Circle']
  },
  {
    region: 'Maryland',
    coverage: 'Montgomery & Prince George\'s Counties',
    highlights: ['Bethesda', 'Silver Spring', 'Rockville', 'College Park']
  },
  {
    region: 'Virginia',
    coverage: 'Northern Virginia region',
    highlights: ['Arlington', 'Alexandria', 'Fairfax', 'Tysons Corner']
  }
];

export default function ServiceAreasSection() {
  return (
    <section id="service-areas" className="py-16 sm:py-20 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-balance">
            Serving the Greater DC Metro Area
          </h2>
          <p className="text-lg text-muted-foreground text-balance">
            We proudly serve property managers and commercial facilities throughout Washington DC, Maryland, and
            Virginia with fast, reliable service.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {serviceAreas.map((area, index) => (
            <Card key={index} className="border-2 shadow-soft">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">{area.region}</h3>
                    <p className="text-sm text-muted-foreground">{area.coverage}</p>
                  </div>
                </div>
                <ul className="space-y-2 ml-13">
                  {area.highlights.map((location, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      <span>{location}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="bg-primary/5 rounded-2xl p-8 lg:p-12 border-2 border-primary/10">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Phone className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Call Us</h3>
              <a
                href={getTelHref()}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {CONTACT_CONFIG.phone.display}
              </a>
            </div>
            <div>
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Email Us</h3>
              <a
                href={getMailtoHref()}
                className="text-muted-foreground hover:text-foreground transition-colors break-all"
              >
                {CONTACT_CONFIG.email.address}
              </a>
            </div>
            <div>
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Visit Us</h3>
              <p className="text-muted-foreground">Washington, DC Metro Area</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
