#!/bin/bash
set -e

NETLIFY_LOG=netlify.log

if [ -f "$NETLIFY_LOG" ]; then
    echo "Netlify Log file found.";
    previewurl=$(grep -oP '(?<=Live Draft URL: ).*' netlify.log | egrep -o 'https?://[^ ]+' || true); # the || true expression to avoid script exit when not found.
    if [ -z "$previewurl" ]; then
        echo "But previewurl not found. Skipping.";
    else
        echo "Running test against $previewurl";
        CYPRESS_baseUrl=$previewurl yarn cy:run;
    fi
else
    echo "Netlify Log file not found. Testing against production";
    CYPRESS_baseUrl=https://malcolmkee.com yarn cy:run;
fi

