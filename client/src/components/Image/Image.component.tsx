import React, { FunctionComponent, useEffect, useRef, useState } from 'react'
import { ImageResponse, Item } from 'server/common/types'
import styled, { keyframes } from 'styled-components'
import useIntersection from 'react-use/lib/useIntersection'
import { useSpring, animated } from 'react-spring'
interface Props {
  item: Item
}

type WithSize = Pick<ImageResponse, 'size'>

const flash = keyframes`
  0% {
    opacity: 0.2
  }

  50% {
    opacity: 0.3
  }
  
  100% {
    opacity: 0.1
  }
`

const Container = styled.div`
  display: inline-grid;
  align-self: flex-start;
  position: relative;
  max-width: 100%;
  height: auto;
  > * {
    grid-area: 1 / 1 / 2 / 2;
  }
`
const Svg = styled.svg<WithSize>`
  width: ${({ size }) => size.width}px;
  max-width: 100%;
  min-width: 100%;
`

const Img = styled(animated.img)`
  width: 100%;
  height: auto;
  z-index: ${({ theme }) => theme.layers.middle};
  position: absolute;
  top: 0;
  left: 0;
`

const Placeholder = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: ${({ theme }) => theme.colors.secondary};
  z-index: ${({ theme }) => theme.layers.bottom};
  animation: ${flash} 2s infinite;
  animation-fill-mode: backwards;
`

export const Image: FunctionComponent<Props> = ({ item, ...props }) => {
  const figureRef = useRef(null)
  const intersection = useIntersection(figureRef, {
    root: null,
    rootMargin: '200px 0px 200px 0px',
    threshold: 0,
  })
  const [loaded, setLoaded] = useState(false)
  const [src, setSrc] = useState<string | undefined>(undefined)

  useEffect(() => {
    if (!src && intersection && intersection.isIntersecting) {
      setSrc(item.image.src)
    }
  }, [intersection, item.image.src, src])

  const handleImageLoad = () => {
    setLoaded(true)
  }

  const imgAnimation = useSpring({ opacity: loaded ? 1 : 0 })

  return (
    <Container ref={figureRef} {...props}>
      <Svg size={item.image.size} viewBox={`0 0 ${item.image.size.width} ${item.image.size.height}`} />
      <Placeholder />
      <Img onLoad={handleImageLoad} src={src} style={imgAnimation} />
    </Container>
  )
}
