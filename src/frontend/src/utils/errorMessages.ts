/**
 * Utility to normalize backend errors into user-friendly English messages
 */
export function normalizeError(error: unknown): string {
  if (!error) return 'An unexpected error occurred';

  const errorString = String(error);
  const errorMessage = error instanceof Error ? error.message : errorString;

  // Check for common backend trap messages
  if (errorMessage.includes('Unauthorized')) {
    return 'You do not have permission to perform this action. Please log in.';
  }

  if (errorMessage.includes('not found') || errorMessage.includes('Not found')) {
    return 'The requested item was not found.';
  }

  if (errorMessage.includes('Actor not available')) {
    return 'Unable to connect to the service. Please try again.';
  }

  // Network/connection errors
  if (errorMessage.includes('network') || errorMessage.includes('fetch')) {
    return 'Network error. Please check your connection and try again.';
  }

  // Generic fallback
  return 'An error occurred. Please try again.';
}
