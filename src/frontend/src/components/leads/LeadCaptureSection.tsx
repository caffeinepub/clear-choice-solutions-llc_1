import LeadCaptureForm from './LeadCaptureForm';

export default function LeadCaptureSection() {
  return (
    <section id="quote-form" className="py-16 sm:py-20 lg:py-24 scroll-mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-balance">
              Get Your Free Quote Today
            </h2>
            <p className="text-lg text-muted-foreground text-balance">
              Tell us about your property and cleaning needs. We'll respond within 24 hours with a customized quote.
            </p>
          </div>
          <LeadCaptureForm />
        </div>
      </div>
    </section>
  );
}
