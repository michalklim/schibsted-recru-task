import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string
      secondary: string
    }
    layers: {
      top: number
      middle: number
      bottom: number
    }
    typo: {
      primaryFont: string
      secondaryFont: string
    }
    ms: (step: number) => string
  }
}
