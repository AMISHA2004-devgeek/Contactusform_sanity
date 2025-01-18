import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: '',  
  dataset: 'production',       
  useCdn: false ,
  token: ''
});
