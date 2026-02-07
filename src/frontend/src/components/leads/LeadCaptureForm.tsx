import { useState } from 'react';
import { useCreateLead } from '@/hooks/useCreateLead';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import { normalizeError } from '@/utils/errorMessages';

export default function LeadCaptureForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    region: '',
    propertyType: '',
    services: '',
    message: ''
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const createLead = useCreateLead();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccess(false);
    setErrorMessage(null);

    try {
      await createLead.mutateAsync({
        name: formData.name,
        email: formData.email,
        company: formData.company || undefined
      });

      setShowSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        region: '',
        propertyType: '',
        services: '',
        message: ''
      });

      setTimeout(() => setShowSuccess(false), 5000);
    } catch (error) {
      console.error('Failed to submit lead:', error);
      setErrorMessage(normalizeError(error));
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const isFormValid =
    formData.name.trim() &&
    formData.email.trim() &&
    formData.region &&
    formData.propertyType &&
    formData.services;

  return (
    <Card className="border-2 shadow-soft">
      <CardHeader>
        <CardTitle>Request a Quote</CardTitle>
        <CardDescription>Fill out the form below and we'll get back to you within 24 hours.</CardDescription>
      </CardHeader>
      <CardContent>
        {showSuccess && (
          <Alert className="mb-6 border-primary/50 bg-primary/5">
            <CheckCircle2 className="h-4 w-4 text-primary" />
            <AlertDescription className="text-primary">
              Thank you! Your quote request has been submitted successfully. We'll contact you within 24 hours.
            </AlertDescription>
          </Alert>
        )}

        {errorMessage && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">
                Full Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="John Smith"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">
                Email Address <span className="text-destructive">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder="john@example.com"
                required
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                placeholder="(202) 555-0123"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">Company / Property Name</Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => handleChange('company', e.target.value)}
                placeholder="ABC Property Management"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="region">
                Service Location <span className="text-destructive">*</span>
              </Label>
              <Select value={formData.region} onValueChange={(value) => handleChange('region', value)} required>
                <SelectTrigger id="region">
                  <SelectValue placeholder="Select region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dc">Washington, DC</SelectItem>
                  <SelectItem value="md">Maryland</SelectItem>
                  <SelectItem value="va">Virginia</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="propertyType">
                Property Type <span className="text-destructive">*</span>
              </Label>
              <Select
                value={formData.propertyType}
                onValueChange={(value) => handleChange('propertyType', value)}
                required
              >
                <SelectTrigger id="propertyType">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="office">Office Building</SelectItem>
                  <SelectItem value="retail">Retail Space</SelectItem>
                  <SelectItem value="medical">Medical Facility</SelectItem>
                  <SelectItem value="industrial">Industrial</SelectItem>
                  <SelectItem value="mixed">Mixed-Use</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="services">
              Services Needed <span className="text-destructive">*</span>
            </Label>
            <Select value={formData.services} onValueChange={(value) => handleChange('services', value)} required>
              <SelectTrigger id="services">
                <SelectValue placeholder="Select services" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily Cleaning</SelectItem>
                <SelectItem value="weekly">Weekly Cleaning</SelectItem>
                <SelectItem value="deep">Deep Cleaning</SelectItem>
                <SelectItem value="specialized">Specialized Cleaning</SelectItem>
                <SelectItem value="emergency">Emergency Services</SelectItem>
                <SelectItem value="multiple">Multiple Services</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Additional Details</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => handleChange('message', e.target.value)}
              placeholder="Tell us about your cleaning needs, square footage, frequency, special requirements, etc."
              rows={4}
            />
          </div>

          <Button type="submit" size="lg" className="w-full" disabled={!isFormValid || createLead.isPending}>
            {createLead.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              'Submit Quote Request'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
