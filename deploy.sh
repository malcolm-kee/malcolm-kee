#!/bin/bash
set -e

echo $TRAVIS_PULL_REQUEST;

if [ "${TRAVIS_PULL_REQUEST}" = "false" ]; then 
    yarn deploy;
else
    yarn deploy:preview --message "Deploy for commit $TRAVIS_PULL_REQUEST_SHA" > netlify.log;
fi