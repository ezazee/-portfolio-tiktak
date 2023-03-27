import sanityClient from '@sanity/client';

export const client = sanityClient({
  projectId: 'ykikn62v',
  dataset: 'production',
  apiVersion: '2023-03-24',
  useCdn: false,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});