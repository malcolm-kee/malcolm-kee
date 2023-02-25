import { z } from 'astro:content';

export const TOPICS = [
  'module-federation',
  'react',
  'css',
  'typescript',
  'javascript',
] as const;

export const topic = z.enum(TOPICS);

export type Topic = z.infer<typeof topic>;
