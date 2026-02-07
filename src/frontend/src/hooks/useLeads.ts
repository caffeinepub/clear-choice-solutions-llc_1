import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import { useInternetIdentity } from './useInternetIdentity';
import { Lead } from '@/backend';

export function useGetAllLeads() {
  const { actor, isFetching } = useActor();
  const { identity } = useInternetIdentity();

  const isAuthenticated = !!identity;

  return useQuery<Lead[]>({
    queryKey: ['leads'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getAllLeads();
    },
    enabled: isAuthenticated && !!actor && !isFetching,
    retry: 1,
    retryDelay: 1000
  });
}
