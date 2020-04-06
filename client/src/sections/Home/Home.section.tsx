import React, { FunctionComponent, useEffect } from 'react'
import { RouteComponentProps, useNavigate } from '@reach/router'
import styled from 'styled-components'

import giphyAttributionImg from 'static/giphy_attribution.png'
import pixabayAttributionImg from 'static/pixabay_attribution.png'
import { SearchForm } from 'components/SearchForm'
import { animated, useSpring } from 'react-spring'
import useWindowScroll from 'react-use/lib/useWindowScroll'

const Section = styled.section`
  height: 100vh;
  width: 100%;
  display: flex;
  position: fixed;
  justify-content: center;
  align-items: center;
  z-index: ${({ theme }) => theme.layers.bottom};
  flex-direction: column;
  top: 0;
  left: 0;
`

const HomeSearchForm = styled(SearchForm)`
  width: 100%;

  @media ${({ theme }) => theme.breakpoints.tablet} {
    width: auto;
  }
`

const Container = animated(styled.div`
  flex-grow: 1;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: ${({ theme }) => theme.ms(0)};
`)

const Heading = styled.h1`
  margin: 0 0 ${({ theme }) => theme.ms(12)};

  @media ${({ theme }) => theme.breakpoints.tablet} {
    margin: 0 0 ${({ theme }) => theme.ms(6)};
  }
`

const Footer = styled.footer`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: ${({ theme }) => theme.ms(4)} ${({ theme }) => theme.ms(2)};
  flex-wrap: wrap;
`

const Attributions = styled.div`
  display: grid;
  grid-template-columns: auto;
  grid-gap: ${({ theme }) => theme.ms(0)};
  grid-template-rows: auto auto auto;
  justify-items: center;

  @media ${({ theme }) => theme.breakpoints.desktop} {
    grid-template-columns: auto auto auto;
    align-items: center;
  }
`

const AttributionImg = styled.img`
  height: ${({ theme }) => theme.ms(2)};
  width: auto;

  @media ${({ theme }) => theme.breakpoints.desktop} {
    height: ${({ theme }) => theme.ms(4)};
  }
`

const Sign = styled.small`
  font-family: ${({ theme }) => theme.typo.secondaryFont};
`

export const HomeSection: FunctionComponent<RouteComponentProps> = () => {
  const navigate = useNavigate()
  const { y } = useWindowScroll()

  const [{ st }, set] = useSpring(() => ({ st: y }))

  useEffect(() => {
    if (y <= window.innerHeight) {
      set({ st: y })
    }
  }, [y, set])

  const interptOpacity = st.interpolate({
    range: [window.innerHeight / 3, 0],
    output: [0, 1],
  })

  const interptTransform = st
    .interpolate({
      range: [0, window.innerHeight / 3],
      output: [0, -100],
    })
    .interpolate((t) => `translate3d(0px, ${t}px, 0px)`)

  const handleSearchFormSubmit = async (value: string) => {
    navigate(`/search/${value}/1`)
  }

  return (
    <Section>
      <Container style={{ opacity: interptOpacity, transform: interptTransform }}>
        <Heading>Schibsted Recru App</Heading>
        <HomeSearchForm onSubmit={handleSearchFormSubmit} />
      </Container>
      <Footer>
        <Attributions>
          <Sign>made with 🖤 by Michal Klim</Sign>
          <AttributionImg src={giphyAttributionImg} alt="giphy" />
          <AttributionImg src={pixabayAttributionImg} alt="pixabay" />
        </Attributions>
      </Footer>
    </Section>
  )
}
