#!/bin/bash
set -e

echo $TRAVIS_PULL_REQUEST;

HOME_HTML=./public/index.html

if [[ -f "$HOME_HTML" ]]; then
    echo "Verified build success";
else
    echo "Build fail, terminating...";
    exit 1;
fi

echo "Deploying..."

if [ "${TRAVIS_PULL_REQUEST}" = "false" ]; then 
    yarn deploy --message "Production deploy from travis";
else
    yarn deploy:preview --message "Deploy for commit $TRAVIS_PULL_REQUEST_SHA" > netlify.log;
fi