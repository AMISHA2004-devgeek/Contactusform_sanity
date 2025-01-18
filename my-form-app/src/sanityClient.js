import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: 'ie1x9ghm',  // Find this in your Sanity project settings
  dataset: 'production',        // Use the dataset name you're working with
  useCdn: false ,
  token: 'skouRkKCNa66FNpGwmExnz9KvoTn8uvvviL1my4EfpnBwgh5P0G334JHvxzQidRzvS7j7YxmrZNB4wYE7fuAt0Y9BcdCeKp1xnCP1Q1dcwGX6GKiRToFJ8YhcCql7CWHbmIvcGKL0QdOxtkoNhLLRiM339rXcCIy4BrUiatEWHARrMnCMpY3',                // Use the CDN for faster responses
});
