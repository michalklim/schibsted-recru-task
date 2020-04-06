import React, { FunctionComponent } from 'react'
import { RouteComponentProps, useNavigate } from '@reach/router'
import styled from 'styled-components'

import giphyAttributionImg from 'static/giphy_attribution.png'
import pixabayAttributionImg from 'static/pixabay_attribution.png'
import { SearchForm } from 'components/SearchForm'

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

const Container = styled.div`
  flex-grow: 1;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const Heading = styled.h1``

const Footer = styled.footer`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: ${({ theme }) => theme.ms(4)} ${({ theme }) => theme.ms(2)};
  flex-wrap: wrap;
`

const Attributions = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  grid-gap: ${({ theme }) => theme.ms(0)};
  align-items: center;
`

const AttributionImg = styled.img`
  height: ${({ theme }) => theme.ms(4)};
  width: auto;
`

const Sign = styled.small`
  font-family: ${({ theme }) => theme.typo.secondaryFont};
`

export const HomeSection: FunctionComponent<RouteComponentProps> = () => {
  const navigate = useNavigate()

  const handleSearchFormSubmit = async (value: string) => {
    navigate(`/search/${value}/1`)
  }

  return (
    <Section>
      <Container>
        <Heading>Schibsted Recru App</Heading>
        <SearchForm onSubmit={handleSearchFormSubmit} />
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
