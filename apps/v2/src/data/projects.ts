export interface ProjectDef {
  name: string;
  description: string;
  links: ReadonlyArray<{
    href: string;
    label: string;
  }>;
}

export const projects = [
  {
    name: 'React Showroom',
    description:
      'Auto-generates documentations for React components with props definition and markdown. An alternative of React styleguidist.',
    links: [
      {
        href: 'https://react-showroom.js.org/',
        label: 'js.org',
      },
      {
        href: 'https://github.com/malcolm-kee/react-showroom',
        label: 'github.com',
      },
    ],
  },
  {
    name: 'React DND Builder (closed source)',
    description:
      'A library to create your own drag-and-drop UI builder with your own React components. Similar to builder.io but as a library.',
    links: [
      {
        href: 'https://react-dnd-playground.netlify.app/',
        label: 'netlify.app',
      },
    ],
  },
  {
    name: 'react-json-friendly-viewer',
    description: 'A react component to beautifully display your JSON data for everyone.',
    links: [
      {
        href: 'https://github.com/malcolm-kee/react-json-friendly-viewer/blob/main/packages/react-json-friendly-viewer/README.md',
        label: 'github.com',
      },
    ],
  },
  {
    name: 'naive-tapable',
    description: `A simplified reimplementation of webpack's tapable package so it is easier to understand how the package works`,
    links: [
      {
        href: 'https://github.com/malcolm-kee/naive-tapable',
        label: 'github.com',
      },
    ],
  },
  {
    name: 'Bid It',
    description: 'A bidding system with microservice architecture',
    links: [
      {
        href: 'https://github.com/malcolm-kee/bid-it',
        label: 'github.com',
      },
    ],
  },
  {
    name: 'Shopit',
    description: 'An ecommerce site with multiple implementations',
    links: [
      {
        href: 'https://github.com/malcolm-kee/react-ecomm-site',
        label: 'github.com',
      },
      {
        href: 'https://react-ecomm.netlify.app/',
        label: 'netlify.app',
      },
    ],
  },
] as const satisfies ReadonlyArray<ProjectDef>;
