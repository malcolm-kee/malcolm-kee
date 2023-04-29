import { clsx } from 'clsx';
import * as React from 'react';
import type { ProjectDef } from '../data/projects';
import { LinkIcon } from './icons';

export interface ProjectCardProps extends React.ComponentPropsWithoutRef<'div'> {
  project: ProjectDef;
}

export default function ProjectCard({ project, ...props }: ProjectCardProps) {
  const firstLink = project.links[0];

  return (
    <div {...props} className={clsx('flex flex-col justify-between gap-6', props.className)}>
      <div>
        <h2 className="font-techie text-lg font-medium">
          {firstLink ? (
            <a href={firstLink.href} className="transition-colors hover:text-primary-500">
              {project.name}
            </a>
          ) : (
            project.name
          )}
        </h2>
        <p className="mt-2 text-sm text-zinc-600">{project.description}</p>
      </div>
      <ul className="flex gap-3">
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
