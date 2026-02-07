import { useState, useMemo } from 'react';
import { useGetAllLeads } from '@/hooks/useLeads';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Search, Loader2, Eye, AlertCircle } from 'lucide-react';
import { LeadStatus } from '@/backend';
import { normalizeError } from '@/utils/errorMessages';

interface LeadsListPageProps {
  onSelectLead: (leadId: string) => void;
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

export default function LeadsListPage({ onSelectLead }: LeadsListPageProps) {
  const { data: leads, isLoading, error, refetch } = useGetAllLeads();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredLeads = useMemo(() => {
    if (!leads) return [];

    return leads.filter((lead) => {
      const matchesSearch =
        lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (lead.company && lead.company.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [leads, searchQuery, statusFilter]);

  const formatDate = (timestamp: bigint) => {
    const date = new Date(Number(timestamp) / 1000000);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
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
        <div>
          <h2 className="text-3xl font-bold mb-2">Leads</h2>
          <p className="text-muted-foreground">Manage and track all incoming quote requests and opportunities.</p>
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

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">Leads</h2>
        <p className="text-muted-foreground">Manage and track all incoming quote requests and opportunities.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Leads ({filteredLeads.length})</CardTitle>
          <CardDescription>Search and filter leads by name, company, or status.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, email, or company..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value={LeadStatus.new_}>New</SelectItem>
                <SelectItem value={LeadStatus.contacted}>Contacted</SelectItem>
                <SelectItem value={LeadStatus.qualified}>Qualified</SelectItem>
                <SelectItem value={LeadStatus.proposalSent}>Proposal Sent</SelectItem>
                <SelectItem value={LeadStatus.negotiation}>Negotiation</SelectItem>
                <SelectItem value={LeadStatus.won}>Won</SelectItem>
                <SelectItem value={LeadStatus.lost}>Lost</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {filteredLeads.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              {searchQuery || statusFilter !== 'all' ? 'No leads match your filters.' : 'No leads yet.'}
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLeads.map((lead) => (
                    <TableRow key={lead.id} className="cursor-pointer hover:bg-muted/50">
                      <TableCell className="font-medium">{formatDate(lead.createdTime)}</TableCell>
                      <TableCell>{lead.name}</TableCell>
                      <TableCell className="text-muted-foreground">{lead.email}</TableCell>
                      <TableCell className="text-muted-foreground">{lead.company || '—'}</TableCell>
                      <TableCell>
                        <Badge variant={statusVariants[lead.status]}>{statusLabels[lead.status]}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" onClick={() => onSelectLead(lead.id)}>
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
