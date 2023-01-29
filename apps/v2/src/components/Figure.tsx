/* jsxImportSource: react */
import * as React from 'react';

export interface FigureProps extends React.ComponentPropsWithoutRef<'figure'> {
  caption: string;
  src: string;
  alt?: string;
}

export default function Figure({
  caption,
  src,
  alt = caption,
  ...props
}: FigureProps) {
  return (
    <figure {...props}>
      <img src={src} alt={alt} className="mx-auto" />
      {caption && <figcaption className="text-center">{caption}</figcaption>}
    </figure>
  );
}
