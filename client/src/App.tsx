import React, { FunctionComponent } from 'react'
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import { Router } from '@reach/router'

import { appTheme } from 'theme'
import { HomeSection } from 'sections/Home'
import { SearchSection } from 'sections/Search'
import { normalize } from 'polished'

const GlobalStyle = createGlobalStyle`
  ${normalize()}
  
  html {
    box-sizing: border-box;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  
  body {
    font-family: ${({ theme }) => theme.typo.primaryFont};
  }
`

export const App: FunctionComponent = () => {
  return (
    <ThemeProvider theme={appTheme}>
      <GlobalStyle />
      <Router>
        <HomeSection path="*" />
      </Router>
      <Router primary={false}>
        <SearchSection path="/search/:term/:page" />
      </Router>
    </ThemeProvider>
  )
}
