import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { AddNoteInput } from '@/backend';

export function useAddLeadNote() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: AddNoteInput) => {
      if (!actor) throw new Error('Actor not available');
      return actor.addLeadNote(input);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
      queryClient.invalidateQueries({ queryKey: ['lead', variables.leadId] });
    },
    retry: false
  });
}
