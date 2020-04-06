import React, { FunctionComponent, useCallback, useEffect, useState } from 'react'
import { RouteComponentProps, useNavigate, useParams } from '@reach/router'
import styled from 'styled-components'
import { useSpring } from 'react-spring'

import { getItems } from 'services/getItems'
import { Image } from 'components/Image'
import { Item } from 'server/types'
import { rgba } from 'polished'

const Section = styled.div`
  min-height: 100vh;
  z-index: ${({ theme }) => theme.layers.middle};
  position: relative;
  margin: 100vh 0 0 0;
  background: ${({ theme }) => theme.colors.primary};
`

const ImageContainer = styled.li`
  max-width: 50%;
  padding: ${({ theme }) => theme.ms(2)};
`

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

const NextPageButton = styled.button`
  padding: ${({ theme }) => theme.ms(1)};
  border: 4px solid ${({ theme }) => theme.colors.primary};
  background: ${({ theme }) => theme.colors.secondary};
  transition: background 0.3s;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => rgba(theme.colors.secondary, 0.6)};
  }
  &:disabled,
  &[disabled] {
    background: ${({ theme }) => rgba(theme.colors.secondary, 0.4)};
    pointer-events: none;
  }
`

export const SearchSection: FunctionComponent<RouteComponentProps> = () => {
  const [items, setItems] = useState<Item[]>([])
  const [imagesLoading, setImagesLoading] = useState(true)
  const [isInitialPageChange, setIsInitialPageChange] = useState(true)

  const params = useParams()
  const navigate = useNavigate()

  const nextPage = useCallback(() => {
    navigate(`/search/${params.term}/${parseInt(params.page) + 1}`)
  }, [params.page, navigate, params.term])

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

  const [, setY] = useSpring(() => ({ y: 0, onRest: () => null, onFrame: (props) => props }))

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    setY({
      immediate: false,
      from: {
        y: window.scrollY,
      },
      y: window.innerHeight,
      onRest: () => {
        fetchNewItems(params.term, params.page, false)
      },
      onFrame: (props) => {
        window.scroll(0, props.y)
      },
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

  return (
    <Section>
      <ImagesList>
        {items.map((item) => (
          <ImageContainer key={item.id}>
            <Image item={item} />
          </ImageContainer>
        ))}
      </ImagesList>
      {!!items.length && (
        <Footer>
          <NextPageButton disabled={imagesLoading} onClick={nextPage}>
            Next page
          </NextPageButton>
        </Footer>
      )}
    </Section>
  )
}
