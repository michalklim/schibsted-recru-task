import { DefaultTheme } from 'styled-components'
import { modularScale } from 'polished'

export const appTheme: DefaultTheme = {
  colors: {
    primary: '#000000',
    secondary: '#FFFFFF',
  },
  layers: {
    top: 1000,
    middle: 500,
    bottom: 100,
  },
  typo: {
    primaryFont: 'Montserrat, sans-serif',
    secondaryFont: 'Open Sans, sans-serif',
  },
  ms: (step) => modularScale(step, '1rem', 'majorSecond'),
}
