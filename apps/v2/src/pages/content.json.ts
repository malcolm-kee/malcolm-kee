import type { APIRoute } from 'astro';
import { getContents } from '~/data/get-contents';

export const get: APIRoute = async () => {
  return {
    body: JSON.stringify(await getContents()),
  };
};
