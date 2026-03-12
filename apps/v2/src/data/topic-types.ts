import { z } from 'astro/zod';

export const TOPICS = [
  'module-federation',
  'react',
  'css',
  'typescript',
  'javascript',
  'frontend-tooling',
  'life',
  'software-engineering',
] as const;

export const topic = z.enum(TOPICS);

export type Topic = (typeof TOPICS)[number];

export const TopicLabel: Record<Topic, string> = {
  'module-federation': 'Module Federation',
  react: 'React',
  css: 'CSS',
  typescript: 'TypeScript',
  javascript: 'JavaScript',
  'frontend-tooling': 'Frontend Tooling',
  life: 'Life',
  'software-engineering': 'Software Engineering',
};
