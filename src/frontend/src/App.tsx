import { useEffect, useState } from 'react';
import { useInternetIdentity } from './hooks/useInternetIdentity';
import { useGetCallerUserProfile } from './hooks/useCallerUserProfile';
import MarketingPage from './components/marketing/MarketingPage';
import CRMLayout from './components/crm/CRMLayout';
import LeadsListPage from './components/crm/LeadsListPage';
import LeadDetailPage from './components/crm/LeadDetailPage';
import ProfileSetupDialog from './components/auth/ProfileSetupDialog';
import { Toaster } from '@/components/ui/sonner';

type View = 'marketing' | 'crm-list' | 'crm-detail';

function App() {
  const [currentView, setCurrentView] = useState<View>('marketing');
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);
  const { identity } = useInternetIdentity();
  const { data: userProfile, isLoading: profileLoading, isFetched } = useGetCallerUserProfile();

  const isAuthenticated = !!identity;
  // Only show profile setup if authenticated, profile query has completed, and no profile exists
  const showProfileSetup = isAuthenticated && !profileLoading && isFetched && userProfile === null;

  // Handle hash-based navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#/crm/lead/')) {
        const leadId = hash.replace('#/crm/lead/', '').split('?')[0];
        setSelectedLeadId(leadId);
        setCurrentView('crm-detail');
      } else if (hash === '#/crm' || hash.startsWith('#/crm?')) {
        setCurrentView('crm-list');
      } else {
        setCurrentView('marketing');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (view: View, leadId?: string) => {
    if (view === 'marketing') {
      window.location.hash = '';
      setCurrentView('marketing');
    } else if (view === 'crm-list') {
      window.location.hash = '#/crm';
      setCurrentView('crm-list');
    } else if (view === 'crm-detail' && leadId) {
      window.location.hash = `#/crm/lead/${leadId}`;
      setSelectedLeadId(leadId);
      setCurrentView('crm-detail');
    }
  };

  const scrollToQuoteForm = () => {
    const element = document.getElementById('quote-form');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      {currentView === 'marketing' && (
        <MarketingPage onNavigateToCRM={() => navigateTo('crm-list')} onScrollToQuote={scrollToQuoteForm} />
      )}

      {currentView === 'crm-list' && (
        <CRMLayout onNavigateToMarketing={() => navigateTo('marketing')}>
          <LeadsListPage onSelectLead={(leadId) => navigateTo('crm-detail', leadId)} />
        </CRMLayout>
      )}

      {currentView === 'crm-detail' && selectedLeadId && (
        <CRMLayout onNavigateToMarketing={() => navigateTo('marketing')}>
          <LeadDetailPage leadId={selectedLeadId} onBack={() => navigateTo('crm-list')} />
        </CRMLayout>
      )}

      {showProfileSetup && <ProfileSetupDialog />}
      <Toaster />
    </>
  );
}

export default App;
