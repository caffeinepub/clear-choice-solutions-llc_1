import { Card, CardContent } from '@/components/ui/card';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Mitchell',
    role: 'Property Manager, Capitol Properties',
    location: 'Washington, DC',
    content:
      'Clear Choice Solutions has been our go-to cleaning partner for three years. Their consistency and attention to detail make my job so much easier. Highly recommended for any property manager.',
    rating: 5
  },
  {
    name: 'James Rodriguez',
    role: 'Facilities Director, Metro Commercial Group',
    location: 'Bethesda, MD',
    content:
      'We manage 12 commercial buildings and Clear Choice handles them all flawlessly. Their 24/7 availability and rapid response to emergencies have saved us multiple times.',
    rating: 5
  },
  {
    name: 'Emily Chen',
    role: 'Senior Property Manager, Arlington Realty',
    location: 'Arlington, VA',
    content:
      'Professional, reliable, and always responsive. Clear Choice Solutions understands the unique needs of property management and delivers exceptional service every time.',
    rating: 5
  }
];

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-16 sm:py-20 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-balance">
            Trusted by Property Managers
          </h2>
          <p className="text-lg text-muted-foreground text-balance">
            See what property management professionals across the DC metro area say about our services.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-2 shadow-soft relative">
              <CardContent className="pt-6">
                <Quote className="w-10 h-10 text-primary/20 mb-4" />
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed">{testimonial.content}</p>
                <div className="border-t pt-4">
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  <p className="text-sm text-primary">{testimonial.location}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
