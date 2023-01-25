import type { CollectionEntry } from 'astro:content';
import {
  getWorkshopData,
  WorkshopMetadata,
  WorkshopSlug,
  workshopSlugs,
} from './workshop-data';

type WorkshopData = CollectionEntry<'workshop'>;

type ExtractFirstPart<Pattern extends string> =
  Pattern extends `${infer FirstPart}/${string}` ? FirstPart : Pattern;

type WorkshopInferredSlug = ExtractFirstPart<WorkshopData['slug']>;

const getWorkshopSlug = (entry: WorkshopData) =>
  entry.slug.split('/')[0] as WorkshopInferredSlug;

const getRenderedSlug = (entry: WorkshopData) => {
  const workshopSlug = getWorkshopSlug(entry);

  return `${workshopSlug}/${entry.slug.split('/').pop()}`;
};

export type WorkshopRenderData = {
  data: WorkshopData;
  slug: string;
  workshop: Readonly<WorkshopMetadata>;
};

export type WorkshopTocLink = {
  text: string;
  url: string;
};

export type WorkshopTocItem = {
  label?: string;
  items: Array<WorkshopTocLink>;
};

const comparator = new Intl.Collator('de', { numeric: true });

export const groupWorkshopLessons = (
  workshopLessonEntries: ReadonlyArray<WorkshopData>
) => {
  const workshopRenderDataMap = new Map<
    WorkshopSlug,
    Array<WorkshopRenderData>
  >(workshopSlugs.map((slug) => [slug, []]));

  const workshopTocMap = new Map(
    workshopSlugs.map((slug) => [
      slug,
      new Map<string, Array<WorkshopTocLink>>(),
    ])
  );

  workshopLessonEntries
    .slice(0)
    .sort((a, b) => comparator.compare(a.slug, b.slug))
    .forEach((entry) => {
      const workshopSlug = getWorkshopSlug(entry);
      const entrySlug = getRenderedSlug(entry);

      const data: WorkshopRenderData = {
        data: entry,
        slug: entrySlug,
        workshop: getWorkshopData(workshopSlug),
      };

      const lessons = workshopRenderDataMap.get(workshopSlug);

      if (lessons) {
        lessons.push(data);
      } else {
        workshopRenderDataMap.set(workshopSlug, [data]);
      }

      const tocMap = workshopTocMap.get(workshopSlug);

      if (tocMap) {
        const section = entry.data.section || '';

        const items = tocMap.get(section);

        const entryLink = {
          text: entry.data.title,
          url: `/${entrySlug}`,
        };

        if (items) {
          items.push(entryLink);
        } else {
          tocMap.set(section, [entryLink]);
        }
      }
    });

  return new Map(
    Array.from(workshopRenderDataMap.entries())
      .filter(([, lessons]) => lessons.length > 0)
      .map(([workshopSlug, lessons]) => {
        const tocItems: Array<WorkshopTocItem> = [];

        const tocMap = workshopTocMap.get(workshopSlug);

        if (tocMap) {
          tocMap.forEach((items, section) =>
            tocItems.push({
              label: section,
              items,
            })
          );
        }

        return [
          workshopSlug,
          {
            lessons,
            entryUrl: lessons[0]!.slug,
            workshop: lessons[0]!.workshop,
            tocItems,
          },
        ];
      })
  );
};

export const getWorkshops = (
  workshopLessonEntries: ReadonlyArray<WorkshopData>
) => {
  const workshopLessonsMap = new Map<
    WorkshopSlug,
    { slug: string } | undefined
  >(workshopSlugs.map((slug) => [slug, undefined]));

  workshopLessonEntries
    .slice(0)
    .sort((a, b) => comparator.compare(a.slug, b.slug))
    .forEach((entry) => {
      const workshopSlug = getWorkshopSlug(entry);
      const entrySlug = getRenderedSlug(entry);

      const lesson = workshopLessonsMap.get(workshopSlug);
      if (!lesson) {
        workshopLessonsMap.set(workshopSlug, {
          slug: entrySlug,
        });
      }
    });

  return Array.from(workshopLessonsMap.entries()).map(
    ([workshopSlug, lesson]) => {
      const workshop = getWorkshopData(workshopSlug);

      return {
        entryUrl: lesson
          ? `/${lesson.slug}`
          : 'entryUrl' in workshop
          ? (workshop.entryUrl as string)
          : '/',
        workshop,
      };
    }
  );
};
