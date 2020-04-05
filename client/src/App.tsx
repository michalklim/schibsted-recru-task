import React, { Fragment, FunctionComponent, useState } from 'react'
import { SearchForm } from 'components/SearchForm'
import { Image } from 'components/Image'
import { Item } from 'server/types'
import { getItems } from 'services/getItems'

export const App: FunctionComponent = () => {
  const [currentPage] = useState(1)
  const [items, setItems] = useState<Item[]>([])

  const handleSearchFormSubmit = async (value: string) => {
    const fetchedItems = await getItems(value, currentPage)

    setItems(fetchedItems)
  }

  return (
    <Fragment>
      <SearchForm onSubmit={handleSearchFormSubmit} />
      {items.map((item) => (
        <Image key={item.id} item={item} />
      ))}
    </Fragment>
  )
}
