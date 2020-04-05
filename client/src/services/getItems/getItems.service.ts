import fetch from 'isomorphic-fetch'
import qs from 'querystring'
import { Item } from 'server/types'

export const getItems = async (term: string, page: number): Promise<Item[]> => {
  const params = {
    term,
    page,
  }
  const response = await fetch(`http://localhost:3000/api/items?${qs.stringify(params)}`)
  const json = await response.json()

  return json
}
