import { argv } from 'node:process';
import { config } from 'dotenv';
import { fetch } from 'undici';

config();

async function notifyUpdate(data: {
  title: string;
  url: string;
  tag: string;
  body?: string;
  image?: string;
}) {
  await fetch(`${process.env.PUBLIC_API_BASE_URL}/notify`, {
    method: 'POST',
    body: JSON.stringify({
      ...data,
      key: process.env.API_KEY,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

function findFirstImage(items: Array<{ image?: string }>) {
  for (const item of items) {
    if (item.image) {
      return item.image;
    }
  }
}

(async function notifyUpdates(providedDate: Date | string = new Date()) {
  const formatter = new Intl.ListFormat('en-US', { style: 'long', type: 'conjunction' });

  const date = new Date(providedDate);

  // @ts-ignore
  const allContents = (await import('../dist/content.json')).default;

  type Content = (typeof allContents)[number];

  const newContents: Content[] = [];
  const updatedContents: Content[] = [];

  for (const content of allContents) {
    if (new Date(content.pubDate) > date) {
      newContents.push(content);
    } else if (content.updatedDate && new Date(content.updatedDate) > date) {
      updatedContents.push(content);
    }
  }

  if (newContents.length === 1) {
    const content = newContents[0];
    await notifyUpdate({
      tag: 'new-content',
      title: content.title,
      body: content.description,
      url: content.url,
      image: content.image,
    });
  } else if (newContents.length) {
    await notifyUpdate({
      tag: 'new-content',
      title: `${newContents.length} new posts!`,
      body: formatter.format(newContents.map((c) => c.title)),
      url: `/updates/?after=${encodeURIComponent(date.toISOString())}`,
      image: findFirstImage(newContents),
    });
  }

  if (updatedContents.length === 1) {
    const content = updatedContents[0];
    await notifyUpdate({
      tag: 'updated-content',
      title: content.title,
      body: content.description,
      url: content.url,
      image: content.image,
    });
  } else if (updatedContents.length) {
    await notifyUpdate({
      tag: 'updated-content',
      title: `${updatedContents.length} new posts!`,
      body: formatter.format(updatedContents.map((c) => c.title)),
      url: `/updates/?after=${encodeURIComponent(date.toISOString())}`,
      image: findFirstImage(updatedContents),
    });
  }
})(argv[2]);
