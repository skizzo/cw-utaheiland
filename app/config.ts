const AppConfig = {
  //
  code: "utaheiland",
  singleArtist: true,
  defaultLang: "de",
  showEvents: true,
  useNewDomainBranch: true,
  useViewTransition: false,
  appStoreLinks: {
    ios: "https://itunes.apple.com/us/app/iazzu-art-buy-art-with-the-augmented-reality-app/id1210715366?ls=1&mt=8",
    android: "https://play.google.com/store/apps/details?id=com.iazzu.app",
  },
  debug: {
    useLocalGraphQl: false,
    localIp: "192.168.1.12",
    showAllLogs: true, // && __DEV__
    useRedisCache: true,
  },
  header: {
    useLogo: true,
    logoUrl: "https://iazzu.com/img/sites/UtaHeilandLogo.png",
    paddings: {top: 10, bottom: 14},
  },
  legalNotice: {
    firstPart: {
      header: "Betreiber",
      artistName: "Uta Heiland",
      address1: "Ringstr.122",
      // address2: "OG 3", // not used
      areaCode: "70839",
      city: "Gerlingen",
      country: "Deutschland",
      email: "uta_heiland@web.de",
      phone: "+49 172 7234348",
    },
    secondPart: {
      header: "Realisation",
      name: "iazzu",
      address1: "Wyss Gässli 8",
      areaCode: "2502",
      city: "Biel",
      country: "Schweiz",
    },
    additions: [
      // {header: "", paragraph: ""},
      // {header: "Rechtsform", paragraph: "Einzelunternehmen"},
      // {header: "Inhaberin", paragraph: "Gabriele Templin-Kirz"},
      // {header: "Wirtschafts-Identifikationsnummer gemäß § 139c AO", paragraph: "DE123826213-00001"},
    ] as EntryAdditionHaftungsausschluss[],
  },
  privacyPolicy: {
    name: "Uta Heiland",
    street: "Ringstr.122",
    zip: "70839",
    city: "Gerlingen",
    country: {
      de: "Deutschland",
      en: "Germany",
      es: "Alemania",
      fr: "Allemagne",
    },
    email: "uta_heiland@web.de",
    phone: "+49 172 7234348",
    //
    countryCode: "de",
    exclusiveLang: "de",
  },
  events: {
    showSubEvents: true,
    subEventsRouteName: "/courses",
    subEventsTitle: {
      de: "Malkurse",
      en: "Painting Classes",
      es: "Cursos de pintura",
      fr: "Cours de peinture",
    },
    callToActionButtonLabel: {
      de: "Infos anzeigen",
      en: "Show Infos",
      es: "Mostrar información",
      fr: "Montrer les infos",
    },
    subEventsCategories: ["Courses"],
  },
} as const

type EntryAdditionHaftungsausschluss = {
  header: string
  paragraph: string
}

export {AppConfig}
