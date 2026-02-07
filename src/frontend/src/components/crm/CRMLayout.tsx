import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import LoginButton from '../auth/LoginButton';
import { useInternetIdentity } from '@/hooks/useInternetIdentity';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

interface CRMLayoutProps {
  children: React.ReactNode;
  onNavigateToMarketing: () => void;
}

export default function CRMLayout({ children, onNavigateToMarketing }: CRMLayoutProps) {
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity;

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={onNavigateToMarketing}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Site
              </Button>
              <div className="h-6 w-px bg-border" />
              <h1 className="text-lg font-semibold">CRM Dashboard</h1>
            </div>
            <LoginButton />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!isAuthenticated ? (
          <div className="max-w-2xl mx-auto mt-12">
            <Alert className="border-primary/50 bg-primary/5">
              <AlertCircle className="h-4 w-4 text-primary" />
              <AlertDescription className="text-primary">
                Please log in to access the CRM dashboard and view leads.
              </AlertDescription>
            </Alert>
          </div>
        ) : (
          children
        )}
      </main>
    </div>
  );
}
