export type WorkshopMetadata = {
  name: string;
  iconUrl: string;
  smallIconUrl: string;
  themeColor: string;
  description: string;
  entryUrl?: string;
  underConstruction?: boolean;
};

const workshopMetadadata = {
  'becoming-js-data-wrangler': {
    name: 'Becoming a JavaScript Data Wrangler',
    themeColor: 'F2C94C',
    description: 'Learn how to wrangler raw data so you can use them effectively',
    iconUrl:
      'https://res.cloudinary.com/djzsjzasg/image/upload/v1681627277/malcolm-kee/becoming-js-data-wrangler_uhuwnc.png',
    underConstruction: true,
  },
  'react-testing': {
    name: 'Testing React Applications',
    themeColor: 'F2C94C',
    description: 'Learn the principles of maintainable tests and how to write them',
    iconUrl:
      'https://res.cloudinary.com/djzsjzasg/image/upload/v1674311128/malcolm-kee/react-test_g3guac.png',
    underConstruction: true,
  },
  'typescript-for-react-developer': {
    name: 'TypeScript for React Developer',
    themeColor: '294E80',
    description: 'Learn the Typescript fundamentals to make your React codebase more maintainable',
    iconUrl:
      'https://res.cloudinary.com/djzsjzasg/image/upload/v1674311145/malcolm-kee/react-typescript_ielgk1.png',
  },
  'fast-site-with-gatsby-js': {
    name: 'Create a Fast Site with GatsbyJS',
    themeColor: '663399',
    description:
      'Learn how to build blog with GatsbyJS, which automatically optimize your site to make it fast without sacrificing developer usability or accessibility.',
    iconUrl:
      'https://res.cloudinary.com/djzsjzasg/image/upload/v1622711092/malcolm-kee/gatsbyjs_qsfhia.png',
  },
  'js-the-react-parts': {
    name: 'JavaScript: The React Parts',
    themeColor: 'f7df1e',
    description:
      'JavaScript fundamentals and concepts that are commonly used when developing in React.',
    iconUrl:
      'https://res.cloudinary.com/djzsjzasg/image/upload/v1674311160/malcolm-kee/js-the-react-parts_qihbu8.png',
  },
  'web-developer-toolbox': {
    name: 'Web Developer Toolbox',
    themeColor: 'b71c1c',
    iconUrl:
      'https://res.cloudinary.com/djzsjzasg/image/upload/v1674311261/malcolm-kee/toolbox_ptngdy.png',
    description: 'Learn the tools that will make you productive as a Web Developer',
  },
  'intro-to-react-js-v2': {
    name: 'Introduction to React v2',
    themeColor: '61dafb',
    iconUrl:
      'https://res.cloudinary.com/djzsjzasg/image/upload/v1674311270/malcolm-kee/react-logo_zwerwg.png',
    description:
      'An introduction to React (version 2) - up and running with React by learning React core API (including Hooks!) and common how-to e.g. making ajax calls, writing tests, and code splitting.',
  },
  'intro-to-react-js': {
    name: 'Introduction to React',
    themeColor: '61dafb',
    iconUrl:
      'https://res.cloudinary.com/djzsjzasg/image/upload/v1674311270/malcolm-kee/react-logo_zwerwg.png',
    description:
      'A complete introduction to React - up and running with React by learning tooling that improves your development workflow, React core API, and common how-to e.g. making ajax calls, writing tests, and code splitting.',
  },
  'react-component-lib': {
    name: 'Creating Project React Component Library',
    themeColor: 'D2CC4E',
    iconUrl:
      'https://res.cloudinary.com/djzsjzasg/image/upload/v1674311244/malcolm-kee/react-palettes_fkq9yu.png',
    description: 'Learn the common practices of writing React components and React hooks.',
    entryUrl: 'https://react-component-lib.netlify.com/',
  },
  'intro-to-web-dev': {
    name: 'Introduction to Web Development',
    themeColor: 'e54c25',
    iconUrl:
      'https://res.cloudinary.com/djzsjzasg/image/upload/v1674311238/malcolm-kee/html5_joa56a.png',
    description:
      'A full-day workshop that teach you how to create website contents with HTML, style them with CSS, and make them interactive with Javascript. Its primary target students are beginner with zero experience in programming.',
    entryUrl: 'https://intro-to-web-dev.netlify.com/',
  },
} satisfies {
  [field: string]: Omit<WorkshopMetadata, 'smallIconUrl'>;
};

export type WorkshopSlug = keyof typeof workshopMetadadata;

export const workshopSlugs: ReadonlyArray<WorkshopSlug> = [
  'becoming-js-data-wrangler',
  'react-testing',
  'typescript-for-react-developer',
  'fast-site-with-gatsby-js',
  'js-the-react-parts',
  'intro-to-web-dev',
  'react-component-lib',
  'web-developer-toolbox',
  'intro-to-react-js-v2',
  'intro-to-react-js',
];

const workshopMap = new Map<WorkshopSlug, WorkshopMetadata>(
  workshopSlugs.map((slug) => {
    const data = workshopMetadadata[slug];
    return [
      slug,
      {
        ...data,
        smallIconUrl: data.iconUrl.replace(/\/image\/upload\//g, '$&h_16,w_16/'),
      },
    ];
  })
);

export const getWorkshopData = (slug: WorkshopSlug) => workshopMap.get(slug)!;
