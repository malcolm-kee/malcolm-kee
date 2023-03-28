import * as React from 'react';
import type { ProjectDef } from '../data/projects';
import { LinkIcon } from './icons';

export interface ProjectCardProps extends React.ComponentPropsWithoutRef<'div'> {
  project: ProjectDef;
}

export default function ProjectCard({ project, ...props }: ProjectCardProps) {
  const firstLink = project.links[0];

  return (
    <div {...props}>
      <h2>
        {firstLink ? (
          <a href={firstLink.href} className="transition-colors hover:text-primary-500">
            {project.name}
          </a>
        ) : (
          project.name
        )}
      </h2>
      <p className="mt-2 text-sm text-zinc-600">{project.description}</p>
      <ul className="flex gap-3 mt-6">
        {project.links.map((link) => (
          <li key={link.href}>
            <a
              className="flex items-center text-sm text-zinc-400 transition hover:text-primary-500"
              href={link.href}
            >
              <LinkIcon className="h-6 w-6 flex-none" />
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
