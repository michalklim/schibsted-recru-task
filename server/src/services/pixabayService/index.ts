import fetch from 'isomorphic-fetch'
import qs from 'querystring'

import { ITEMS_PER_PAGE } from '../../common/constants'
import { Item } from '../../common/types'

interface PixabayImage {
  id: number
  pageURL: string
  type: string
  tags: string
  previewURL: string
  previewWidth: number
  previewHeight: number
  webformatURL: string
  webformatWidth: number
  webformatHeight: number
  largeImageURL: string
  imageWidth: number
  imageHeight: number
  imageSize: number
  views: number
  downloads: number
  favorites: number
  likes: number
  comments: number
  user_id: number
  user: string
  userImageURL: string
}

interface PixabayResponse {
  total: number
  totalHits: number
  hits: PixabayImage[]
}

const shapeResponse = (res: PixabayResponse): Item[] => {
  return res.hits.map((item) => ({
    type: 'photo',
    id: `${item.id}`,
    image: {
      src: item.webformatURL,
      size: {
        width: item.webformatWidth,
        height: item.webformatHeight,
      },
    },
    previewStatic: {
      src: item.previewURL,
      size: {
        width: item.previewWidth,
        height: item.previewHeight,
      },
    },
    preview: {
      src: item.previewURL,
      size: {
        width: item.previewWidth,
        height: item.previewHeight,
      },
    },
  }))
}

export const fetchItems = async (term: string, page = 1, options?: {}): Promise<Item[]> => {
  /* eslint-disable @typescript-eslint/camelcase */
  const params = {
    key: process.env.PIXABAY_TOKEN || '',
    q: term,
    image_type: 'photo',
    per_page: ITEMS_PER_PAGE,
    page,
    ...options,
  }
  /* eslint-enable @typescript-eslint/camelcase */

  const response = await fetch(`https://pixabay.com/api?${qs.stringify(params)}`)

  const json: PixabayResponse = await response.json()

  return shapeResponse(json)
}
