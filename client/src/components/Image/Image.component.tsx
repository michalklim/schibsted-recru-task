import React, { FunctionComponent } from 'react'
import { Item } from 'server/types'

interface Props {
  item: Item
}

export const Image: FunctionComponent<Props> = ({ item }) => {
  return <div>{item.type}</div>
}
