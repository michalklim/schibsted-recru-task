import { GifsResult, GiphyFetch, SearchOptions } from '@giphy/js-fetch-api'
import { ITEMS_PER_PAGE } from '../../common'

const gf = new GiphyFetch(process.env.GIPHY_TOKEN || '')

const shapeResponse = (res: GifsResult): Item[] => {
  return res.data.map((item) => ({
    type: 'gif',
    id: `${item.id}`,
    image: {
      src: item.images.original.url,
      size: {
        height: item.images.original.height,
        width: item.images.original.width,
      },
    },
    preview: {
      src: item.images.preview_gif.url,
      size: {
        height: item.images.preview_gif.height,
        width: item.images.preview_gif.width,
      },
    },
    previewStatic: {
      src: item.images.preview.url,
      size: {
        height: item.images.preview.height,
        width: item.images.preview.width,
      },
    },
  }))
}

export const fetchItems = async (term: string, page = 1, options?: SearchOptions): Promise<Item[]> => {
  const DEFAULT_OPTIONS: SearchOptions = {
    limit: ITEMS_PER_PAGE,
    offset: ITEMS_PER_PAGE * (page - 1),
    type: 'gifs',
  }

  const searchOptions = {
    ...DEFAULT_OPTIONS,
    ...options,
  }

  const searchRes = await gf.search(term, searchOptions)

  return shapeResponse(searchRes)
}
