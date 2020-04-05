import fetch from 'isomorphic-fetch'
import qs from 'querystring'
import { Item } from 'server/types'

export const getItems = async (term: string, page: number): Promise<Item[]> => {
  const params = {
    term,
    page,
  }
  const baseUrl = `${process.env.URL}${process.env.CONTEXT ? '/.netlify/functions/index' : ''}`
  const response = await fetch(`${baseUrl}/api/items?${qs.stringify(params)}`)
  const json = await response.json()

  return json
}
