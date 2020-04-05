import React, { FunctionComponent } from 'react'
import { ImageResponse, Item } from 'server/types'
import styled from 'styled-components'

interface Props {
  item: Item
}

const Img = styled.img<Pick<ImageResponse, 'size'> & HTMLImageElement>`
  width: ${({ width }) => `${width}px`};
  height: ${({ height }) => `${height}px`};
`

export const Image: FunctionComponent<Props> = ({ item }) => {
  return <Img {...item.image.size} src={item.image.src} />
}
