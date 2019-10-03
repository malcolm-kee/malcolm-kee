const fs = require('fs');
const got = require('got');

console.log(`Starting build.js`);

const isLogExists = fs.existsSync('./netlify.log');

if (isLogExists) {
  console.log(`netlify.log exists. Trying to send a status to GitHub.`);
  const rawLines = fs
    .readFileSync('./netlify.log')
    .toString()
    .split(/\n|\r\n/);

  console.log(rawLines);

  const lines = rawLines
    .filter(line => /Live Draft URL/.test(line))
    .map(line => line.match(/https:\/\/.*$/)[0]);

  Promise.all(
    lines.map(previewUrl => {
      console.log(`PreviewURL: ${previewUrl}`);
      const repoSlug = process.env.TRAVIS_REPO_SLUG;
      const prSha = prSha;
      console.log(`PR slug: ${repoSlug}`);
      console.log(`PR sha: ${prSha}`);
      if (repoSlug && prSha) {
        return got.post(
          `https://api.github.com/repos/${repoSlug}/statuses/${prSha}`,
          {
            auth: `malcolm-kee:${process.env.GITHUB_TOKEN}`,
            body: {
              state: 'success',
              target_url: previewUrl,
              description: `Preview is ready`,
              context: `ci/preview`,
            },
          }
        );
      } else {
        return Promise.resolve();
      }
    })
  )
    .then(result => console.log(result))
    .catch(error => {
      console.log(`Error when making request`);
      console.log(error);
    });
} else {
  console.log(`netlify.log does not exists.`);
}
