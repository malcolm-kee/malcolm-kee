const fs = require('fs');
const got = require('got');
const lines = fs.readFileSync('./netlify.log').toString().split(/\n|\r\n/)
    .filter(line => line.startsWith('Live Draft URL'))
    .map(line => line.match(/https:\/\/.*$/)[0]);

lines.forEach(previewUrl => {
    console.log(`PreviewURL: ${previewUrl}`);
    console.log(`PR slug: ${process.env.TRAVIS_REPO_SLUG}`);
    console.log(`PR sha: ${process.env.TRAVIS_PULL_REQUEST_SHA}`);
})