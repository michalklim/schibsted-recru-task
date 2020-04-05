import React, { FunctionComponent, useEffect, useState } from 'react'
import { RouteComponentProps, useParams } from '@reach/router'
import styled from 'styled-components'
import { useSpring } from 'react-spring'
import useWindowScroll from 'react-use/lib/useWindowScroll'

import { getItems } from 'services/getItems'
import { Image } from 'components/Image'

const Section = styled.div`
  min-height: 100vh;
  background: red;
  z-index: ${({ theme }) => theme.layers.middle};
  position: relative;
  margin: 100vh 0 0 0;
`

export const SearchSection: FunctionComponent<RouteComponentProps> = () => {
  const { y } = useWindowScroll()
  const [, setY] = useSpring(() => ({ y }))
  const params = useParams()
  const [items, setItems] = useState([])

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    setY({
      y: window.innerHeight,
      from: { y },
      onFrame: (props) => window.scroll(0, props.y),
    })
  }, [params.term])
  /* eslint-enable react-hooks/exhaustive-deps */

  useEffect(() => {
    const fetch = async () => {
      const result = await getItems(params.term, 1)
      return setItems(result)
    }

    fetch()
  }, [params.term])

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    const fetch = async () => {
      const result = await getItems(params.term, 1)
      setItems((prevItems) => [...prevItems, ...result])
    }
    fetch()
  }, [params.page])
  /* eslint-enable react-hooks/exhaustive-deps */

  return (
    <Section>
      {items.map((item) => (
        <Image key={item.id} item={item} />
      ))}
    </Section>
  )
}
