import { z } from 'astro:content';

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

export type Topic = z.infer<typeof topic>;

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
