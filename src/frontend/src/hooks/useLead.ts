import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import { useInternetIdentity } from './useInternetIdentity';
import { Lead } from '@/backend';

export function useGetLead(leadId: string) {
  const { actor, isFetching } = useActor();
  const { identity } = useInternetIdentity();

  const isAuthenticated = !!identity;

  return useQuery<Lead>({
    queryKey: ['lead', leadId],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getLead(leadId);
    },
    enabled: isAuthenticated && !!actor && !isFetching && !!leadId,
    retry: 1,
    retryDelay: 1000
  });
}
