import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import { useInternetIdentity } from './useInternetIdentity';
import { UserProfile } from '@/backend';

export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();
  const { identity } = useInternetIdentity();

  const isAuthenticated = !!identity;

  const query = useQuery<UserProfile | null>({
    queryKey: ['currentUserProfile'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCallerUserProfile();
    },
    // Only enable when authenticated AND actor is ready
    enabled: isAuthenticated && !!actor && !actorFetching,
    retry: false
  });

  return {
    ...query,
    isLoading: (isAuthenticated && actorFetching) || query.isLoading,
    isFetched: isAuthenticated && !!actor && query.isFetched
  };
}
