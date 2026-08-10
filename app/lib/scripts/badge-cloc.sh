#!/bin/sh -l

npm install -g cloc

# Visible Output
cloc ./app --include-lang="TypeScript,JavaScript,GraphQL,Markdown,JSON,SCSS,EJS,Bourne Shell" --exclude-ext=".data.ts" 

# # Markdown
cloc ./app --include-lang="TypeScript,JavaScript,GraphQL,Markdown,JSON,SCSS,EJS,Bourne Shell" --exclude-ext=".data.ts" --md --out=docs/LinesOfCode.md --hide-rate --quiet

# # Badge
lines_of_code=$(cloc ./app --include-lang="TypeScript,JavaScript,GraphQL,Markdown,JSON,SCSS,EJS,Bourne Shell" --exclude-ext=".data.ts" --quiet --sum-one | awk '/SUM/ {print $5}')
badge_link="https://img.shields.io/badge/Lines_of_Code-$lines_of_code-blue"
curl $badge_link --no-progress-meter -o docs/badge-cloc.svg
