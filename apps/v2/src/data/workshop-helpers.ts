import type { CollectionEntry } from 'astro:content';

type WorkshopData = CollectionEntry<'workshop'>;

type ExtractFirstPart<Pattern extends string> =
  Pattern extends `${infer FirstPart}/${string}` ? FirstPart : Pattern;

type WorkshopSlug = ExtractFirstPart<WorkshopData['slug']>;

const workshopSlugs: Array<WorkshopSlug> = [
  'intro-to-react-js-v2',
  'intro-to-react-js',
];

export type WorkshopMetadata = {
  name: string;
  iconUrl: string;
  themeColor: string;
  description: string;
};

const workshopMetadadata = {
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
} as const satisfies {
  [slug in WorkshopSlug]: WorkshopMetadata;
};

const getWorkshopSlug = (entry: WorkshopData) =>
  entry.slug.split('/')[0] as WorkshopSlug;

const getRenderedSlug = (entry: WorkshopData) => {
  const workshopSlug = getWorkshopSlug(entry);

  return `${workshopSlug}/${entry.slug.split('/').pop()}`;
};

export type WorkshopRenderData = {
  data: WorkshopData;
  slug: string;
  workshop: Readonly<WorkshopMetadata>;
};

const comparator = new Intl.Collator('de', { numeric: true });

export const groupWorkshopLessons = (
  workshopLessonEntries: ReadonlyArray<WorkshopData>
) => {
  const workshopMap = new Map(
    workshopSlugs.map((slug) => [slug, [] as Array<WorkshopRenderData>])
  );

  workshopLessonEntries
    .slice(0)
    .sort((a, b) => comparator.compare(a.slug, b.slug))
    .forEach((entry) => {
      const workshopSlug = getWorkshopSlug(entry);

      const data: WorkshopRenderData = {
        data: entry,
        slug: getRenderedSlug(entry),
        workshop: workshopMetadadata[workshopSlug],
      };

      const lessons = workshopMap.get(workshopSlug);

      if (lessons) {
        lessons.push(data);
      } else {
        workshopMap.set(workshopSlug, [data]);
      }
    });

  return new Map(
    Array.from(workshopMap.entries()).map(([workshopSlug, lessons]) => {
      return [
        workshopSlug,
        {
          lessons,
          entryUrl: lessons[0]!.slug,
          workshop: lessons[0]!.workshop,
        },
      ];
    })
  );
};
