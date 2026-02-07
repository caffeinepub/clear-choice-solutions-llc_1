import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, Sparkles, Shield, Clock } from 'lucide-react';

const services = [
  {
    icon: Building2,
    title: 'Office & Commercial Spaces',
    description: 'Daily, weekly, or monthly cleaning for offices, retail spaces, and commercial buildings.',
    features: ['Floor care', 'Restroom sanitation', 'Window cleaning', 'Trash removal']
  },
  {
    icon: Sparkles,
    title: 'Deep Cleaning Services',
    description: 'Comprehensive deep cleaning for move-ins, move-outs, and seasonal maintenance.',
    features: ['Carpet cleaning', 'Hard floor stripping & waxing', 'High-dusting', 'Pressure washing']
  },
  {
    icon: Shield,
    title: 'Specialized Cleaning',
    description: 'Industry-specific cleaning solutions for medical, industrial, and high-security facilities.',
    features: ['Medical facility cleaning', 'Post-construction cleanup', 'Green cleaning options', 'Disinfection services']
  },
  {
    icon: Clock,
    title: '24/7 Emergency Services',
    description: 'Round-the-clock availability for urgent cleaning needs and emergency situations.',
    features: ['Water damage cleanup', 'Same-day service', 'After-hours cleaning', 'Rapid response team']
  }
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-16 sm:py-20 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-balance">
            Comprehensive Cleaning Solutions
          </h2>
          <p className="text-lg text-muted-foreground text-balance">
            From daily maintenance to specialized deep cleaning, we provide the services property managers need to keep
            their buildings pristine.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <Card key={index} className="border-2 hover:border-primary/50 transition-colors shadow-soft">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <service.icon className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
                <CardDescription className="text-base">{service.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="text-primary mt-0.5">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
