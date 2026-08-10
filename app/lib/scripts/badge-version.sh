#!/bin/bash

# Badge
version=$(grep '"version":' package.json | awk -F'"' '{print $4}')
badge_link="https://img.shields.io/badge/Version-$version-blue"
curl $badge_link --no-progress-meter -o docs/badge-version.svg
