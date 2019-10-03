#!/bin/bash
set -e

NETLIFY_LOG=netlify.log

echo "Travis repo slug:$TRAVIS_REPO_SLUG";
echo "Travis PR sha:$TRAVIS_PULL_REQUEST_SHA";

if [[ -z "$TRAVIS_REPO_SLUG" ]] || [[ -z "$TRAVIS_PULL_REQUEST_SHA" ]]; then
    echo "Missing repo slug or PR sha, will not notify status";
else
    if [ -f "$NETLIFY_LOG" ]; then
        echo "Netlify Log file found.";
        previewurl=$(grep -oP '(?<=Live Draft URL: ).*' netlify.log | egrep -o 'https?://[^ ]+' || true); # the || true expression to avoid script exit when not found.
        if [ -z "$previewurl" ]; then
            echo "But previewurl not found. Skipping.";
        else
            echo "Gonna notify...";
            curl -i -H "Content-Type: application/json" \
            -d '{"state": "success", "target_url": "'"$previewurl"'", "description": "Preview is ready!", "context": "ci/preview"}' \
            -u "malcolm-kee:$GITHUB_TOKEN" \
            -X POST "https://api.github.com/repos/$TRAVIS_REPO_SLUG/statuses/$TRAVIS_PULL_REQUEST_SHA";
        fi
    else
        echo "Netlify Log file not found. We not gonna make any notification";
    fi
fi


