import React, { FunctionComponent, useEffect, useRef } from 'react'
import { RouteComponentProps, useParams } from '@reach/router'
import styled from 'styled-components'
import { useSpring } from 'react-spring'
import useWindowScroll from 'react-use/lib/useWindowScroll'

const Section = styled.div`
  min-height: 100vh;
  background: red;
  z-index: ${({ theme }) => theme.layers.middle};
  position: relative;
  margin: 100vh 0 0 0;
`

export const SearchSection: FunctionComponent<RouteComponentProps> = () => {
  const { _, y } = useWindowScroll()
  const [, setY] = useSpring(() => ({ y }))
  const params = useParams()

  useEffect(() => {
    setY({
      y: window.innerHeight,
      from: { y },
      onFrame: (props) => window.scroll(0, props.y),
    })
  }, [params?.term])

  return <Section>search section</Section>
}
