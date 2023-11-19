import type { APIRoute } from 'astro';
import { getContents } from '~/data/get-contents';

export const GET: APIRoute = async () => {
  return new Response(JSON.stringify(await getContents()));
};
