import fs from 'node:fs';
import { stat } from 'node:fs/promises';
import process from 'node:process';
import { config } from 'dotenv';
import { stream } from 'undici';
import { fileName } from '../src/data/cv';

config();

(async function generateCv() {
  const filePath = `dist/${fileName}`;

  const writeStream = fs.createWriteStream(filePath);

  await stream(
    'https://page-to-pdf.fly.dev/screenshot',
    {
      method: 'POST',
      body: JSON.stringify({
        url: 'https://malcolmkee.com/cv',
        key: process.env.API_KEY,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      opaque: writeStream,
    },
    ({ opaque }) => opaque as fs.WriteStream
  );

  const fileStats = await stat(filePath);

  console.info(`File ${filePath} generated with size ${fileStats.size}`);
})();
