const fs = require('fs');
const got = require('got');

const isLogExists = fs.existsSync('./netlify.log');

if (isLogExists) {
  console.info(`netlify.log exists. Trying to send a status to GitHub.`);

  const lines = fs
    .readFileSync('./netlify.log')
    .toString()
    .split(/\n|\r\n/)
    .filter(line => /Live Draft URL/.test(line))
    .map(line => line.match(/https:\/\/.*$/)[0]);

  Promise.all(
    lines.map(previewUrl => {
      const repoSlug = process.env.TRAVIS_REPO_SLUG;
      const prSha = process.env.TRAVIS_PULL_REQUEST_SHA;
      console.info(`PreviewURL: ${previewUrl}`);
      console.info(`PR slug: ${repoSlug}`);
      console.info(`PR sha: ${prSha}`);
      if (repoSlug && prSha) {
        return got.post(
          `https://api.github.com/repos/${repoSlug}/statuses/${prSha}`,
          {
            auth: `malcolm-kee:${process.env.GITHUB_TOKEN}`,
            body: JSON.stringify({
              state: 'success',
              target_url: previewUrl,
              description: `Preview is ready`,
              context: `ci/preview`,
            }),
          }
        );
      } else {
        return Promise.resolve();
      }
    })
  )
    .then(result => console.log(`Success create status in GitHub!`))
    .catch(error => {
      console.log(`Error when making request`);
      console.log(error);
    });
} else {
  console.info(`netlify.log does not exists. No status will be created`);
}
