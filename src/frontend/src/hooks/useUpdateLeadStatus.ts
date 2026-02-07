import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { UpdateStatusInput } from '@/backend';

export function useUpdateLeadStatus() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: UpdateStatusInput) => {
      if (!actor) throw new Error('Actor not available');
      return actor.updateLeadStatus(input);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
      queryClient.invalidateQueries({ queryKey: ['lead', variables.leadId] });
    },
    retry: false
  });
}
