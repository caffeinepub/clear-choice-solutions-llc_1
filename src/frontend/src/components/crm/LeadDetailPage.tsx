import { useState } from 'react';
import { useGetLead } from '@/hooks/useLead';
import { useUpdateLeadStatus } from '@/hooks/useUpdateLeadStatus';
import { useAddLeadNote } from '@/hooks/useAddLeadNote';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ArrowLeft, Loader2, Mail, Building2, Calendar, Clock, MessageSquare, AlertCircle } from 'lucide-react';
import { LeadStatus } from '@/backend';
import { toast } from 'sonner';
import { normalizeError } from '@/utils/errorMessages';

interface LeadDetailPageProps {
  leadId: string;
  onBack: () => void;
}

const statusLabels: Record<LeadStatus, string> = {
  [LeadStatus.new_]: 'New',
  [LeadStatus.contacted]: 'Contacted',
  [LeadStatus.qualified]: 'Qualified',
  [LeadStatus.proposalSent]: 'Proposal Sent',
  [LeadStatus.negotiation]: 'Negotiation',
  [LeadStatus.won]: 'Won',
  [LeadStatus.lost]: 'Lost'
};

const statusVariants: Record<LeadStatus, 'default' | 'secondary' | 'outline' | 'destructive'> = {
  [LeadStatus.new_]: 'default',
  [LeadStatus.contacted]: 'secondary',
  [LeadStatus.qualified]: 'secondary',
  [LeadStatus.proposalSent]: 'outline',
  [LeadStatus.negotiation]: 'outline',
  [LeadStatus.won]: 'default',
  [LeadStatus.lost]: 'destructive'
};

export default function LeadDetailPage({ leadId, onBack }: LeadDetailPageProps) {
  const { data: lead, isLoading, error, refetch } = useGetLead(leadId);
  const updateStatus = useUpdateLeadStatus();
  const addNote = useAddLeadNote();
  const [newNote, setNewNote] = useState('');

  const formatDate = (timestamp: bigint) => {
    const date = new Date(Number(timestamp) / 1000000);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  const handleStatusChange = async (newStatus: string) => {
    try {
      await updateStatus.mutateAsync({
        leadId,
        newStatus: newStatus as LeadStatus
      });
      toast.success('Lead status updated successfully');
    } catch (error) {
      toast.error(normalizeError(error));
    }
  };

  const handleAddNote = async () => {
    if (!newNote.trim()) return;

    try {
      await addNote.mutateAsync({
        leadId,
        note: newNote
      });
      setNewNote('');
      toast.success('Note added successfully');
    } catch (error) {
      toast.error(normalizeError(error));
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Leads
          </Button>
        </div>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="flex items-center justify-between">
            <span>{normalizeError(error)}</span>
            <Button variant="outline" size="sm" onClick={() => refetch()}>
              Try Again
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!lead) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Leads
          </Button>
        </div>
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">Lead not found</p>
          <Button onClick={onBack}>Back to Leads</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Leads
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-2xl">{lead.name}</CardTitle>
                  <CardDescription>Lead ID: {lead.id}</CardDescription>
                </div>
                <Badge variant={statusVariants[lead.status]} className="text-sm">
                  {statusLabels[lead.status]}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">{lead.email}</p>
                  </div>
                </div>
                {lead.company && (
                  <div className="flex items-start gap-3">
                    <Building2 className="w-5 h-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Company</p>
                      <p className="text-sm text-muted-foreground">{lead.company}</p>
                    </div>
                  </div>
                )}
              </div>

              <Separator />

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Created</p>
                    <p className="text-sm text-muted-foreground">{formatDate(lead.createdTime)}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Last Updated</p>
                    <p className="text-sm text-muted-foreground">{formatDate(lead.lastUpdated)}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Notes
              </CardTitle>
              <CardDescription>Internal notes and communication history</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Textarea
                  placeholder="Add a note about this lead..."
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  rows={3}
                />
                <Button onClick={handleAddNote} disabled={!newNote.trim() || addNote.isPending}>
                  {addNote.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Adding...
                    </>
                  ) : (
                    'Add Note'
                  )}
                </Button>
              </div>

              {lead.notes.length > 0 ? (
                <div className="space-y-3 pt-4">
                  {lead.notes.map((note, index) => (
                    <div key={index} className="p-4 bg-muted/50 rounded-lg border">
                      <p className="text-sm">{note}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground text-center py-8">No notes yet</p>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Update Status</CardTitle>
              <CardDescription>Change the lead's current status</CardDescription>
            </CardHeader>
            <CardContent>
              <Select value={lead.status} onValueChange={handleStatusChange} disabled={updateStatus.isPending}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={LeadStatus.new_}>New</SelectItem>
                  <SelectItem value={LeadStatus.contacted}>Contacted</SelectItem>
                  <SelectItem value={LeadStatus.qualified}>Qualified</SelectItem>
                  <SelectItem value={LeadStatus.proposalSent}>Proposal Sent</SelectItem>
                  <SelectItem value={LeadStatus.negotiation}>Negotiation</SelectItem>
                  <SelectItem value={LeadStatus.won}>Won</SelectItem>
                  <SelectItem value={LeadStatus.lost}>Lost</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start" asChild>
                <a href={`mailto:${lead.email}`}>
                  <Mail className="mr-2 h-4 w-4" />
                  Send Email
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
