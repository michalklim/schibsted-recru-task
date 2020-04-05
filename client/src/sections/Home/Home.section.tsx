import React, { FunctionComponent } from 'react'
import { RouteComponentProps, useNavigate } from '@reach/router'
import styled from 'styled-components'

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
  flex-grow: 0;
  flex-shrink: 0;
  height: 200px;
  background: red;
  width: 100%;
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
      <Footer></Footer>
    </Section>
  )
}
