///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const GlobalsConfig = {
  languages: {
    available: [
      //
      {key: "en"},
      {key: "de"},
      {key: "es"},
      {key: "fr"},
    ],
  },
  currencies: {
    available: [
      //
      {key: "EUR", symbol: "€"},
      {key: "USD", symbol: "$"},
      {key: "CHF", symbol: "CHF"},
      {key: "AUD", symbol: "$"},
      {key: "CAD", symbol: "$"},
      {key: "CNY", symbol: "¥"},
      {key: "GBP", symbol: "£"},
      {key: "JPY", symbol: "¥"},
      {key: "NOK", symbol: "kr"},
      {key: "BTC", symbol: "BTC"},
      {key: "SEK", symbol: "kr"},
    ],
  },
  dimensionsUnits: {
    available: [
      //
      {key: "cm"},
      {key: "inch"},
    ],
  },
} as const

export {GlobalsConfig}
