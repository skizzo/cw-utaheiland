module.exports = {
  // https://github.com/danreeves/sublime-prettier#configuration
  autoformat: true, // save on exit
  printWidth: 1000,
  extensions: ["js", "mjs", "ts", "tsx", "ejs"],
  tabWidth: 2,
  tabs: false,
  semi: false,
  arrowParens: "avoid",
  bracketSpacing: false,
  bracketSameLine: true,
  singleQuote: false,
  trailingComma: "all",
  breakBeforeElse: true,
  overrides: [
    {
      files: "*.md",
      options: {
        parser: "mdx",
      },
    },
  ],
  // https://github.com/trivago/prettier-plugin-sort-imports
  importOrder: [
    //
    "^(.*)react(.*)",
    "^(.*)i18n(.*)",
    "^(.*)@mui(.*)",
    "/lib/(.*)",
    "<THIRD_PARTY_MODULES>",
    "^(.*)/models(.*)$",
    "^(.*)/modules/(.*)$",
    "^(.*).routes",
    "^(.*)/(config|errors|types|utils|types|enums|dataTypes|classes)$",
    "^[./]",
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  importOrderGroupNamespaceSpecifiers: true,
  importOrderCaseInsensitive: true,
}
