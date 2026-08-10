///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const StylesConfig = {
  //
  Sx: {
    //
    Animation: {
      //
      FadeIn: {
        animation: "fadeIn 0.4s ease",
        "@keyframes fadeIn": {
          from: {opacity: 0},
          to: {opacity: 1},
        },
      },
    },
  },
} as const

export {StylesConfig}
