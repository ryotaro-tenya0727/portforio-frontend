import { QueryClient } from 'react-query';

export function generateQueryClient() {
  return new QueryClient();
}

export const queryClient = generateQueryClient({
  defaultOptions: {},
});
