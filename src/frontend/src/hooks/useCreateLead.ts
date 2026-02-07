import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { CreateLeadInput } from '@/backend';

export function useCreateLead() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: CreateLeadInput) => {
      if (!actor) throw new Error('Actor not available');
      return actor.createLead(input);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
    }
  });
}
