import React, { FunctionComponent, useCallback, useEffect, useState } from 'react'
import { RouteComponentProps, useNavigate, useParams } from '@reach/router'
import styled from 'styled-components'
import { useSpring, config, animated, useTransition } from 'react-spring'

import { getItems } from 'services/getItems'
import { Image } from 'components/Image'
import { Item } from 'server/types'
import { Button } from 'components/Button'
import { SearchForm } from 'components/SearchForm'

const Section = styled.div`
  min-height: 100vh;
  z-index: ${({ theme }) => theme.layers.middle};
  position: relative;
  margin: 100vh 0 0 0;
  background: ${({ theme }) => theme.colors.primary};
`

const Header = animated(styled.header`
  display: flex;
  padding: ${({ theme }) => theme.ms(2)} 10%;
  background: ${({ theme }) => theme.colors.secondary};
  align-items: center;
  position: sticky;
  top: 0;
  z-index: ${({ theme }) => theme.layers.top};
  opacity: 0;
`)

const ListTitle = animated(styled.h3`
  color: ${({ theme }) => theme.colors.secondary};
  margin: ${({ theme }) => theme.ms(4)} 10% ${({ theme }) => theme.ms(2)};
  padding: 0 ${({ theme }) => theme.ms(3)};
`)

const Logo = styled.h2`
  margin: 0 ${({ theme }) => theme.ms(3)};
`

const ImageContainer = animated(styled.li`
  max-width: 50%;
  padding: ${({ theme }) => theme.ms(2)};
`)

const ImagesList = styled.ul`
  margin: 0;
  padding: ${({ theme }) => theme.ms(3)} 10%;
  display: flex;
  flex-wrap: wrap;
`
const Footer = styled.footer`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: ${({ theme }) => theme.ms(3)} 0 ${({ theme }) => theme.ms(16)};
`

export const SearchSection: FunctionComponent<RouteComponentProps> = () => {
  const [items, setItems] = useState<Item[]>([])
  const [showHeader, setShowHeader] = useState<boolean>(false)
  const [imagesLoading, setImagesLoading] = useState(true)
  const [isInitialPageChange, setIsInitialPageChange] = useState(true)

  const params = useParams()
  const navigate = useNavigate()

  const nextPage = useCallback(() => {
    navigate(`/search/${params.term}/${parseInt(params.page) + 1}`)
  }, [params.page, navigate, params.term])

  const changeTerm = useCallback(
    (value: string) => {
      navigate(`/search/${value}/1`)
    },
    [navigate],
  )

  const fetchNewItems = useCallback(
    async (term: string, page: number, onlyPageChange: boolean) => {
      setImagesLoading(true)
      const result = await getItems(term, page)
      if (onlyPageChange) {
        setItems((prevItems) => [...prevItems, ...result])
      }

      if (!onlyPageChange) {
        setItems(result)
      }
      setImagesLoading(false)
    },
    [setImagesLoading, setItems],
  )

  const [, setY] = useSpring(() => ({
    y: window.innerHeight,
    onFrame: (props: { y: number }) => {
      window.scroll(0, props.y)
    },
  }))

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    setY({
      immediate: false,
      from: {
        y: window.scrollY,
      },
      y: window.innerHeight,
      onRest: () => {
        setShowHeader(true)
        fetchNewItems(params.term, params.page, false)
      },
      onFrame: (props: { y: number }) => {
        window.scroll(0, props.y)
      },
      config: config.slow,
    })
  }, [params.term])
  /* eslint-enable react-hooks/exhaustive-deps */

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (params.page !== '1' && !isInitialPageChange) {
      fetchNewItems(params.term, params.page, true)
    }
    setIsInitialPageChange(false)
  }, [params.page])
  /* eslint-enable react-hooks/exhaustive-deps */

  const enterAnimation = useSpring({
    from: { opacity: 0 },
    opacity: showHeader ? 1 : 0,
    transform: `translateY(${showHeader ? 0 : -100}%)`,
  })
  const itemsTransitions = useTransition(items, (item) => item.id, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: config.gentle,
  })

  return (
    <Section>
      <Header style={enterAnimation}>
        <Logo>SRA</Logo>
        <SearchForm onSubmit={changeTerm} />
      </Header>
      {!!params?.term && !!items.length && (
        <ListTitle style={enterAnimation}>Search results for: &apos;{params.term}&apos;</ListTitle>
      )}
      <ImagesList>
        {itemsTransitions.map(({ item, props, key }) => (
          <ImageContainer key={key} style={props}>
            <Image item={item} />
          </ImageContainer>
        ))}
      </ImagesList>
      {!!items.length && (
        <Footer>
          <Button disabled={imagesLoading} onClick={nextPage}>
            Next page
          </Button>
        </Footer>
      )}
    </Section>
  )
}
