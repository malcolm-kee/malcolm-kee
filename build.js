const fs = require('fs');
const got = require('got');

console.log(`Starting build.js`);

const isLogExists = fs.existsSync('./netlify.log')

if (isLogExists) {
    console.log(`netlify.log exists. Trying to send a status to GitHub.`);
    const rawLines = fs.readFileSync('./netlify.log').toString().split(/\n|\r\n/);

    console.log(rawLines);

    const lines = rawLines
        .filter(line => /Live Draft URL/.test(line))
        .map(line => line.match(/https:\/\/.*$/)[0]);

    lines.forEach(previewUrl => {
        console.log(`PreviewURL: ${previewUrl}`);
        console.log(`PR slug: ${process.env.TRAVIS_REPO_SLUG}`);
        console.log(`PR sha: ${process.env.TRAVIS_PULL_REQUEST_SHA}`);
    })
} else {
    console.log(`netlify.log does not exists.`)
}