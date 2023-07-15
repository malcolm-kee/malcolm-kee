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

(async function notifyUpdates(providedDate: Date | string = new Date()) {
  const formatter = new Intl.ListFormat('en-US', { style: 'long', type: 'conjunction' });

  const date = new Date(providedDate);

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
      title: content.title,
      body: content.description,
      url: content.url,
      image: content.image,
      tag: 'new-content',
    });
  } else if (newContents.length) {
    await notifyUpdate({
      title: `${newContents.length} new posts!`,
      body: formatter.format(newContents.map((c) => c.title)),
      url: '/', // to home page for now
      tag: 'new-content',
    });
  }

  if (updatedContents.length === 1) {
    const content = updatedContents[0];
    await notifyUpdate({
      title: content.title,
      body: content.description,
      url: content.url,
      image: content.image,
      tag: 'updated-content',
    });
  } else if (updatedContents.length) {
    await notifyUpdate({
      title: `${updatedContents.length} new posts!`,
      body: formatter.format(updatedContents.map((c) => c.title)),
      url: '/', // to home page for now
      tag: 'updated-content',
    });
  }
})(argv[2]);
